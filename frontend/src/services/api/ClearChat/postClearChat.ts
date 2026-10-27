import customFetch from "../../../lib/axios/customFetch"

const postClearChat  = async (matchId : number | string) => {
    const response = await customFetch.post("chat/clear_chat" , {
        room : matchId
    })

    return response.data
}

export default postClearChat