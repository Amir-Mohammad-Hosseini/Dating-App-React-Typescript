import customFetch from "../../../lib/axios/customFetch"

const patchReadMutation = async(notifId : number | string) => {
    const response = await customFetch.patch(`profile/readnotification/${notifId}`)
    return response.data
}

export default patchReadMutation