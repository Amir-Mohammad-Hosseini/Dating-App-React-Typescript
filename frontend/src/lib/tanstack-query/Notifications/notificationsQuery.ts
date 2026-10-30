import getNotifications from "../../../services/api/Notifications/getNotifications"
import queryKeys from "../queryKeys"

const notificationsQuery = () => {
    return {
        queryKey : queryKeys.notifications.all,
        queryFn : getNotifications
    }
}

export default notificationsQuery