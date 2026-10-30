import getConversationsList from "../../../services/api/Conversations/getConversationsList"
import queryKeys from "../queryKeys"

const conversationsListQuery = () => {
    return {
        queryKey : queryKeys.conversations.list,
        queryFn : getConversationsList
    }
}

export default conversationsListQuery