module.exports = (app, pool, transporter, socketIO) => {
  // Great-circle distance in kilometers (Haversine formula).
  // Returns null if any coordinate is missing / not a finite number.
  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const values = [lat1, lon1, lat2, lon2];
    if (values.some((v) => v === null || v === undefined || v === ""))
      return null;
    const [a1, o1, a2, o2] = values.map(Number);
    if (![a1, o1, a2, o2].every(Number.isFinite)) return null;
 
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(a2 - a1);
    const dLon = toRad(o2 - o1);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a1)) * Math.cos(toRad(a2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  };
 
  app.get("/api/browsing/tags", async (request, response) => {
    try {
      var sql = "SELECT * FROM tags ORDER BY tag_content ASC;";
      const result = await pool.query(sql);
      response.send(result.rows);
    } catch (error) {
      console.error("catching error from browsing.js");
      response.send(false);
    }
  });
 
  app.get("/api/browsing/user_tags/:id", async (request, response) => {
    const user_id = request.params.id;
    var sql = `SELECT * FROM tags WHERE tagged_users @> array[$1]::INT[]`;
    const result = await pool.query(sql, [user_id]);
 
    response.send(result.rows);
  });
 
  app.post("/api/browsing/sorted", async (request, response) => {
    const session = request.session;
 
    const min_age = request.body.min_age;
    const max_age = request.body.max_age;
    const min_fame = request.body.min_fame;
    const max_fame = request.body.max_fame;
    const min_distance = request.body.min_distance;
    const max_distance = request.body.max_distance;
 
    if (session.userid && session.location) {
      try {
        const retrieveEveryonesTags = async (rows) => {
          for (let i = 0; i < rows.length; i++) {
            var sql = `SELECT tag_content FROM tags WHERE tagged_users @> array[$1]::INT[]`;
            var { rows: tags } = await pool.query(sql, [rows[i].id]);
            for (let j = 0; j < tags.length; j++) {
              tags[j] = tags[j].tag_content;
            }
            rows[i].tags = tags;
          }
          return rows;
        };
 
        var sql = `SELECT id, username, firstname, lastname, gender, age,
                  sexual_pref, biography, total_pts AS fame_rating, user_location,
                  picture_data AS profile_pic, blocker_id, target_id,
						      calculate_distance($6, $7, ip_location[0], ip_location[1], 'K') AS distance,
						      (SELECT COUNT(*) FROM tags WHERE tagged_users @> array[$1, users.id]) AS common_tags
						      FROM users
						      INNER JOIN user_settings ON users.id = user_settings.user_id
						      INNER JOIN fame_rates ON users.id = fame_rates.user_id
						      LEFT JOIN user_pictures ON users.id = user_pictures.user_id
                    AND user_pictures.profile_pic = $10
						      LEFT JOIN blocks ON (users.id = blocks.target_id
                    AND blocks.blocker_id = $1)
                    OR (users.id = blocks.blocker_id AND blocks.target_id = $1)
						      WHERE users.id != $1
                  AND users.verified = $10
                  AND blocker_id IS NULL AND target_id IS NULL
						      AND age BETWEEN $2 and $3 AND total_pts BETWEEN $4 and $5
						      AND calculate_distance($6, $7, ip_location[0], ip_location[1], 'K') BETWEEN $8 and $9
						      ORDER BY username ASC;`;
        var { rows } = await pool.query(sql, [
          session.userid,
          min_age,
          max_age,
          min_fame,
          max_fame,
          session.location.x,
          session.location.y,
          min_distance,
          max_distance,
          "YES",
        ]);
 
        retrieveEveryonesTags(rows).then((rows) => {
          response.send(rows);
        });
      } catch (error) {
        response.send("Fetching users failed");
      }
    } else {
      response.status(401).send(false);
    }
  });
 
  app.get("/api/browsing/userlists", async (request, response) => {
    const session = request.session;
    if (session.userid) {
      var sql = `SELECT target_id FROM likes WHERE liker_id = $1`;
      const likedusers = await pool.query(sql, [session.userid]);
      const likedUserIds = likedusers.rows.map((user) => user.target_id);
 
      var sql = `SELECT user2_id FROM connections WHERE user1_id = $1`;
      var results1 = await pool.query(sql, [session.userid]);
      var sql = `SELECT user1_id FROM connections WHERE user2_id = $1`;
      var results2 = await pool.query(sql, [session.userid]);
      const connectedusers = results1.rows.concat(results2.rows);
      const connectedUserIds = connectedusers.map((result) => {
        if (result.user1_id) return result.user1_id;
        else if (result.user2_id) return result.user2_id;
      });
 
      var sql = `SELECT target_id FROM blocks WHERE blocker_id = $1`;
      const blockedusers = await pool.query(sql, [session.userid]);
      const blockedUserIds = blockedusers.rows.map((user) => user.target_id);
 
      const userLists = {
        liked: likedUserIds,
        connected: connectedUserIds,
        blocked: blockedUserIds,
      };
      response.send(userLists);
    } else {
      response.send(false);
    }
  });
 
  const sendNotification = async (
    userid,
    notification_id,
    notification,
    target_id,
    redirect_address,
  ) => {
    if (userid) {
      var sql = `SELECT picture_data FROM user_pictures
                WHERE user_id = $1
                AND profile_pic = $2;`;
      const { rows } = await pool.query(sql, [userid, "YES"]);
      let picture = rows[0] ? rows[0]["picture_data"] : null;
      var data = {
        id: notification_id,
        user_id: Number(target_id),
        sender_id: userid,
        text: notification,
        redirect_path: redirect_address,
        // the notifications table uses 'YES' / 'NO', so a brand-new
        // notification must be unread: 'NO'.
        read: "NO",
        picture,
        time_stamp: new Date(),
      };
      socketIO.to(`notification-${target_id}`).emit("new_notification", data);
    }
  };
 
  app.get("/api/browsing/profile/:id", async (request, response) => {
    const session = request.session;
 
    if (!session.userid) return response.status(401).send(false);
 
    try {
      const profile_id = Number(request.params.id);
      if (!Number.isInteger(profile_id))
        return response.status(400).send(false);
 
      // a blocked user (in either direction) cannot be viewed.
      var sql = `SELECT 1 FROM blocks
              WHERE (blocker_id = $1 AND target_id = $2)
              OR (blocker_id = $2 AND target_id = $1)`;
      const blockCheck = await pool.query(sql, [session.userid, profile_id]);
      if (blockCheck.rows.length > 0) return response.status(404).send(false);
 
      sql = `SELECT *,
              TO_CHAR(last_connection AT time zone 'UTC' AT time zone 'Europe/Helsinki', 'dd.mm.yyyy hh24:mi:ss') AS connection_time
              FROM users
              INNER JOIN user_settings ON users.id = user_settings.user_id
              INNER JOIN fame_rates ON users.id = fame_rates.user_id
              WHERE users.id = $1;`;
      const requestedUserData = await pool.query(sql, [profile_id]);
 
      if (requestedUserData.rows.length === 0)
        return response.status(404).send(false);
 
      const { password, email, ...profileData } = requestedUserData.rows[0];
 
      // Distance (km) between the logged-in user and the viewed profile.
      // Calculated in JS so a bad / missing ip_location can never cause a 500.
      // Stays null when either side has no usable location.
      profileData.distance = null;
      try {
        if (session.location) {
          const locResult = await pool.query(
            `SELECT ip_location[0] AS lat, ip_location[1] AS lon
             FROM users WHERE id = $1`,
            [profile_id],
          );
          const target = locResult.rows[0];
          if (target) {
            profileData.distance = haversineKm(
              session.location.x,
              session.location.y,
              target.lat,
              target.lon,
            );
          }
        }
      } catch (distanceError) {
        console.error("distance calculation failed:", distanceError.message);
        profileData.distance = null;
      }
 
      sql = `SELECT * FROM tags
          WHERE tagged_users @> array[$1]::INT[]
          ORDER BY tag_id ASC`;
      const requestedUserTags = await pool.query(sql, [profile_id]);
 
      profileData.tags = requestedUserTags.rows.map((tag) => tag.tag_content);
 
      sql = `SELECT * FROM user_pictures WHERE user_id = $1 AND profile_pic = $2`;
      const profile_pic = await pool.query(sql, [profile_id, "YES"]);
 
      if (profile_pic.rows[0]) {
        profileData.profile_pic = profile_pic.rows[0];
      } else {
        profileData.profile_pic = { user_id: profile_id, picture_data: null };
      }
 
      sql = `SELECT * FROM user_pictures
          WHERE user_id = $1 AND profile_pic = $2
          ORDER BY picture_id ASC`;
      const other_pics = await pool.query(sql, [profile_id, "NO"]);
      profileData.other_pictures = other_pics.rows;
 
      // Side effects (watch record + notification) must never break the
      // profile response, so they live in their own try/catch.
      if (profile_id !== Number(session.userid)) {
        try {
          sql = `INSERT INTO watches (watcher_id, target_id) VALUES ($1,$2)`;
          pool.query(sql, [session.userid, profile_id]).catch(console.error);
 
          var notification = `The user ${session.username} just checked your profile`;
          sql = `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
              VALUES ($1,$2, $3, $4)
              RETURNING notification_id`;
          const inserted_notif_id = await pool.query(sql, [
            profile_id,
            notification,
            `/profile/${session.userid}`,
            session.userid,
          ]);
 
          sendNotification(
            session.userid,
            inserted_notif_id.rows[0]["notification_id"],
            notification,
            profile_id,
            `/profile/${session.userid}`,
          ).catch(console.error);
        } catch (sideEffectError) {
          console.error(
            "profile view side effect failed:",
            sideEffectError.message,
          );
        }
      }
 
      response.send(profileData);
    } catch (error) {
      console.error("PROFILE ROUTE ERROR:", error.message, error.stack);
      response.status(500).send(false);
    }
  });
 
  app.post("/api/browsing/likeuser/:id", async (request, response) => {
    const session = request.session;
 
    if (session.userid) {
      var sql = `SELECT picture_data FROM user_pictures
						    WHERE user_id = $1 AND profile_pic = 'YES'`;
      const { rows } = await pool.query(sql, [session.userid]);
      if (
        rows[0] == undefined ||
        rows[0]["picture_data"] === null ||
        rows[0]["picture_data"] ===
          "http://localhost:3001/images/default_profilepic.jpeg"
      ) {
        return response.send("No profile picture");
      } else {
        const liked_person_id = request.params.id;
 
        // you cannot like yourself.
        if (Number(liked_person_id) === Number(session.userid))
          return response.status(400).send("You cannot like yourself!");
 
        // Used by the frontend to show the match modal.
        let isMatch = false;
        let connectionId = null;
 
        // preventing multiple presses of the like button
        var sql = `SELECT * FROM likes WHERE liker_id = $1 AND target_id = $2`;
        const likeAlreadyExistsCheck = await pool.query(sql, [
          session.userid,
          liked_person_id,
        ]);
 
        if (likeAlreadyExistsCheck.rows.length === 0) {
          var sql = `INSERT INTO likes (liker_id, target_id) VALUES ($1, $2)`;
          await pool.query(sql, [session.userid, liked_person_id]);
 
          var sql = `UPDATE fame_rates SET like_pts = like_pts + 10, total_pts = total_pts + 10
                    WHERE user_id = $1
                    AND like_pts <= 40 AND total_pts <= 90`;
          pool.query(sql, [liked_person_id]);
 
          var sql = `SELECT * FROM likes WHERE liker_id = $1 AND target_id = $2`;
          const reciprocalLikeExistsCheck = await pool.query(sql, [
            liked_person_id,
            session.userid,
          ]);
 
          var sql = `SELECT * FROM connections
							      WHERE (user1_id = $1 AND user2_id = $2)
                    OR (user1_id = $2 AND user2_id = $1)`;
          const connectionAlreadyExistsCheck = await pool.query(sql, [
            session.userid,
            liked_person_id,
          ]);
 
          if (
            reciprocalLikeExistsCheck.rows.length !== 0 &&
            connectionAlreadyExistsCheck.rows.length === 0
          ) {
            var sql = `INSERT INTO connections (user1_id, user2_id)
                      VALUES ($1, $2)
                      RETURNING connection_id`;
            const room_id = await pool.query(sql, [
              session.userid,
              liked_person_id,
            ]);
 
            isMatch = true;
            connectionId = room_id.rows[0]["connection_id"];
 
            // Generate and send a notification to both parties.
            var notification = `User ${session.username} also likes you!
										You are now able to chat with each other.`;
            var sql = `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
									    VALUES ($1, $2, $3, $4)
                      RETURNING notification_id`;
            var inserted_notif_id = await pool.query(sql, [
              liked_person_id,
              notification,
              `/chat/${room_id.rows[0]["connection_id"]}`,
              session.userid,
            ]);
 
            sendNotification(
              session.userid,
              inserted_notif_id.rows[0]["notification_id"],
              notification,
              liked_person_id,
              `/chat/${room_id.rows[0]["connection_id"]}`,
            );
 
            notification = `Click here to start chatting with your new match!`;
            var sql = `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
						          VALUES ($1, $2, $3, $4)
                      RETURNING notification_id`;
            inserted_notif_id = await pool.query(sql, [
              session.userid,
              notification,
              `/chat/${room_id.rows[0]["connection_id"]}`,
              liked_person_id,
            ]);
 
            sendNotification(
              liked_person_id,
              inserted_notif_id.rows[0]["notification_id"],
              notification,
              session.userid,
              `/chat/${room_id.rows[0]["connection_id"]}`,
            );
 
            var sql = `UPDATE fame_rates SET connection_pts = connection_pts + 5, total_pts = total_pts + 5
								      WHERE (user_id = $1 AND connection_pts <= 25 )
								      OR (user_id = $2 AND connection_pts <= 25)`;
            pool.query(sql, [liked_person_id, session.userid]);
          } else {
            // If the other party hasn't liked you yet, send them a message that you have liked them.
            var notification = `You have been liked by user ${session.username}`;
            var sql = `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
                      VALUES ($1, $2, $3, $4)
                      RETURNING notification_id`;
            var inserted_notif_id = await pool.query(sql, [
              liked_person_id,
              notification,
              `/profile/${session.userid}`,
              session.userid,
            ]);
 
            sendNotification(
              session.userid,
              inserted_notif_id.rows[0]["notification_id"],
              notification,
              liked_person_id,
              `/profile/${session.userid}`,
            );
          }
        }
        // JSON instead of a plain string, so the frontend knows about the match.
        response
          .status(200)
          .send({ message: "Liked user!", isMatch, connectionId });
      }
    } else {
      response.status(401).send(false);
    }
  });
 
  app.post("/api/browsing/unlikeuser/:id", async (request, response) => {
    const session = request.session;
 
    if (session.userid) {
      const unliked_person_id = request.params.id;
 
      var sql = `DELETE FROM likes WHERE liker_id = $1 AND target_id = $2`;
      await pool.query(sql, [session.userid, unliked_person_id]);
 
      sql = `SELECT * FROM likes WHERE target_id = $1`;
      const likes = await pool.query(sql, [unliked_person_id]);
 
      if (likes.rows.length < 5 && likes.rows.length > 0) {
        sql = `UPDATE fame_rates SET like_pts = like_pts - 10, total_pts = total_pts - 10
						  WHERE user_id = $1`;
        await pool.query(sql, [unliked_person_id]);
      }
 
      sql = `DELETE FROM connections
					  WHERE (user1_id = $1 AND user2_id = $2)
            OR (user1_id = $2 AND user2_id = $1)
            RETURNING *`;
      const { rows } = await pool.query(sql, [
        session.userid,
        unliked_person_id,
      ]);
 
      if (rows.length !== 0) {
                socketIO.to(`user-${unliked_person_id}`).emit("conversation_updated", {});
        socketIO.to(`user-${session.userid}`).emit("conversation_updated", {});
        var notification = `The user ${session.username} has unliked you. You can no longer chat with each other.`;
        sql = `INSERT INTO notifications (user_id, notification_text, sender_id)
              VALUES ($1, $2, $3)
							RETURNING notification_id`;
        const inserted_notif_id = await pool.query(sql, [
          unliked_person_id,
          notification,
          session.userid,
        ]);
 
        sendNotification(
          session.userid,
          inserted_notif_id.rows[0]["notification_id"],
          notification,
          unliked_person_id,
          null,
        );
 
        sql = `SELECT * FROM connections WHERE user1_id = $1 OR user2_id = $1`;
        const connections = await pool.query(sql, [unliked_person_id]);
 
        if (connections.rows.length < 6 && connections.rows.length > 0) {
          sql = `UPDATE fame_rates SET connection_pts = connection_pts - 5, total_pts = total_pts - 5
								WHERE user_id = $1`;
          await pool.query(sql, [unliked_person_id]);
        }
      }
      response.status(200).send("Unliked user!");
    } else {
      response.status(401).send(false);
    }
  });
 
  app.post("/api/browsing/blockuser/:id", async (request, response) => {
    const session = request.session;
 
    if (session.userid) {
      const blocked_person_id = request.params.id;
 
      // you cannot block yourself.
      if (Number(blocked_person_id) === Number(session.userid))
        return response.status(400).send("You cannot block yourself!");
 
      let sql = `SELECT * FROM blocks
                WHERE blocker_id = $1
                AND target_id = $2`;
      const already_blocked_check = await pool.query(sql, [
        session.userid,
        blocked_person_id,
      ]);
 
      if (already_blocked_check.rows.length > 0)
        return response.send("You have already blocked this user!");
 
      sql = `INSERT INTO blocks (blocker_id, target_id) VALUES ($1, $2)`;
      await pool.query(sql, [session.userid, blocked_person_id]);
 
      sql = `DELETE FROM likes
            WHERE (liker_id = $1 AND target_id = $2)
            OR (liker_id = $2 AND target_id = $1)`;
      await pool.query(sql, [session.userid, blocked_person_id]);
 
      sql = `SELECT * FROM likes WHERE target_id = $1`;
      const likes = await pool.query(sql, [blocked_person_id]);
 
      if (likes.rows.length < 5 && likes.rows.length > 0) {
        sql = `UPDATE fame_rates SET like_pts = like_pts - 10, total_pts = total_pts - 10
						  WHERE user_id = $1`;
        await pool.query(sql, [blocked_person_id]);
      }
 
      sql = `DELETE FROM connections
					  WHERE (user1_id = $1 AND user2_id = $2)
            OR (user1_id = $2 AND user2_id = $1)`;
      await pool.query(sql, [session.userid, blocked_person_id]);
      socketIO.to(`user-${blocked_person_id}`).emit("conversation_updated", {});
      socketIO.to(`user-${session.userid}`).emit("conversation_updated", {});
 
      sql = `SELECT * FROM connections WHERE user1_id = $1 OR user2_id = $1`;
      const connections = await pool.query(sql, [blocked_person_id]);
 
      if (connections.rows.length < 6 && connections.rows.length > 0) {
        sql = `UPDATE fame_rates SET connection_pts = connection_pts - 5, total_pts = total_pts - 5
							WHERE user_id = $1`;
        await pool.query(sql, [blocked_person_id]);
      }
 
      response.status(200).send("Blocked user!");
    } else {
      response.status(401).send(false);
    }
  });
 
  app.post("/api/browsing/reportuser/:id", async (request, response) => {
    const session = request.session;
 
    if (session.userid) {
      try {
        const reported_person_id = request.params.id;
 
        var sql = `SELECT * FROM reports
                  WHERE sender_id = $1
                  AND target_id = $2`;
        var reports = await pool.query(sql, [
          session.userid,
          reported_person_id,
        ]);
 
        if (reports.rows.length === 0) {
          var sql = `INSERT INTO reports (sender_id, target_id) VALUES ($1, $2)`;
          await pool.query(sql, [session.userid, reported_person_id]);
 
          var sql = `SELECT username FROM users WHERE id = $1`;
          var { rows } = await pool.query(sql, [reported_person_id]);
 
          const sendReportMail = (username, id, sender_id) => {
            var mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: process.env.EMAIL_ADDRESS,
              subject: `Fake user report: ${id}, ${username}`,
              html: `<h1>Hello!</h1>
								<p>User ID ${session.userid} on Matcha has reported a user as a fake account.</p>
								<p>The reported person's username is ${username} and ID is ${id}.</p>
								<p>Please investigate.</p>
								<p>- Matcha App</p>`,
            };
 
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.error(error);
              } else {
                // console.log('Email sent: ' + info.response)
              }
            });
          };
 
          sendReportMail(
            rows[0]["username"],
            reported_person_id,
            session.userid,
          );
 
          response.status(200).send("Reported user!");
        } else {
          response.send(
            "You have already reported this user. The Matcha team has been notified.",
          );
        }
      } catch (error) {
        console.log(error);
        response.status(500).send(false);
      }
    } else {
      response.status(401).send(false);
    }
  });
};
 