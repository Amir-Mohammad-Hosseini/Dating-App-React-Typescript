import customFetch from "../../../lib/axios/customFetch"
import ENDPOINTS from "../endpoints"

const postBlockProfile = async (userId : number | string) => {
    const response = await customFetch.post(ENDPOINTS.BLOCK(userId))
    return response.data
}

export default postBlockProfile