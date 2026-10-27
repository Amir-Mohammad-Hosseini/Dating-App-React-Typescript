const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const config = require("./config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  pgUser,
  pgPassword,
  pgDatabase,
  pgHost,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  SMTP_HOST,
  SMTP_PORT,
} = require("./config");
const http = require("http").Server(app); //required for socket to work

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const sessionMiddleware = session({
  secret: "secret",
  saveUninitialized: true,
  resave: true,
  cookie: {
    sameSite: "strict",
  },
});
app.use(sessionMiddleware);

app.use("/images", express.static("./images")); // to serve static files to path /images, from images folder

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

socketIO.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// POSTGRES SETUP
const Pool = require("pg").Pool;

const pool = new Pool({
  user: pgUser,
  password: pgPassword,
  host: pgHost,
  database: pgDatabase,
  port: 5432,
});

const connectToDatabase = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.log("Error acquiring client", err.stack);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectToDatabase, 5000);
    } else {
      console.log("Connected to database");
    }
  });
};
connectToDatabase();

// EMAIL SETUP
// If SMTP_HOST is set (Mailpit in development), we use it with no login.
// Otherwise we fall back to Gmail with EMAIL_ADDRESS / EMAIL_PASSWORD.
const transporter = nodemailer.createTransport(
  SMTP_HOST
    ? {
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 1025,
        secure: false,
      }
    : {
        service: "gmail",
        auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD,
        },
      },
);

transporter.verify((error) => {
  if (error) console.error("SMTP connection failed:", error.message);
  else console.log("SMTP ready:", SMTP_HOST ? `${SMTP_HOST}:${SMTP_PORT}` : "gmail");
});

// Think about adding fieldname to naming if necessary.
const storage = multer.diskStorage({
  destination: (request, file, callbackFunction) => {
    callbackFunction(null, "images/");
  },
  filename: (request, file, callbackFunction) => {
    console.log("file: ", file);
    callbackFunction(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

require("./routes/login.js")(app, pool, bcrypt);
require("./routes/profile.js")(app, pool, upload, fs, path, bcrypt);
require("./routes/signup.js")(app, pool, bcrypt, transporter, crypto);
require("./routes/browsing.js")(app, pool, transporter, socketIO);
require("./routes/resetpassword.js")(app, pool, bcrypt, transporter, crypto);
require("./routes/chat_api.js")(app, pool, socketIO);
require("./routes/activity.js")(app, pool, socketIO);
require("./routes/chat.js")(pool, socketIO);

const PORT = config.PORT || 3001;

http.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});