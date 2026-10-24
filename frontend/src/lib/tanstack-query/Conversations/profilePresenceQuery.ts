import getProfilePresence from "../../../services/api/Message/getProfilePresence";

const profilePresenceQuery = (userId?: number | string) => {
  return {
    queryKey: ["presence", userId],
    queryFn: () => getProfilePresence(userId!),
    refetchInterval: 30_000,
  };
};

export default profilePresenceQuery;
