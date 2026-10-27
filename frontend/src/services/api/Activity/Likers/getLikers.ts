import customFetch from "../../../../lib/axios/customFetch"

const getLikers = async () => {
    const response = await customFetch("profile/likers")
    return response.data
}

export default  getLikers