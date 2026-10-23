import customFetch from "../../../lib/axios/customFetch"

const getRoomHistoryMessages =async (matchId : number | string) => {
    const response = await customFetch.post("chat/room_messages" , {
        room : matchId
    })
    return response.data
}

export default getRoomHistoryMessages