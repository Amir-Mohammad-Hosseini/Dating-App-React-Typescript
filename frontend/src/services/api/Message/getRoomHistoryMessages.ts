import customFetch from "../../../lib/axios/customFetch"
import ENDPOINTS from "../endpoints"

const getRoomHistoryMessages =async (matchId : number | string) => {
    const response = await customFetch.post(ENDPOINTS.MESSAGE.HISTORY_MESSAGES , {
        room : matchId
    })
    return response.data
}

export default getRoomHistoryMessages