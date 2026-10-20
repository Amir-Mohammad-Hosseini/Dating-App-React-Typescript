import customFetch from "../../../lib/axios/customFetch"

const deleteClearAllNotifications = async () => {
    const response = await customFetch.delete("profile/notifications")
    return response.data
}

export default deleteClearAllNotifications