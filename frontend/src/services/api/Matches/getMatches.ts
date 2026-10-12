import customFetch from "../../../lib/axios/customFetch"

const getMatches = async () => {
    const response = await customFetch("chat/chat_connections")
    return response.data
}

export default getMatches