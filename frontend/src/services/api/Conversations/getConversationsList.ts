import customFetch from "../../../lib/axios/customFetch"
import ENDPOINTS from "../endpoints"

const getConversationsList = async () => {
    return (await customFetch(ENDPOINTS.CONVERSATIONS)).data
}

export default getConversationsList