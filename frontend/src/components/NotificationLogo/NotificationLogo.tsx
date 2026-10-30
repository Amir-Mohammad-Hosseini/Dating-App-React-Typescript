import { useQuery } from "@tanstack/react-query";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router";
import notificationsQuery from "../../lib/tanstack-query/Notifications/notificationsQuery";
import LoadingOverlay from "../Loader/LoadingOverlay";
import type NotificationItemType from "../NoticationsPage/types";

const NotificationLogo = () => {
  const { data: notificationsData, isPending: isNotificationsQueryPending } =
    useQuery(notificationsQuery());

  if (isNotificationsQueryPending) {
    return <LoadingOverlay show />;
  }

  const unReadNotificationsCount =
    notificationsData.filter(
      (notif: NotificationItemType) => notif.read === "NO",
    )?.length || 0;

  return (
    <Link
      to="/notifications"
      aria-label={
        unReadNotificationsCount > 0
          ? `Notifications, ${unReadNotificationsCount} unread`
          : "Notifications"
      }
      className="relative grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
    >
      <IoIosNotifications className="size-4" aria-hidden="true" />

      {unReadNotificationsCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-TertiaryColor px-1 text-[10px] leading-none font-semibold text-white">
          {unReadNotificationsCount > 9 ? "9+" : unReadNotificationsCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationLogo;
