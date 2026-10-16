import customFetch from "../../../lib/axios/customFetch"

const getProfileView = async(userId : number | string) => {
    const response = await customFetch(`browsing/profile/${userId}`)
    return response.data
}

export default getProfileView