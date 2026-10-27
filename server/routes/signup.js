module.exports = function (app, pool, bcrypt, transporter, crypto) {
  //CREATE A USER IN SIGNUP
  app.post('/api/signup', async (request, response) => {

    const username = request.body.username
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const email = request.body.email
    const password = request.body.password
    const confirmPassword = request.body.confirmPassword

    const validateSignupData = (username, firstname, lastname, email, password, confirmPassword) => {

      const validateCharacters = async () => {
        if (username.length < 4 || username.length > 25) {
          throw ("Username has to be between 4 and 25 characters.")
        }
        if (!username.match(/^[a-z0-9]+$/i))
          throw ("Username should only include alphabetical characters (a to z and/or A to Z) and numbers (0 to 9).")
        if (firstname.length > 50 || lastname.length > 50 || firstname.length < 1 || lastname.length < 1)
          throw ("Maximum length for first name and last name is 50 characters. Minimum length is 1 character.")
        if (!firstname.match(/^[a-zåäö-]+$/i) || !lastname.match(/^[a-zåäö-]+$/i))
          throw ("First name and last name can only include characters a to z, å, ä, ö, and hyphen (-).")
        if (email.length > 254 || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
          throw ("Please enter a valid e-mail address.")
        if (!password.match(/(?=^.{8,30}$)(?=.*\d)(?=.*[!.@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).*$/)) {
          throw (`Please enter a password with a length between 8 and 30 characters, 
                  at least one lowercase alphabetical character (a to z), 
                  at least one uppercase alphabetical character (A to Z), 
                  at least one numeric character (0 to 9), 
                  and at least one special character (!.@#$%^&*)`)
        }
        if (password !== confirmPassword)
          throw ("The entered passwords are not the same!")
        return
      }

      const checkUsername = async () => {
        var sql = "SELECT * FROM users WHERE username = $1";
        const { rows } = await pool.query(sql, [username])
        if (rows.length) {
          throw ("Username already exists! Choose a different username")
        } else
          return
      }

      const checkEmail = async () => {
        var sql = "SELECT * FROM users WHERE email = $1";
        const { rows } = await pool.query(sql, [email])
        if (rows.length) {
          throw ("User with this e-mail already exists! Choose a different email address.")
        } else {
          return
        }
      }

      return (
        validateCharacters()
          .then(() => checkUsername())
          .then(() => checkEmail())
          .then(() => {
            return (true)
          }).catch((error) => {
            // Our own validation errors are strings. Anything else is an unexpected error.
            if (typeof error === 'string') return error
            console.error('Unexpected error in signup validation: ', error)
            return 'Something went wrong. Please check your data and try again!'
          })
      )
    }

    const signupValidationResult = await validateSignupData(username, firstname, lastname, email, password, confirmPassword)

    if (signupValidationResult !== true) {
      return response.send(signupValidationResult)
    }

    // Creates a unique code and saves it in email_verify.
    const generateVerificationCode = async (userId) => {
      let code
      // Checking for the very unlikely case that a similar code already exists in the table.
      while (true) {
        code = crypto.randomBytes(20).toString('hex')
        const result = await pool.query('SELECT * FROM email_verify WHERE verify_code = $1;', [code])
        if (result.rows.length < 1) break
        console.log('Found a duplicate for the newly generated verification code in signup. Generating a new code.')
      }

      await pool.query(
        'INSERT INTO email_verify (user_id, email, verify_code) VALUES ($1, $2, $3);',
        [userId, email, code]
      )
      return code
    }

    const sendVerificationCodeByEmail = async (code) => {
      const link = `${process.env.FRONTEND_URL}/confirm/${username}/${code}`
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: 'Verify your email address for Matcha',
          html: `<p>Click the link below to verify your account for Matcha</p>
                <a href="${link}">Link</a>
                <p>- Matcha team</p>`
        })
        console.log('Email sent successfully: ' + info.response)
      } catch (error) {
        console.error('Something went wrong when trying to send email: ', error)
        throw ('We could not send the verification email. Please try again later!')
      }
    }

    // If something fails after the user is created, we remove the half-created user
    // so that the person can sign up again with the same username and email.
    const removeNewUser = async (userId) => {
      try {
        await pool.query('DELETE FROM email_verify WHERE user_id = $1', [userId])
        await pool.query('DELETE FROM fame_rates WHERE user_id = $1', [userId])
        await pool.query('DELETE FROM users WHERE id = $1', [userId])
      } catch (error) {
        console.error('Failed to clean up the new user: ', error)
      }
    }

    let userId = null
    try {
      const hash = await bcrypt.hash(password, 10)
      const newUser = await pool.query(
        'INSERT INTO users (username, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5) RETURNING id',
        [username, firstname, lastname, email, hash]
      )
      userId = newUser.rows[0]['id']
      await pool.query('INSERT INTO fame_rates (user_id) VALUES ($1)', [userId])

      const code = await generateVerificationCode(userId)
      await sendVerificationCodeByEmail(code)

      response.send(true)
    } catch (error) {
      console.error('Error in signup: ', error)
      if (userId !== null) await removeNewUser(userId)
      response.send(
        typeof error === 'string'
          ? error
          : 'Something went wrong when trying to create the new user. Please try again!'
      )
    }
  })

  app.post('/api/signup/verifyuser', async (request, response) => {
    const username = request.body.username
    const code = request.body.code

    if (typeof username !== 'string' || typeof code !== 'string') {
      return response.send('Invalid code!')
    }

    try {
      // The code has to belong to THIS username.
      const result = await pool.query(
        `SELECT * FROM email_verify
          INNER JOIN users
          ON email_verify.user_id = users.id
          WHERE email_verify.verify_code = $1
          AND users.username = $2;`,
        [code, username]
      )
      if (result.rows.length < 1) {
        const alreadyVerified = await pool.query(
          `SELECT 1 FROM users WHERE username = $1 AND verified = 'YES'`,
          [username]
        )
        if (alreadyVerified.rows.length > 0) return response.send(true)

        console.error('Verification failed.')
        return response.send('Invalid code!')
      }

      await pool.query("UPDATE users SET verified = 'YES' WHERE username = $1", [username])
      await pool.query('DELETE FROM email_verify WHERE verify_code = $1', [code])
      response.send(true)
    } catch (error) {
      console.error('Error in verifyuser: ', error)
      response.send('Something went wrong. Please try again!')
    }
  })
}