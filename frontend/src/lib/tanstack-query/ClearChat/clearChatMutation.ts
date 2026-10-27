import { toast } from "sonner";
import postClearChat from "../../../services/api/ClearChat/postClearChat";
import queryClient from "../queryClient";
import roomHistoryMessagesQuery from "../Message/roomHistoryMessagesQuery";
import conversationsListQuery from "../Conversations/conversationsListQuery";

const clearChatMutation = () => {
  return {
    mutationFn: postClearChat,
    onSuccess: (_data: unknown, matchId: number | string) => {
      queryClient.invalidateQueries({
        queryKey: roomHistoryMessagesQuery(matchId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: conversationsListQuery().queryKey,
      });
      toast.success("Chat cleared.");
    },
    onError: () => {
      toast.error("Could not clear the chat. Try again.");
    },
  };
};

export default clearChatMutation;