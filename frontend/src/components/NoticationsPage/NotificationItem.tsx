import { useMutation } from "@tanstack/react-query";
import Logo from "../Logo/Logo";
import type NotificationItemType from "./types";
import { Link, useNavigate } from "react-router";
import readNotificationMutation from "../../lib/tanstack-query/Notifications/readNotificationMutation";
import Spinner from "../Loader/Spinner";

const NotificationItem = ({
  id,
  redirect_path,
  read,
  picture,
  text,
}: NotificationItemType) => {
  const navigate = useNavigate();
  const {
    mutate: readNotificationMutate,
    isPending: isReadNotificationMutatePending,
  } = useMutation(readNotificationMutation(navigate));
  const handleReadNotification = () => {
    readNotificationMutate(id);
  };

  if (isReadNotificationMutatePending) {
    return <Spinner />;
  }

  return (
    <li key={id} onClick={handleReadNotification}>
      <Link to={redirect_path || "/notifications"} className="block">
        <div
          className={`flex items-start gap-3 rounded-2xl px-4 py-3 transition hover:bg-SecondaryDarkBgColor/60 ${
            read === "NO" ? "bg-TertiaryColor/10" : ""
          }`}
        >
          {/* Unread indicator */}
          <span
            aria-hidden="true"
            className={`mt-2 size-1.5 shrink-0 rounded-full ${
              read === "NO" ? "bg-TertiaryColor" : "bg-transparent"
            }`}
          />

          {/* Sender's profile picture */}
          <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-InputBg">
            {picture ? (
              <img
                src={picture}
                alt=""
                className="size-full object-cover object-top"
              />
            ) : (
              <Logo isShowText={false} />
            )}
          </span>

          {/* Notification content */}
          <div className="min-w-0 flex-1">
            <p
              className={
                read === "YES"
                  ? "font-PrimaryMediumFont text-PrimaryColor"
                  : "font-PrimarySemiBoldFont text-PrimaryColor"
              }
            >
              {text}
            </p>

            <p className="mt-1 text-xs text-SecondaryColor">
              {read === "NO" ? "Unread" : "Read"}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NotificationItem;
