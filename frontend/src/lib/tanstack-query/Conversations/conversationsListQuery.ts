import getConversationsList from "../../../services/api/Conversations/getConversationsList"

const conversationsListQuery = () => {
    return {
        queryKey : ["conversations"],
        queryFn : getConversationsList
    }
}

export default conversationsListQuery