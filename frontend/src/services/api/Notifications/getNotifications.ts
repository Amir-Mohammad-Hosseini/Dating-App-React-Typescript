import customFetch from "../../../lib/axios/customFetch"

const getNotifications = async () => {
    const response = await customFetch("profile/notifications")
    return response.data
}

export default getNotifications