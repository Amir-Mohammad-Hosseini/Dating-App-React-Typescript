import { Link } from "react-router";
import { GoCheck, GoGear } from "react-icons/go";
import Navbar from "../../components/Navbar/Navbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import notificationsQuery from "../../lib/tanstack-query/Notifications/notificationsQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import NotificationItem from "../../components/NoticationsPage/NotificationItem";
import type NotificationItemType from "../../components/NoticationsPage/types";
import readAllNotificationsMutation from "../../lib/tanstack-query/Notifications/readAllNotificationsMutation";
import Spinner from "../../components/Loader/Spinner";

const Notifications = () => {
  const {
    data: notificationsData,
    isPending: isNotificationsQueryPending,
    isError: isNotificationsQueryError,
    error: notificationsQueryError,
  } = useQuery(notificationsQuery());

  const {
    mutate: readAllNotificationsMutate,
    isPending: isReadAllNotificationMutatePending,
  } = useMutation(readAllNotificationsMutation());

  if (isNotificationsQueryPending) {
    return <LoadingOverlay show />;
  }
  if (isNotificationsQueryError) {
    throw new Error(notificationsQueryError.message);
  }

  const handleMarkAllNotifsAsRead = () => {
    readAllNotificationsMutate();
  };

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-x-hidden px-6 pt-6 pb-24 sm:px-8 md:px-10 md:py-8 md:pb-8 lg:px-12">
        <div className="mx-auto w-full max-w-2xl">
          <header className="flex items-start justify-between gap-4">
            <h1 className="font-ItalicFont text-3xl">Notifications</h1>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleMarkAllNotifsAsRead}
                disabled={isReadAllNotificationMutatePending}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-SecondaryColor/30 px-4 py-2 text-sm font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isReadAllNotificationMutatePending ? (
                  <Spinner />
                ) : (
                  <>
                    <GoCheck aria-hidden="true" />
                    Mark all as read
                  </>
                )}
              </button>
              {/* TODO: /settings isn't built yet */}
              <Link
                to="/settings"
                aria-label="Notification settings"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-SecondaryColor/30 text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
              >
                <GoGear className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </header>

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
