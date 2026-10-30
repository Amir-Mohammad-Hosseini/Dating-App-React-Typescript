import getProfilePresence from "../../../services/api/Message/getProfilePresence";
import queryKeys from "../queryKeys";

const profilePresenceQuery = (userId?: number | string) => {
  return {
    queryKey: queryKeys.conversations.presence.user(userId),
    queryFn: () => getProfilePresence(userId!),
    refetchInterval: 30_000,
  };
};

export default profilePresenceQuery;
