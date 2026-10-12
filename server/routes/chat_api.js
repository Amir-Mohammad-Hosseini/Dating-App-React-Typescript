module.exports = (app, pool) => {
  app.get("/api/chat/chat_connections", async (request, response) => {
    const session = request.session;
    if (!session.userid) return response.send(false);

    try {
      const sql = `SELECT c.connection_id,
                        u.id AS user_id, u.username, u.firstname,
                        us.age, up.picture_data
                    FROM connections c
                    INNER JOIN users u
                        ON u.id = CASE WHEN c.user1_id = $1 THEN c.user2_id ELSE c.user1_id END
                    LEFT JOIN user_settings us ON us.user_id = u.id
                    LEFT JOIN user_pictures up
                        ON up.user_id = u.id AND up.profile_pic = 'YES'
                    WHERE c.user1_id = $1 OR c.user2_id = $1
                    ORDER BY c.connection_id DESC`;
      const { rows } = await pool.query(sql, [session.userid]);
      response.send(rows);
    } catch (error) {
      console.error(error);
      response.send(false);
    }
  });

  app.post("/api/chat/room_messages", async (request, response) => {
    const session = request.session;
    const connection_id = request.body.room;
    try {
      if (session.userid) {
        var sql = `SELECT message AS text, sender_id, username AS name, connection_id AS room, chat_id AS key
                            FROM chat
				            INNER JOIN users ON users.id = chat.sender_id
				            WHERE connection_id = $1
                            ORDER BY time_stamp ASC`;
        var { rows } = await pool.query(sql, [connection_id]);
        response.send(rows);
      } else {
        response.send(false);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
