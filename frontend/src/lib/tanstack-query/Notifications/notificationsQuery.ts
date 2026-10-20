import getNotifications from "../../../services/api/Notifications/getNotifications"

const notificationsQuery = () => {
    return {
        queryKey : ["notifications"],
        queryFn : getNotifications
    }
}

export default notificationsQuery