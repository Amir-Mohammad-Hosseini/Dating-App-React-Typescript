import getRoomHistoryMessages from "../../../services/api/Message/getRoomHistoryMessages";
import queryKeys from "../queryKeys";

const roomHistoryMessagesQuery = (matchId?: string | number) => {
  return {
    queryKey: queryKeys.message.all(matchId),
    queryFn: () => getRoomHistoryMessages(matchId!),
  };
};

export default roomHistoryMessagesQuery;
