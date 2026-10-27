module.exports = (app, pool, socketIO) => {
  const isUserOnline = (userId) =>
    (socketIO.sockets.adapter.rooms.get(`user-${userId}`)?.size ?? 0) > 0;

  const requireLogin = (request, response, next) => {
    if (!request.session.userid) return response.status(401).send(false);
    next();
  };

  // Shared by both routes. Everything except the "source" of the activity
  // (who liked me / who visited me) is identical.
  const withExtras = (rows) =>
    rows.map((row) => ({ ...row, is_online: isUserOnline(row.user_id) }));

  // ---------------------------------------------------------------
  // GET /api/profile/likers
  // People who liked me. Newest first.
  // ---------------------------------------------------------------
  app.get("/api/profile/likers", requireLogin, async (request, response) => {
    try {
      const sql = `SELECT u.id AS user_id, u.firstname, u.username,
                          us.age, up.picture_data,
                          l.liketime AS activity_time,
                          c.connection_id,
                          EXISTS (
                            SELECT 1 FROM likes mine
                            WHERE mine.liker_id = $1 AND mine.target_id = u.id
                          ) AS i_liked,
                          (l.liketime > NOW()::timestamp - INTERVAL '24 hours') AS is_new
                   FROM likes l
                   INNER JOIN users u ON u.id = l.liker_id
                   LEFT JOIN user_settings us ON us.user_id = u.id
                   LEFT JOIN user_pictures up
                          ON up.user_id = u.id AND up.profile_pic = 'YES'
                   LEFT JOIN connections c
                          ON (c.user1_id = $1 AND c.user2_id = u.id)
                          OR (c.user1_id = u.id AND c.user2_id = $1)
                   WHERE l.target_id = $1
                     AND NOT EXISTS (
                       SELECT 1 FROM blocks b
                       WHERE (b.blocker_id = $1 AND b.target_id = u.id)
                          OR (b.blocker_id = u.id AND b.target_id = $1)
                     )
                   ORDER BY l.liketime DESC`;
      const { rows } = await pool.query(sql, [request.session.userid]);
      response.send(withExtras(rows));
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });

  // ---------------------------------------------------------------
  // GET /api/profile/visitors
  // People who viewed my profile. One row per visitor:
  // visit_count = how many times, activity_time = the last visit.
  // ---------------------------------------------------------------
  app.get("/api/profile/visitors", requireLogin, async (request, response) => {
    try {
      const sql = `SELECT u.id AS user_id, u.firstname, u.username,
                          us.age, up.picture_data,
                          v.activity_time, v.visit_count,
                          c.connection_id,
                          EXISTS (
                            SELECT 1 FROM likes mine
                            WHERE mine.liker_id = $1 AND mine.target_id = u.id
                          ) AS i_liked,
                          (v.activity_time > NOW()::timestamp - INTERVAL '24 hours') AS is_new
                   FROM (
                     SELECT watcher_id,
                            MAX(time_stamp) AS activity_time,
                            COUNT(*)::int AS visit_count
                     FROM watches
                     WHERE target_id = $1
                     GROUP BY watcher_id
                   ) v
                   INNER JOIN users u ON u.id = v.watcher_id
                   LEFT JOIN user_settings us ON us.user_id = u.id
                   LEFT JOIN user_pictures up
                          ON up.user_id = u.id AND up.profile_pic = 'YES'
                   LEFT JOIN connections c
                          ON (c.user1_id = $1 AND c.user2_id = u.id)
                          OR (c.user1_id = u.id AND c.user2_id = $1)
                   WHERE u.id <> $1
                     AND NOT EXISTS (
                       SELECT 1 FROM blocks b
                       WHERE (b.blocker_id = $1 AND b.target_id = u.id)
                          OR (b.blocker_id = u.id AND b.target_id = $1)
                     )
                   ORDER BY v.activity_time DESC`;
      const { rows } = await pool.query(sql, [request.session.userid]);
      response.send(withExtras(rows));
    } catch (error) {
      console.error(error);
      response.status(500).send(false);
    }
  });
};
