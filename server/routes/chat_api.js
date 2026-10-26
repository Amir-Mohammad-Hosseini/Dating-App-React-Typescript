const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const CHAT_IMAGES_DIR = path.join("images", "chat");
fs.mkdirSync(CHAT_IMAGES_DIR, { recursive: true });

const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const chatImageUpload = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => callback(null, CHAT_IMAGES_DIR),
    filename: (request, file, callback) => {
      const random = crypto.randomBytes(16).toString("hex");
      callback(
        null,
        `${request.session.userid}-${Date.now()}-${random}${ALLOWED_IMAGE_TYPES[file.mimetype]}`,
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) =>
    callback(
      null,
      Object.prototype.hasOwnProperty.call(ALLOWED_IMAGE_TYPES, file.mimetype),
    ),
});

const handleChatImageUpload = (request, response, next) => {
  chatImageUpload.single("image")(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      return response.status(413).send({ error: error.code });
    }
    if (error) {
      console.error(error);
      return response.status(500).send(false);
    }
    next();
  });
};

module.exports = (app, pool, socketIO) => {
  const isUserOnline = (userId) =>
    (socketIO.sockets.adapter.rooms.get(`user-${userId}`)?.size ?? 0) > 0;

  const requireLogin = (request, response, next) => {
    if (!request.session.userid) return response.status(401).send(false);
    next();
  };

  app.get("/api/chat/chat_connections", async (request, response) => {
    const session = request.session;
    if (!session.userid) return response.status(401).send(false);

    try {
      const sql = `SELECT c.connection_id,
                        u.id AS user_id, u.username, u.firstname,
                        u.last_connection,
                        us.age, up.picture_data,
                        CASE
                            WHEN lm.time_stamp IS NULL THEN NULL
                            WHEN lm.message IS NULL OR lm.message = '' THEN 'Photo'
                            ELSE lm.message
                        END AS last_message,
                        lm.time_stamp AS last_message_time,
                        lm.sender_id AS last_message_sender_id,
                        uc.unread_count
                    FROM connections c
                    INNER JOIN users u
                        ON u.id = CASE WHEN c.user1_id = $1 THEN c.user2_id ELSE c.user1_id END
                    LEFT JOIN user_settings us ON us.user_id = u.id
                    LEFT JOIN user_pictures up
                        ON up.user_id = u.id AND up.profile_pic = 'YES'
                    LEFT JOIN LATERAL (
                        SELECT message, time_stamp, sender_id
                        FROM chat
                        WHERE chat.connection_id = c.connection_id
                          AND chat.time_stamp > COALESCE(
                                (SELECT cc.cleared_at FROM chat_clears cc
                                 WHERE cc.connection_id = c.connection_id
                                   AND cc.user_id = $1),
                                '-infinity'::timestamp)
                        ORDER BY time_stamp DESC
                        LIMIT 1
                    ) lm ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT COUNT(*)::int AS unread_count
                        FROM chat
                        WHERE chat.connection_id = c.connection_id
                          AND chat.sender_id <> $1
                          AND chat.is_read = FALSE
                    ) uc ON TRUE
                    WHERE c.user1_id = $1 OR c.user2_id = $1
                    ORDER BY lm.time_stamp DESC NULLS LAST, c.connection_id DESC`;
      const { rows } = await pool.query(sql, [session.userid]);

      response.send(
        rows.map((row) => ({ ...row, is_online: isUserOnline(row.user_id) })),
      );
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });

  app.post("/api/chat/room_messages", async (request, response) => {
    const session = request.session;
    if (!session.userid) return response.status(401).send(false);

    const connection_id = Number(request.body.room);
    if (!Number.isInteger(connection_id))
      return response.status(400).send(false);

    try {
      const member = await pool.query(
        `SELECT 1 FROM connections
         WHERE connection_id = $1 AND (user1_id = $2 OR user2_id = $2)`,
        [connection_id, session.userid],
      );
      if (member.rows.length === 0) return response.status(403).send(false);

      const { rows } = await pool.query(
        `SELECT COALESCE(message, '') AS text, image_url, sender_id,
                username AS name, connection_id AS room,
                chat_id AS key, time_stamp
         FROM chat
         INNER JOIN users ON users.id = chat.sender_id
         WHERE connection_id = $1
           AND time_stamp > COALESCE(
                 (SELECT cleared_at FROM chat_clears
                  WHERE connection_id = $1 AND user_id = $2),
                 '-infinity'::timestamp)
         ORDER BY time_stamp ASC`,
        [connection_id, session.userid],
      );
      response.send(rows);
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });

  app.post("/api/chat/clear_chat", requireLogin, async (request, response) => {
    const userId = Number(request.session.userid);

    const connection_id = Number(request.body.room);
    if (!Number.isInteger(connection_id))
      return response.status(400).send(false);

    try {
      const member = await pool.query(
        `SELECT 1 FROM connections
         WHERE connection_id = $1 AND (user1_id = $2 OR user2_id = $2)`,
        [connection_id, userId],
      );
      if (member.rows.length === 0) return response.status(403).send(false);

      await pool.query(
        `INSERT INTO chat_clears (connection_id, user_id, cleared_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (connection_id, user_id) DO UPDATE SET cleared_at = NOW()`,
        [connection_id, userId],
      );

      await pool.query(
        `UPDATE chat SET is_read = TRUE
         WHERE connection_id = $1 AND sender_id <> $2 AND is_read = FALSE`,
        [connection_id, userId],
      );

      socketIO
        .to(`user-${userId}`)
        .emit("conversation_updated", { room: connection_id });

      response.send(true);
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });

  app.get("/api/chat/presence/:userId", async (request, response) => {
    if (!request.session.userid) return response.status(401).send(false);

    const userId = Number(request.params.userId);
    if (!Number.isInteger(userId)) return response.status(400).send(false);

    try {
      const { rows } = await pool.query(
        `SELECT last_connection FROM users WHERE id = $1`,
        [userId],
      );
      if (rows.length === 0) return response.status(404).send(false);

      response.send({
        is_online: isUserOnline(userId),
        last_connection: rows[0].last_connection,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });

  app.post(
    "/api/chat/upload_image",
    requireLogin,
    handleChatImageUpload,
    (request, response) => {
      if (!request.file) {
        return response.status(400).send({ error: "invalid_file" });
      }
      response.send({ image_url: `/images/chat/${request.file.filename}` });
    },
  );
};