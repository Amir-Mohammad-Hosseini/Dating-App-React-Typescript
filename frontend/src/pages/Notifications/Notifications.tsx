import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import notificationsQuery from "../../lib/tanstack-query/Notifications/notificationsQuery";
import NotificationItem from "../../components/NoticationsPage/NotificationItem";
import type NotificationItemType from "../../components/NoticationsPage/types";

import NotificationsPageHeader from "../../components/NoticationsPage/NotificationsPageHeader";
import { PageLoader } from "../../components/Loader";

const Notifications = () => {
  const {
    data: notificationsData,
    isPending: isNotificationsQueryPending,
    isError: isNotificationsQueryError,
    error: notificationsQueryError,
  } = useQuery(notificationsQuery());

  if (isNotificationsQueryPending) {
    return <PageLoader />
  }
  if (isNotificationsQueryError) {
    throw new Error(notificationsQueryError.message);
  }

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-6 pt-6 pb-24 sm:px-8 md:px-10 md:py-8 md:pb-8 lg:px-12">
        <div className="mx-auto w-full max-w-2xl">
          <NotificationsPageHeader isExistNotif={notificationsData.length !== 0} />

          {/* Feed */}
          {notificationsData.length === 0 ? (
            <p className="mt-16 text-center text-SecondaryColor">
              Nothing here yet.
            </p>
          ) : (
            <ul className="mt-6 space-y-2">
              {notificationsData.map((notification: NotificationItemType) => (
                <NotificationItem key={notification.id} {...notification} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
