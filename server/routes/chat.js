const isOwnChatImage = (imageUrl, userId) =>
  new RegExp(
    `^/images/chat/${userId}-\\d+-[a-f0-9]{32}\\.(jpg|png|webp|gif)$`,
  ).test(imageUrl);

module.exports = (pool, socketIO) => {
  const sendNotification = async (
    notification_id,
    notification,
    sender_id,
    target_id,
    redirect_address,
  ) => {
    if (sender_id) {
      var sql = `SELECT picture_data
						FROM user_pictures WHERE user_id = $1 AND profile_pic = 'YES'`;
      const { rows } = await pool.query(sql, [sender_id]);
      let picture = rows[0] ? rows[0]["picture_data"] : null;
      var data = {
        id: notification_id,
        user_id: Number(target_id),
        sender_id: sender_id,
        text: notification,
        redirect_path: redirect_address,
        read: "NO",
        picture,
        time_stamp: new Date(),
      };
      socketIO.to(`notification-${target_id}`).emit("new_notification", data);
    }
  };

  const getMembership = async (connectionId, userId) => {
    const { rows } = await pool.query(
      `SELECT user1_id, user2_id FROM connections
             WHERE connection_id = $1 AND (user1_id = $2 OR user2_id = $2)`,
      [connectionId, userId],
    );
    return rows[0] || null;
  };

  const notifyConversationUpdated = (userId, room) => {
    socketIO.to(`user-${userId}`).emit("conversation_updated", { room });
  };

  // ─── Presence (Online / Offline) ──────────────────────────────

  const userSocketCount = (userId) =>
    socketIO.sockets.adapter.rooms.get(`user-${userId}`)?.size ?? 0;

  const isUserOnline = (userId) => userSocketCount(userId) > 0;

  const getMatchIds = async (userId) => {
    const { rows } = await pool.query(
      `SELECT CASE WHEN user1_id = $1 THEN user2_id ELSE user1_id END AS other_id
             FROM connections
             WHERE user1_id = $1 OR user2_id = $1`,
      [userId],
    );
    return rows.map((row) => row.other_id);
  };

  const broadcastPresence = async (userId, online) => {
    try {
      const matchIds = await getMatchIds(userId);
      if (matchIds.length === 0) return;

      socketIO.to(matchIds.map((id) => `user-${id}`)).emit("presence_changed", {
        userId,
        online,
        lastSeen: online ? null : new Date(),
      });
    } catch (error) {
      console.error("broadcastPresence error:", error);
    }
  };

  let users = [];

  socketIO.on("connection", (socket) => {
    const sessionUserId = Number(socket.request.session?.userid) || null;

    if (sessionUserId) {
      socket.join(`notification-${sessionUserId}`);
      socket.join(`user-${sessionUserId}`);

      if (userSocketCount(sessionUserId) === 1) {
        broadcastPresence(sessionUserId, true);
      }
    }

    socket.on("join_room", async (data) => {
      try {
        const room = Number(data?.room);
        if (!sessionUserId || !Number.isInteger(room)) return;
        const membership = await getMembership(room, sessionUserId);
        if (membership) socket.join(`room-${room}`);
      } catch (error) {
        console.error("join_room error:", error);
      }
    });

    socket.on("join_notification", (data) => {
      if (sessionUserId && Number(data?.id) === sessionUserId) {
        socket.join(`notification-${sessionUserId}`);
      }
    });

    socket.on("leave_room", (data) => {
      socket.leave(`room-${data?.room}`);
    });

    socket.on("mark_read", async (data) => {
      try {
        const room = Number(data?.room);
        if (!sessionUserId || !Number.isInteger(room)) return;

        const membership = await getMembership(room, sessionUserId);
        if (!membership) return;

        const result = await pool.query(
          `UPDATE chat SET is_read = TRUE
                     WHERE connection_id = $1 AND sender_id <> $2 AND is_read = FALSE`,
          [room, sessionUserId],
        );

        if (result.rowCount > 0) {
          notifyConversationUpdated(sessionUserId, room);
        }
      } catch (error) {
        console.error("mark_read error:", error);
      }
    });

    socket.on("typing", async (data) => {
      try {
        const room = Number(data?.room);
        if (!sessionUserId || !Number.isInteger(room)) return;

        const connection = await getMembership(room, sessionUserId);
        if (!connection) return;

        const receiverId =
          Number(connection.user1_id) === sessionUserId
            ? connection.user2_id
            : connection.user1_id;

        socketIO.to(`user-${receiverId}`).emit("user_typing", {
          room,
          isTyping: Boolean(data?.isTyping),
        });
      } catch (error) {
        console.error("typing error:", error);
      }
    });

    socket.on("send_message", async (data, ack) => {
      const reply = typeof ack === "function" ? ack : () => {};
      try {
        if (!sessionUserId) return reply({ ok: false, error: "unauthorized" });

        const room = Number(data?.room);
        const text = typeof data?.text === "string" ? data.text.trim() : "";
        const imageUrl =
          typeof data?.image_url === "string" ? data.image_url : null;

        if (
          !Number.isInteger(room) ||
          (!text && !imageUrl) ||
          text.length > 1000
        ) {
          return reply({ ok: false, error: "invalid" });
        }

        if (imageUrl && !isOwnChatImage(imageUrl, sessionUserId)) {
          return reply({ ok: false, error: "invalid_image" });
        }

        const connection = await getMembership(room, sessionUserId);
        if (!connection) return reply({ ok: false, error: "forbidden" });

        const receiverId =
          Number(connection.user1_id) === sessionUserId
            ? connection.user2_id
            : connection.user1_id;

        const inserted = await pool.query(
          `INSERT INTO chat (connection_id, sender_id, message, image_url)
                     VALUES ($1, $2, $3, $4)
                     RETURNING chat_id, time_stamp`,
          [room, sessionUserId, text || null, imageUrl],
        );

        const senderRes = await pool.query(
          `SELECT username FROM users WHERE id = $1`,
          [sessionUserId],
        );
        const senderName = senderRes.rows[0]?.username;

        const message = {
          key: inserted.rows[0].chat_id,
          text,
          image_url: imageUrl,
          sender_id: sessionUserId,
          name: senderName,
          room,
          time_stamp: inserted.rows[0].time_stamp,
        };

        socketIO.in(`room-${room}`).emit("receive_message", message);

        socketIO.to(`user-${receiverId}`).emit("user_typing", {
          room,
          isTyping: false,
        });

        notifyConversationUpdated(sessionUserId, room);
        notifyConversationUpdated(receiverId, room);

        reply({ ok: true });

        const notification = `You received a new message from ${senderName}`;
        const redirect = `/messages/${room}`;
        const notifRes = await pool.query(
          `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
                     VALUES ($1, $2, $3, $4)
                     RETURNING notification_id`,
          [receiverId, notification, redirect, sessionUserId],
        );
        sendNotification(
          notifRes.rows[0]["notification_id"],
          notification,
          sessionUserId,
          receiverId,
          redirect,
        );
      } catch (error) {
        console.error("send_message error:", error);
        reply({ ok: false, error: "server" });
      }
    });

    // Add a new user to the users array.
    socket.on("newUser", (data) => {
      const userNames = users.map((user) => user.name);
      if (userNames.includes(data.name) === false) {
        if (data.socketID) {
          users.push(data);
        }
      }
      socketIO.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      const disconnected_user = users.filter(
        (user) => user.socketID === socket.id,
      );
      if (disconnected_user.length > 0) {
        var sql = `UPDATE users SET last_connection = NOW()::timestamp WHERE id = $1`;
        pool.query(sql, [disconnected_user[0].id]);
      }
      users = users.filter((user) => user.socketID !== socket.id);
      socketIO.emit("newUserResponse", users);
      socket.disconnect();
    });

    socket.on("disconnect", () => {
      if (!sessionUserId) return;

      setTimeout(async () => {
        try {
          if (isUserOnline(sessionUserId)) return;

          await pool.query(
            `UPDATE users SET last_connection = NOW()::timestamp WHERE id = $1`,
            [sessionUserId],
          );
          broadcastPresence(sessionUserId, false);
        } catch (error) {
          console.error("offline handler error:", error);
        }
      }, 3000);
    });

    socket.on("logOut", (data) => {
      const logged_out_user = users.filter(
        (user) => user.socketID === data.socketID,
      );
      if (logged_out_user.length > 0) {
        var sql = `UPDATE users SET last_connection = NOW()::timestamp WHERE id = $1`;
        pool.query(sql, [logged_out_user[0].id]);
        socket.leave(`notification-${logged_out_user[0].id}`);
      }
      users = users.filter((user) => user.socketID !== data.socketID);
      socketIO.emit("newUserResponse", users);
    });
  });
};
