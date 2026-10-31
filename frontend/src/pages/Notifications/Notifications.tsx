import Navbar from "../../components/Navbar/Navbar";
import NotificationItem from "../../components/NoticationsPage/NotificationItem";
import type NotificationItemType from "../../components/NoticationsPage/types";

import NotificationsPageHeader from "../../components/NoticationsPage/NotificationsPageHeader";
import { PageLoader } from "../../components/Loader";
import useNotifications from "./useNotifications";

const Notifications = () => {
  const {notificationsData , isNotificationsQueryPending , isNotificationsQueryError , notificationsQueryError} = useNotifications()

  if (isNotificationsQueryPending) {
    return <PageLoader />
  }
  if (isNotificationsQueryError) {
    throw new Error(notificationsQueryError?.message || "An error occurred");
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
