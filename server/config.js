require('dotenv').config()

const PORT = process.env.PORT

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const GOOGLE_API = process.env.GOOGLE_API
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT

module.exports = {
  pgUser: process.env.PGUSER,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
  pgHost: process.env.PGHOST,
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  GOOGLE_API,
  SMTP_HOST,
  SMTP_PORT,
}