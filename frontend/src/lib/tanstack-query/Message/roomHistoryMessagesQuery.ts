import getRoomHistoryMessages from "../../../services/api/Message/getRoomHistoryMessages"

const roomHistoryMessagesQuery = (matchId ?: string | number) => {
    return {
        queryKey : ["historyMessages" , matchId],
        queryFn : () => getRoomHistoryMessages(matchId!)
    }
}

export default roomHistoryMessagesQuery