import { useQuery } from "@tanstack/react-query";
import notificationsQuery from "../../lib/tanstack-query/Notifications/notificationsQuery";

const useNotifications = () => {
  const {
    data: notificationsData,
    isPending: isNotificationsQueryPending,
    isError: isNotificationsQueryError,
    error: notificationsQueryError,
  } = useQuery(notificationsQuery());

  return {notificationsData , isNotificationsQueryPending , isNotificationsQueryError , notificationsQueryError}
}

export default useNotifications