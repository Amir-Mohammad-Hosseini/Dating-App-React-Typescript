import { GoCheck, GoGear, GoTrash } from "react-icons/go";
import Spinner from "../Loader/Spinner";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import readAllNotificationsMutation from "../../lib/tanstack-query/Notifications/readAllNotificationsMutation";
import clearAllNotificationsMutation from "../../lib/tanstack-query/Notifications/clearAllNotificationsMutation";
import type { NotificationsPageHeaderType } from "./types";

const NotificationsPageHeader = ({
  isExistNotif,
}: NotificationsPageHeaderType) => {
  const {
    mutate: readAllNotificationsMutate,
    isPending: isReadAllNotificationMutatePending,
  } = useMutation(readAllNotificationsMutation());
  const {
    mutate: clearAllNotificationsMutate,
    isPending: isClearAllNotificationMutatePending,
  } = useMutation(clearAllNotificationsMutation());

  const handleMarkAllNotifsAsRead = () => {
    if (isExistNotif) {
      readAllNotificationsMutate();
    }
  };

  const handleClearAllNotifs = () => {
    if (isExistNotif) {
      clearAllNotificationsMutate();
    }
  };
  return (
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
        <button
          type="button"
          onClick={handleClearAllNotifs}
          disabled={isClearAllNotificationMutatePending}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-TertiaryColor/30 px-4 py-2 text-sm font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isClearAllNotificationMutatePending ? (
            <Spinner />
          ) : (
            <div className="flex items-center justify-center gap-x-2 text-TertiaryColor">
              <GoTrash aria-hidden="true" />
              Clear All
            </div>
          )}
        </button>
        <Link
          to="/settings"
          aria-label="Notification settings"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-SecondaryColor/30 text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
        >
          <GoGear className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

export default NotificationsPageHeader;
