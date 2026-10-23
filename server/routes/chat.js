module.exports = (pool, socketIO) => {
    const sendNotification = async (notification_id, notification, sender_id, target_id, redirect_address) => {
        if (sender_id) {
            var sql = `SELECT picture_data
						FROM user_pictures WHERE user_id = $1 AND profile_pic = 'YES'`
            const { rows } = await pool.query(sql, [sender_id])
            let picture = rows[0] ? rows[0]['picture_data'] : null
            var data = {
                id: notification_id,
                user_id: Number(target_id),
                sender_id: sender_id,
                text: notification,
                redirect_path: redirect_address,
                read: 'NO',
                picture,
                time_stamp: new Date()
            }
            socketIO.to(`notification-${target_id}`).emit('new_notification', data)
        }
    }

    // آیا این کاربر عضو این connection (چت) هست؟ اگر بله، ردیف connection را برمی‌گرداند
    const getMembership = async (connectionId, userId) => {
        const { rows } = await pool.query(
            `SELECT user1_id, user2_id FROM connections
             WHERE connection_id = $1 AND (user1_id = $2 OR user2_id = $2)`,
            [connectionId, userId]
        )
        return rows[0] || null
    }

    // به همه‌ی socketهای یک کاربر (همه‌ی تب‌هایش) خبر می‌دهد: لیست چت‌هایت قدیمی شد
    const notifyConversationUpdated = (userId, room) => {
        socketIO.to(`user-${userId}`).emit('conversation_updated', { room })
    }

    let users = []

    socketIO.on('connection', (socket) => {
        // userid از session (کوکی) می‌آید، نه از کلاینت
        const sessionUserId = Number(socket.request.session?.userid) || null

        if (sessionUserId) {
            // room اعلان‌ها
            socket.join(`notification-${sessionUserId}`)
            // room شخصی کاربر؛ برای آپدیت لیست چت‌ها (بعداً برای online هم به کارمان می‌آید)
            socket.join(`user-${sessionUserId}`)
        }

        socket.on('join_room', async (data) => {
            try {
                const room = Number(data?.room)
                if (!sessionUserId || !Number.isInteger(room)) return
                // فقط اعضای همین چت اجازه‌ی ورود به room را دارند
                const membership = await getMembership(room, sessionUserId)
                if (membership) socket.join(`room-${room}`)
            } catch (error) {
                console.error('join_room error:', error)
            }
        })

        socket.on('join_notification', (data) => {
            // فقط room اعلان‌های خودِ کاربر
            if (sessionUserId && Number(data?.id) === sessionUserId) {
                socket.join(`notification-${sessionUserId}`)
            }
        })

        socket.on('leave_room', (data) => {
            socket.leave(`room-${data?.room}`)
        })

        // پیام‌های نخوانده‌ی طرف مقابل در این چت را «خوانده» می‌کند
        socket.on('mark_read', async (data) => {
            try {
                const room = Number(data?.room)
                if (!sessionUserId || !Number.isInteger(room)) return

                const membership = await getMembership(room, sessionUserId)
                if (!membership) return

                // sender_id <> من: فقط پیام‌های طرف مقابل
                const result = await pool.query(
                    `UPDATE chat SET is_read = TRUE
                     WHERE connection_id = $1 AND sender_id <> $2 AND is_read = FALSE`,
                    [room, sessionUserId]
                )

                // فقط اگر واقعاً چیزی عوض شد
                if (result.rowCount > 0) {
                    notifyConversationUpdated(sessionUserId, room)
                }
            } catch (error) {
                console.error('mark_read error:', error)
            }
        })

        // data = { room, text }   |   ack = تابعی که کلاینت می‌دهد
        socket.on('send_message', async (data, ack) => {
            const reply = typeof ack === 'function' ? ack : () => { }
            try {
                if (!sessionUserId) return reply({ ok: false, error: 'unauthorized' })

                const room = Number(data?.room)
                const text = typeof data?.text === 'string' ? data.text.trim() : ''
                if (!Number.isInteger(room) || !text || text.length > 1000) {
                    return reply({ ok: false, error: 'invalid' })
                }

                const connection = await getMembership(room, sessionUserId)
                if (!connection) return reply({ ok: false, error: 'forbidden' })

                const receiverId =
                    Number(connection.user1_id) === sessionUserId
                        ? connection.user2_id
                        : connection.user1_id

                // ذخیره در دیتابیس (is_read به صورت پیش‌فرض FALSE است)
                const inserted = await pool.query(
                    `INSERT INTO chat (connection_id, sender_id, message)
                     VALUES ($1, $2, $3)
                     RETURNING chat_id, time_stamp`,
                    [room, sessionUserId, text]
                )

                const senderRes = await pool.query(
                    `SELECT username FROM users WHERE id = $1`,
                    [sessionUserId]
                )
                const senderName = senderRes.rows[0]?.username

                // همان شکلی که API room_messages برمی‌گرداند
                const message = {
                    key: inserted.rows[0].chat_id,
                    text,
                    sender_id: sessionUserId,
                    name: senderName,
                    room,
                    time_stamp: inserted.rows[0].time_stamp,
                }

                // برای همه‌ی اعضای room (فرستنده و گیرنده)
                socketIO.in(`room-${room}`).emit('receive_message', message)

                // به هر دو نفر: لیست چت‌هایتان (آخرین پیام / نخوانده) عوض شد
                notifyConversationUpdated(sessionUserId, room)
                notifyConversationUpdated(receiverId, room)

                reply({ ok: true })

                // اعلان برای گیرنده
                const notification = `You received a new message from ${senderName}`
                const redirect = `/messages/${room}`
                const notifRes = await pool.query(
                    `INSERT INTO notifications (user_id, notification_text, redirect_path, sender_id)
                     VALUES ($1, $2, $3, $4)
                     RETURNING notification_id`,
                    [receiverId, notification, redirect, sessionUserId]
                )
                sendNotification(
                    notifRes.rows[0]['notification_id'],
                    notification,
                    sessionUserId,
                    receiverId,
                    redirect
                )
            } catch (error) {
                console.error('send_message error:', error)
                reply({ ok: false, error: 'server' })
            }
        })

        // Add a new user to the users array.
        socket.on('newUser', (data) => {
            const userNames = users.map(user => user.name)
            if (userNames.includes(data.name) === false) {
                if (data.socketID) {
                    users.push(data)
                }
            }
            socketIO.emit('newUserResponse', users)
        })

        socket.on('disconnect', () => {
            const disconnected_user = users.filter(user => user.socketID === socket.id)
            if (disconnected_user.length > 0) {
                var sql = `UPDATE users SET last_connection = NOW()::timestamp WHERE id = $1`
                pool.query(sql, [disconnected_user[0].id])
            }
            users = users.filter(user => user.socketID !== socket.id)
            socketIO.emit('newUserResponse', users)
            socket.disconnect()
        })

        socket.on('logOut', (data) => {
            const logged_out_user = users.filter(user => user.socketID === data.socketID)
            if (logged_out_user.length > 0) {
                var sql = `UPDATE users SET last_connection = NOW()::timestamp WHERE id = $1`
                pool.query(sql, [logged_out_user[0].id])
                socket.leave(`notification-${logged_out_user[0].id}`)
            }
            users = users.filter(user => user.socketID !== data.socketID)
            socketIO.emit('newUserResponse', users)
        })
    })
}