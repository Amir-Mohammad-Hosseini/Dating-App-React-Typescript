import customFetch from "../../../lib/axios/customFetch"

const getConversationsList = async () => {
    const response = await customFetch("chat/chat_connections")
    return response.data
}

export default getConversationsList