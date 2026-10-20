import customFetch from "../../../lib/axios/customFetch"

const patchRealAllNotifications = async () => {
    const response = await customFetch.patch("profile/readnotifications")
    return response.data
}

export default patchRealAllNotifications