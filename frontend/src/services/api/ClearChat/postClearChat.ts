import customFetch from "../../../lib/axios/customFetch"
import ENDPOINTS from "../endpoints"

const postClearChat  = async (matchId : number | string) => {
    const response = await customFetch.post(ENDPOINTS.CLEAR_CHAT , {
        room : matchId
    })

    return response.data
}

export default postClearChat