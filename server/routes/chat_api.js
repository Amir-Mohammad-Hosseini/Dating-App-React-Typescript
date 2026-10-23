module.exports = (app, pool) => {
  app.get("/api/chat/chat_connections", async (request, response) => {
    const session = request.session;
    if (!session.userid) return response.status(401).send(false);

    try {
      const sql = `SELECT c.connection_id,
                        u.id AS user_id, u.username, u.firstname,
                        us.age, up.picture_data,
                        lm.message AS last_message,
                        lm.time_stamp AS last_message_time,
                        lm.sender_id AS last_message_sender_id,
                        uc.unread_count
                    FROM connections c
                    INNER JOIN users u
                        ON u.id = CASE WHEN c.user1_id = $1 THEN c.user2_id ELSE c.user1_id END
                    LEFT JOIN user_settings us ON us.user_id = u.id
                    LEFT JOIN user_pictures up
                        ON up.user_id = u.id AND up.profile_pic = 'YES'
                    -- آخرین پیام این چت
                    LEFT JOIN LATERAL (
                        SELECT message, time_stamp, sender_id
                        FROM chat
                        WHERE chat.connection_id = c.connection_id
                        ORDER BY time_stamp DESC
                        LIMIT 1
                    ) lm ON TRUE
                    -- تعداد پیام‌های نخوانده‌ای که طرف مقابل فرستاده
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
      response.send(rows);
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
        `SELECT message AS text, sender_id, username AS name,
                connection_id AS room, chat_id AS key, time_stamp
         FROM chat
         INNER JOIN users ON users.id = chat.sender_id
         WHERE connection_id = $1
         ORDER BY time_stamp ASC`,
        [connection_id],
      );
      response.send(rows);
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });
};