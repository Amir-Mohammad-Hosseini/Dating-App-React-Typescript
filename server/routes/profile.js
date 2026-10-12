module.exports = (app, pool, upload, fs, path, bcrypt) => {
    app.post('/api/profile/setup', async (request, response) => {
        var session = request.session
 
        const gender = request.body.gender
        const age = request.body.age
        const location = request.body.location
        const gps = request.body.gps
        const sexual_pref = request.body.sexual_pref
        const biography = request.body.biography
        const tags_of_user = request.body.tags
 
        if (!session.userid)
            return response.send("User not signed in!")
        if (gender !== 'male' && gender !== 'female' && gender !== 'other')
            return response.send("Invalid gender!")
        if (isNaN(age) || age < 18 || age > 120)
            return response.send("Invalid age!")
        if (location.length > 50)
            return response.send("Maximum length for location is 50 characters.")
        if (!location.match(/^[a-z, åäö-]+$/i))
            return response.send("Invalid characters in location! Allowed characters are a to z, å, ä, ö, comma (,), and hyphen (-).")
        if (isNaN(gps[0]) || isNaN(gps[1]) || gps[0] < -90 || gps[0] > 90 || gps[1] < -180 || gps[1] > 180)
            return response.send("Invalid coordinates! The range for latitude is -90 to 90, and for longitude -180 to 180.")
        if (sexual_pref !== 'male' && sexual_pref !== 'female' && sexual_pref !== 'bisexual')
            return response.send("Invalid sexual preference!")
        if (biography.length > 500)
            return response.send("The maximum length for biography is 500 characters!")
        const forbiddenTags = tags_of_user.filter(tag => !tag.match(/(?=^.{1,23}$)[a-z åäö-]+$/i))
        if (forbiddenTags.length !== 0)
            return response.send("Allowed characters in tags are a to z, å, ä, ö and hyphen (-). The maximum length of a tag is 23 characters.")
 
        try {
            await pool.query(
                `INSERT INTO user_settings (user_id, gender, age, user_location, sexual_pref, biography, ip_location)
                VALUES ($1, $2, $3, $4, $5, $6, point($7,$8))`,
                [session.userid, gender, age, location, sexual_pref, biography, gps[0], gps[1]])
            // Will be needed later in browsing.
            session.location = { x: Number(gps[0]), y: Number(gps[1]) }
 
            // Fame rates. Adjust later.
            sql = `UPDATE fame_rates SET setup_pts = setup_pts + 5, total_pts = total_pts + 5
                    WHERE user_id = $1 AND setup_pts < 5 AND total_pts <= 95`
            pool.query(sql, [session.userid])
 
            // We are removing the user from all the tags they didn't pick as their tags. This is useful in profile settings, but is this necessary in Onboarding?
            var sql = `UPDATE tags SET tagged_users = array_remove(tagged_users, $1)
                        WHERE (array[LOWER($2)] @> array[LOWER(tag_content)]::TEXT[]) IS NOT TRUE;`
            await pool.query(sql, [session.userid, tags_of_user])
 
            // We go through all of the tags that the user chose and see if they already exist in the table 'tags.'
            // 'await Promise.all' ensures all of them are mapped before the code speeds on forward.
            await Promise.all(tags_of_user.map(async (tag_name) => {
                sql = `SELECT * FROM tags
                        WHERE LOWER(tag_content) = LOWER($1)`
                const tagAlreadyExistsCheck = await pool.query(sql, [tag_name])
 
                // If the tag doesn't exist i.e. it's a completely new tag, we insert it as a new row into the 'tags' table.
                if (tagAlreadyExistsCheck.rows.length < 1) {
                    sql = `INSERT INTO tags (tag_content, tagged_users)
                            VALUES (LOWER($1), array[$2]::INT[]);`
                    await pool.query(sql, [tag_name, session.userid])
                    // console.log('User created a new tag!: ', tag_name)
                } else {
                    // If the tag is an existing tag, we insert the user_id into the tagged_users for the tag.
                    // We check again that the tag exists and that the user is not already in that tag.
                    sql = `UPDATE tags SET tagged_users = array_append(tagged_users, $1)
                            WHERE LOWER(tag_content) = LOWER($2)
                            AND (tagged_users @> array[$1]::INT[]) IS NOT TRUE;`
                    await pool.query(sql, [session.userid, tag_name])
                    // console.log('User chose an existing tag: ', tag_name)
                }
            }))
 
            // Fame rates. Adjust later.
            var tagPoints = tags_of_user.length
            if (tagPoints > 5)
                tagPoints = 5
            var sql = `UPDATE fame_rates SET total_pts = total_pts - tag_pts + $2, tag_pts = $2
                        WHERE user_id = $1`
            await pool.query(sql, [session.userid, tagPoints])
 
            response.send(true)
        } catch (error) {
            response.send('An error has occurred in Onboarding: ', error)
        }
 
    })
 
    app.get('/api/profile', async (request, response) => {
 
        const session = request.session
        if (!session.userid) return response.send(false)
        
        try {
            var sql = `SELECT * FROM users
                        INNER JOIN user_settings ON users.id = user_settings.user_id
                        LEFT JOIN fame_rates ON users.id = fame_rates.user_id
                        WHERE users.id = $1`
            var { rows } = await pool.query(sql, [session.userid])
            const { password: censored, ...profileData } = rows[0]
 
            sql = `SELECT * FROM tags WHERE tagged_users @> array[$1]::INT[]
                    ORDER BY tag_id`
            var tags_of_user = await pool.query(sql, [session.userid])
            profileData.tags = tags_of_user.rows.map(tag => tag.tag_content)
 
            sql = `SELECT * FROM user_pictures WHERE user_id = $1 AND profile_pic = 'YES'`
            var profile_pic = await pool.query(sql, [session.userid])
 
            if (profile_pic.rows[0]) {
                profileData.profile_pic = profile_pic.rows[0]
            } else {
                profileData.profile_pic = { user_id: session.userid, picture_data: null }
            }
 
            sql = `SELECT * FROM user_pictures WHERE user_id = $1 AND profile_pic = 'NO' ORDER BY picture_id`
            var other_pictures = await pool.query(sql, [session.userid])
            if (other_pictures.rows) {
                profileData.other_pictures = other_pictures.rows
            }
 
            sql = `SELECT target_id, username
                    FROM likes INNER JOIN users on likes.target_id = users.id
                    WHERE liker_id = $1
                    GROUP BY target_id, username`
            const liked = await pool.query(sql, [session.userid])
            profileData.liked = liked.rows
 
            sql = `SELECT watcher_id, username
                    FROM watches INNER JOIN users on watches.watcher_id = users.id
                    WHERE target_id = $1
                    GROUP BY watcher_id, username`
            const watchers = await pool.query(sql, [session.userid])
            profileData.watchers = watchers.rows
 
            sql = `SELECT liker_id, username
                    FROM likes INNER JOIN users on likes.liker_id = users.id
                    WHERE target_id = $1
                    GROUP BY liker_id, username`
            const likers = await pool.query(sql, [session.userid])
            profileData.likers = likers.rows
 
            response.send(profileData)
        } catch (error) {
            response.send(false)
        }
    })
 
    app.post('/api/profile/editsettings', async (request, response) => {
        const session = request.session
 
        const username = request.body.username
        const firstname = request.body.firstname
        const lastname = request.body.lastname
        const email = request.body.email
        const gender = request.body.gender
        const age = request.body.age
        const location = request.body.location
        const gps_lat = request.body.gps_lat
        const gps_lon = request.body.gps_lon
        const sexual_pref = request.body.sexual_pref
        const biography = request.body.biography
        const tags_of_user = request.body.tags
 
        if (!session.userid)
            return response.send("User not signed in!")
        var sql = "SELECT * FROM users WHERE (username = $1 OR email = $2) AND id != $3";
        const { rows } = await pool.query(sql, [username, email, session.userid])
        if (rows.length !== 0)
            return response.send("Username or email is already in use!")
        if (username.length < 4 || username.length > 25)
            return response.send("Username has to be between 4 and 25 characters.")
        if (!username.match(/^[a-z0-9]+$/i))
            return response.send("Username should only include alphabetical characters (a to z and/or A to Z) and numbers (0 to 9).")
        if (firstname.length > 50 || lastname.length > 50)
            return response.send("Maximum length for firstname and lastname is 50 characters.")
        if (!firstname.match(/^[a-zåäö-]+$/i) || !lastname.match(/^[a-zåäö-]+$/i))
            return response.send("First name and last name can only include characters a to z, å, ä, ö, and hyphen (-).")
        if (email.length > 254 || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
            return response.send("Please enter a valid e-mail address.")
        if (gender !== 'male' && gender !== 'female' && gender !== 'other')
            return response.send("Invalid gender!")
        if (isNaN(age) || age < 18 || age > 120)
            return response.send("Invalid age!")
        if (location.length > 50)
            return response.send("Maximum length for location is 50 characters.")
        if (!location.match(/^[a-z, åäö-]+$/i))
            return response.send("Invalid characters in location! Allowed characters are a to z, å, ä, ö, comma (,), and hyphen (-).")
        if (isNaN(gps_lat) || isNaN(gps_lon) || gps_lat < -90 || gps_lat > 90 || gps_lon < -180 || gps_lon > 180)
            return response.send("Invalid coordinates! The range for latitude is -90 to 90, and for longitude -180 to 180.")
        if (sexual_pref !== 'male' && sexual_pref !== 'female' && sexual_pref !== 'bisexual')
            return response.send("Invalid sexual preference!")
        if (biography.length > 500)
            return response.send("The maximum length for biography is 500 characters!")
        const forbiddenTags = tags_of_user.filter(tag => !tag.match(/(?=^.{1,23}$)[a-z åäö-]+$/i))
        if (forbiddenTags.length !== 0)
            return response.send("Allowed characters in tags are a to z, å, ä, ö, and hyphen (-). The maximum length is 23 characters.")
 
        if (session.userid) {
            try {
                await pool.query(
                    `UPDATE user_settings
                SET gender = $1, age = $2, user_location = $3, sexual_pref = $4,
                biography = $5, ip_location = point($6,$7)
                WHERE user_id = $8`,
                    [gender, age, location, sexual_pref, biography, gps_lat, gps_lon, session.userid])
 
                await pool.query(
                    `UPDATE users
                SET username = $1, firstname = $2, lastname = $3, email = $4
                WHERE id = $5`,
                    [username, firstname, lastname, email, session.userid])
 
                // Needed for browsing.
                session.location = { x: Number(gps_lat), y: Number(gps_lon) }
                // Deleting user from tags that they have not chosen when editing their settings.
                var sql = `UPDATE tags SET tagged_users = array_remove(tagged_users, $1)
				    WHERE (array[LOWER($2)] @> array[LOWER(tag_content)]::TEXT[]) IS NOT TRUE`
                await pool.query(sql, [session.userid, tags_of_user])
 
                // Deleting tags that no user is currently using.
                sql = 'DELETE FROM tags WHERE cardinality(tagged_users) = 0'
                await pool.query(sql)
 
                // We go through all of the tags that the user chose and see if they already exist in the table 'tags.'
                await Promise.all(tags_of_user.map(async (tag_name) => {
                    sql = `SELECT * FROM tags
                    WHERE LOWER(tag_content) = LOWER($1)`
                    const tagAlreadyExistsCheck = await pool.query(sql, [tag_name])
                    // If the tag doesn't exist i.e. it is a completely new tag, we insert it as a new row into the 'tags' table.
                    if (tagAlreadyExistsCheck.rows.length < 1) {
                        sql = `INSERT INTO tags (tag_content, tagged_users)
                        VALUES (LOWER($1), array[$2]::INT[]);`
                        await pool.query(sql, [tag_name, session.userid])
                        // console.log('User created a new tag!: ', tag_name)
                    } else {
                        // If the tag is an existing tag, we insert the user_id into the tagged_users for the tag.
                        // We check again that the tag exists and that the user is not already in that tag.
                        sql = `UPDATE tags SET tagged_users = array_append(tagged_users, $1)
                        WHERE LOWER(tag_content) = LOWER($2)
                        AND (tagged_users @> array[$1]::INT[]) IS NOT TRUE;`
                        await pool.query(sql, [session.userid, tag_name])
                        // console.log('User chose an existing tag: ', tag_name)
                    }
                }))
 
                // Fame rates. Adjust later.
                var tagPoints = tags_of_user.length
                if (tagPoints > 5)
                    tagPoints = 5
                sql = `UPDATE fame_rates SET total_pts = total_pts - tag_pts + $2, tag_pts = $2
							WHERE user_id = $1`
                await pool.query(sql, [session.userid, tagPoints])
                response.send(true)
            } catch (error) {
                console.error(error)
                response.send('Something went wrong when trying to update user\'s settings.')
            }
        }
    })
 
    // -----------------------------------------------------------------
    // NEW: replace the user's whole picture set in ONE request.
    //
    // Request: PUT /api/profile/pictures   (multipart/form-data)
    //   layout : JSON string, the final ordered list of pictures.
    //            The FIRST item becomes the main (profile) picture.
    //            Each item is either { "id": <existing picture_id> }
    //            or { "upload": <index in the "files" field> }.
    //   files  : the new image files (0 to 5).
    //
    // Everything runs inside one DB transaction: either all changes are
    // applied or none are. Old files are deleted from disk only after
    // the transaction has been committed.
    //
    // Note: there is no "position" column in user_pictures, so only the
    // MAIN picture choice is stored. The other pictures are returned by
    // GET /api/profile ordered by picture_id.
    // -----------------------------------------------------------------
    const IMAGES_DIR = path.resolve(__dirname, '../images')
    const IMAGE_BASE_URL = 'http://localhost:3001/images/'
    const MAX_PICTURES = 5
    const MAX_PICTURE_SIZE = 5 * 1024 * 1024
 
    const requireLogin = (request, response, next) => {
        if (!request.session.userid)
            return response.status(401).send('User not signed in!')
        next()
    }
 
    // Wraps multer so that upload errors (too many files, too large...)
    // are sent back as a normal 400 response.
    const receivePictures = (request, response, next) => {
        upload.array('files', MAX_PICTURES)(request, response, (error) => {
            if (error)
                return response.status(400).send(error.message || 'Upload failed.')
            next()
        })
    }
 
    const discardFiles = (files) => {
        (files || []).forEach(file => fs.unlink(file.path, () => { }))
    }
 
    app.put('/api/profile/pictures', requireLogin, receivePictures, async (request, response) => {
        const session = request.session
        const files = request.files || []
 
        // ---- 1) Validate the request before touching the database ----
        let layout
        try {
            layout = JSON.parse(request.body.layout)
        } catch (error) {
            discardFiles(files)
            return response.status(400).send('Invalid layout.')
        }
 
        if (!Array.isArray(layout) || layout.length < 1 || layout.length > MAX_PICTURES) {
            discardFiles(files)
            return response.status(400).send(`A profile needs between 1 and ${MAX_PICTURES} pictures.`)
        }
        // every item must have exactly one of "id" / "upload"
        if (layout.some(item => item === null || typeof item !== 'object' ||
            (item.id === undefined) === (item.upload === undefined))) {
            discardFiles(files)
            return response.status(400).send('Invalid layout.')
        }
        if (files.some(file => file.size > MAX_PICTURE_SIZE || !file.mimetype.startsWith('image/'))) {
            discardFiles(files)
            return response.status(400).send('Only images up to 5 megabytes are allowed.')
        }
 
        const keepIds = layout.filter(item => item.id !== undefined).map(item => Number(item.id))
        const uploadIndexes = layout.filter(item => item.upload !== undefined).map(item => Number(item.upload))
 
        const idsAreValid = keepIds.every(id => Number.isInteger(id)) && new Set(keepIds).size === keepIds.length
        const uploadsAreValid =
            uploadIndexes.every(i => Number.isInteger(i) && i >= 0 && i < files.length) &&
            new Set(uploadIndexes).size === uploadIndexes.length &&
            uploadIndexes.length === files.length // every uploaded file must be used
        if (!idsAreValid || !uploadsAreValid) {
            discardFiles(files)
            return response.status(400).send('Invalid layout.')
        }
 
        // ---- 2) Apply everything in one transaction ----
        const client = await pool.connect()
        const urlsToDelete = []
        try {
            await client.query('BEGIN')
 
            const { rows: current } = await client.query(
                `SELECT picture_id, picture_data FROM user_pictures WHERE user_id = $1`,
                [session.userid])
            const currentById = new Map(current.map(row => [row.picture_id, row.picture_data]))
 
            // A user can only keep pictures that already belong to them.
            if (keepIds.some(id => !currentById.has(id)))
                throw Object.assign(new Error('Unknown picture.'), { status: 400 })
 
            // Remove pictures that are not in the new layout.
            for (const [id, url] of currentById) {
                if (!keepIds.includes(id)) {
                    await client.query(
                        `DELETE FROM user_pictures WHERE user_id = $1 AND picture_id = $2`,
                        [session.userid, id])
                    urlsToDelete.push(url)
                }
            }
 
            // Insert the new files (as non-main for now) and build the final id list.
            const finalIds = []
            for (const item of layout) {
                if (item.id !== undefined) {
                    finalIds.push(Number(item.id))
                } else {
                    const file = files[Number(item.upload)]
                    const { rows } = await client.query(
                        `INSERT INTO user_pictures (user_id, picture_data, profile_pic)
                        VALUES ($1, $2, 'NO')
                        RETURNING picture_id`,
                        [session.userid, IMAGE_BASE_URL + file.filename])
                    finalIds.push(rows[0].picture_id)
                }
            }
 
            // The first picture of the layout is the main picture.
            await client.query(
                `UPDATE user_pictures SET profile_pic = 'NO' WHERE user_id = $1`,
                [session.userid])
            await client.query(
                `UPDATE user_pictures SET profile_pic = 'YES'
                WHERE user_id = $1 AND picture_id = $2`,
                [session.userid, finalIds[0]])
 
            // Fame rates: 2 points per picture, maximum 10.
            const picturePoints = Math.min(finalIds.length * 2, 10)
            await client.query(
                `UPDATE fame_rates
                SET total_pts = total_pts - picture_pts + $2, picture_pts = $2
                WHERE user_id = $1`,
                [session.userid, picturePoints])
 
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            // The transaction was rolled back, so the new files are not needed.
            discardFiles(files)
            console.error(error)
            return response
                .status(error.status || 500)
                .send(error.status ? error.message : 'Something went wrong when trying to update the pictures.')
        } finally {
            client.release()
        }
 
        // ---- 3) Delete the removed files from disk (after COMMIT) ----
        for (const url of urlsToDelete) {
            if (!url || url.endsWith('default_profilepic.jpeg')) continue
            fs.unlink(path.join(IMAGES_DIR, path.basename(url)), () => { })
        }
 
        response.status(200).send(true)
    })
 
    // -----------------------------------------------------------------
    // OLD picture endpoints. They are not needed by the new profile page
    // anymore. They are kept here only in case another page (for example
    // onboarding) still uses them. Delete them when nothing uses them.
    // -----------------------------------------------------------------
    app.post('/api/profile/setprofilepic', upload.single('file'), async (request, response) => {
        const session = request.session
        const picture = 'http://localhost:3001/images/' + request.file.filename
        if (session.userid) {
            if (request.file.size > 5242880) {
                return response.send('The maximum size for uploaded images is 5 megabytes.')
            }
            try {
                var sql = `SELECT * FROM user_pictures
                            WHERE user_id = $1
                            AND profile_pic = $2;`
                const profilePic = await pool.query(sql, [session.userid, 'YES'])
                // We check for an existing profile picture.
                if (profilePic.rows.length === 0) {
                    sql = `INSERT INTO user_pictures (user_id, picture_data, profile_pic)
                            VALUES ($1, $2, $3);`
                    await pool.query(sql, [session.userid, picture, 'YES'])
                    // console.log('session.userid: ', session.userid)
 
                    // Fame rates. Adjust later.
                    sql = `UPDATE fame_rates SET picture_pts = picture_pts + 2, total_pts = total_pts + 2
					        WHERE user_id = $1 AND picture_pts < 10 AND total_pts <= 98`
                    await pool.query(sql, [session.userid])
                } else {
                    let oldImageData = profilePic.rows[0]['picture_data']
                    // path.resolve gets the absolute path of '../images'
                    const oldImage = path.resolve(__dirname, '../images') + oldImageData.replace('http://localhost:3001/images', '')
                    // fs.existsSync checks if the image already exists, so if there is already an image with same name
                    // in the images folder
                    // console.log('Set a new profile picture to replace the old one.')
                    if (fs.existsSync(oldImage)) {
                        // If it is, we remove it with fs.unlink
                        fs.unlink(oldImage, (error) => {
                            if (error) {
                                console.error('fs.unlink failed: ', error)
                                return
                            }
                        })
                    }
                    // We set the profile picture
                    sql = `UPDATE user_pictures SET picture_data = $1
                            WHERE user_id = $2
                            AND profile_pic = $3`
                    await pool.query(sql, [picture, session.userid, 'YES'])
                }
                response.send(true)
            } catch (error) {
                console.error(error)
                response.send('Something went wrong when trying to upload the image.')
            }
        }
    })
 
    app.post('/api/profile/imageupload', upload.single('file'), async (request, response) => {
        const session = request.session
        const picture = 'http://localhost:3001/images/' + request.file.filename
        if (session.userid) {
            if (request.file.size > 5242880) {
                return response.send('The maximum size for uploaded images is 5 megabytes.')
            }
            try {
                var sql = `SELECT * FROM user_pictures
                        WHERE user_id = $1;`
                const number_of_images = await pool.query(sql, [session.userid])
                if (number_of_images.rows.length < 5) {
                    sql = `INSERT INTO user_pictures (user_id, picture_data, profile_pic)
                        VALUES ($1, $2, $3);`
                    await pool.query(sql, [session.userid, picture, 'NO'])
                    sql = `UPDATE fame_rates SET picture_pts = picture_pts + 2, total_pts = total_pts + 2
					    WHERE user_id = $1 AND picture_pts < 10 AND total_pts <= 98`
 
                    //Fame rates. Adjust later.
                    await pool.query(sql, [session.userid])
                    response.send(true)
                } else {
                    response.send('Your profile can have a maximum of 5 pictures. Delete a picture to make room for more.')
                }
            } catch (error) {
                console.error(error)
                response.send('Something went wrong when trying to upload the image.')
            }
        }
    })
 
    app.delete('/api/profile/deletepicture/:id', async (request, response) => {
        const session = request.session
 
        if (session.userid) {
            const picture_id = request.params.id
 
            var sql = `SELECT * FROM user_pictures WHERE user_id = $1 AND picture_id = $2`
            var pictureData = await pool.query(sql, [session.userid, picture_id])
 
            var oldImageData = pictureData.rows[0]['picture_data']
            if (oldImageData !== 'http://localhost:3001/images/default_profilepic.jpeg') {
                const oldImage = path.resolve(__dirname, '../images') + oldImageData.replace('http://localhost:3001/images', '');
 
                if (fs.existsSync(oldImage)) {
                    fs.unlink(oldImage, (error) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                    })
                }
            }
            try {
                sql = "DELETE FROM user_pictures WHERE user_id = $1 AND picture_id = $2"
                await pool.query(sql, [session.userid, picture_id])
                sql = `UPDATE fame_rates SET picture_pts = picture_pts - 2, total_pts = total_pts - 2
                        WHERE user_id = $1 AND picture_pts > 0`
                await pool.query(sql, [session.userid])
                response.status(200).send("Picture deleted")
            } catch (error) {
                console.error("Something went wrong when trying to delete the picture: ", error)
                response.send("Something went wrong when trying to delete the picture.")
                return
            }
        }
    })
 
    app.post('/api/profile/changepassword', async (request, response) => {
        const session = request.session
        const { oldPassword, newPassword, confirmPassword } = request.body
 
        // We use return response.send because we want the headers to be set max once per scenario,
        // so if we fail the initial change (because of a lacking password, etc.), we can try again.
        if (newPassword !== confirmPassword) {
            return response.send("The entered new passwords don't match!")
        }
        else if (!newPassword.match(/(?=^.{8,30}$)(?=.*\d)(?=.*[!.@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            return response.send("Please enter a password with a length between 8 and 30 characters, at least one lowercase alphabetical character (a to z), at least one uppercase alphabetical character (A-Z), at least one numeric character (0-9), and at least one special character (!.@#$%^&*)")
        }
 
        var sql = `SELECT * FROM users WHERE id = $1`;
        const retrievedPassword = await pool.query(sql, [session.userid])
 
        if (!(await bcrypt.compare(oldPassword, retrievedPassword.rows[0]['password']))) {
            return response.send("The current password you entered was not correct!")
        } else {
            const hash = await bcrypt.hash(newPassword, 10);
            try {
                sql = "UPDATE users SET password = $1 WHERE id = $2";
                await pool.query(sql, [hash, session.userid])
                return response.send(true)
            } catch (error) {
                console.error("Something went wrong when trying to change the password:", error)
                return response.send("Something went wrong when trying to change your password. Please try again!")
            }
        }
    })
 
    app.get('/api/profile/notifications', async (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                var sql = `SELECT notification_id AS id, notifications.user_id AS user_id, sender_id,
							notification_text AS text, redirect_path, read, picture_data AS picture
							FROM notifications
							INNER JOIN user_pictures ON notifications.sender_id = user_pictures.user_id AND user_pictures.profile_pic = $1
							WHERE notifications.user_id = $2
							ORDER BY notification_id DESC`
                const notificationsData = await pool.query(sql, ['YES', session.userid])
                response.send(notificationsData.rows)
            } catch (error) {
                response.send(false)
            }
        } else {
            response.send(false)
        }
    })
 
    app.delete('/api/profile/notifications', (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                var sql = `DELETE FROM notifications WHERE user_id = $1`
                pool.query(sql, [session.userid])
                response.send(true)
            } catch (error) {
                console.error('Something went wrong when trying to clear notifications: ', error)
                response.send("Something went wrong when trying to clear notifications.")
            }
        }
    })
 
    app.patch('/api/profile/readnotification/:id', (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                const notification_id = request.params.id
                var sql = `UPDATE notifications SET read = $1
                            WHERE user_id = $2
                            AND notification_id = $3`
                pool.query(sql, ['YES', session.userid, notification_id])
                response.send(true)
            } catch (error) {
                console.error(error)
                response.send("Something went wrong when trying mark the notification as 'read'")
            }
        }
    })
 
    app.patch('/api/profile/readnotifications', (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                var sql = `UPDATE notifications SET read = $1
                            WHERE user_id = $2`
                pool.query(sql, ['YES', session.userid])
                response.send(true)
            } catch (error) {
                console.error(error)
                response.send("Something went wrong when trying mark all notifications as 'read'")
            }
        }
    })
 
    app.delete('/api/profile/notification/:id', (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                const notification_id = request.params.id
                var sql = `DELETE FROM notifications WHERE user_id = $1 AND notification_id = $2`
                pool.query(sql, [session.userid, notification_id])
                response.send(true)
            } catch (error) {
                response.send("Failed to delete notification")
            }
        }
    })
 
    app.delete('/api/profile/deleteuser', (request, response) => {
        const session = request.session
 
        if (session.userid) {
            try {
                var sql = `DELETE FROM users WHERE id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM likes WHERE target_id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM blocks WHERE target_id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM watches WHERE target_id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM reports WHERE target_id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM connections WHERE user2_id = $1`
                pool.query(sql, [session.userid])
                var sql = `DELETE FROM notifications WHERE sender_id = $1`
                pool.query(sql, [session.userid])
                response.send(true)
            } catch (error) {
                // console.log(error)
                response.send("Failed to delete user!")
            }
        }
    })
}