import { useState } from "react";
import { Link } from "react-router";
import { GoCheck, GoEye, GoGear, GoLock } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import Logo from "../../components/Logo/Logo";
import { conversations } from "../../data/messages-data";
import { notifications as INITIAL, type AppNotification } from "./../../data/notifications-data";

type FilterKey = "all" | "match" | "message" | "likes";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "match", label: "Matches" },
  { key: "message", label: "Messages" },
  { key: "likes", label: "Likes" },
];

const GROUPS: AppNotification["group"][] = ["Today", "Yesterday", "This week"];

const matchesFilter = (n: AppNotification, filter: FilterKey) => {
  if (filter === "all") return true;
  if (filter === "likes") return n.type === "like" || n.type === "view";
  return n.type === filter;
};

const unreadCount = (list: AppNotification[], filter: FilterKey) =>
  list.filter((n) => !n.read && matchesFilter(n, filter)).length;

// Small circular badge that overlaps the bottom-left of each row's icon,
// signalling what kind of notification this is.
const TypeBadge = ({ type }: { type: AppNotification["type"] }) => {
  const common =
    "absolute -bottom-1 -left-1 grid size-5 place-items-center rounded-full border-2 border-PrimaryDarkBgColor";

  if (type === "match")
    return (
      <span className={`${common} bg-TertiaryColor text-white`}>
        <FaHeart className="size-2.5" aria-hidden="true" />
      </span>
    );
  if (type === "message")
    return (
      <span className={`${common} bg-SecondaryColor/40 text-PrimaryColor`}>
        <IoChatbubbleOutline className="size-2.5" aria-hidden="true" />
      </span>
    );
  if (type === "like")
    return (
      <span className={`${common} bg-TertiaryColor text-white`}>
        <FaHeart className="size-2.5" aria-hidden="true" />
      </span>
    );
  if (type === "view")
    return (
      <span className={`${common} bg-SecondaryColor/40 text-PrimaryColor`}>
        <GoEye className="size-2.5" aria-hidden="true" />
      </span>
    );
  return null;
};

const NotificationRow = ({
  notification,
  onRead,
}: {
  notification: AppNotification;
  onRead: (id: string) => void;
}) => {
  const person = notification.personId
    ? conversations.find((c) => c.id === notification.personId)
    : undefined;

  const isLocked = notification.type === "like" || notification.type === "view";

  // Where each kind of notification leads. "Likes you" is a locked
  // teaser that lives on the Matches page; a new match / new message
  // opens that chat; the photo tip goes to the profile editor.
  const to =
    notification.type === "match" || notification.type === "message"
      ? `/messages/${notification.personId}`
      : isLocked
        ? "/matches"
        : "/myProfile";

  const content = (
    <div
      className={`flex items-start gap-3 rounded-2xl px-4 py-3 transition hover:bg-SecondaryDarkBgColor/60 ${
        !notification.read ? "bg-TertiaryColor/10" : ""
      }`}
    >
      {/* Unread dot */}
      <span
        aria-hidden="true"
        className={`mt-2 size-1.5 shrink-0 rounded-full ${
          notification.read ? "bg-transparent" : "bg-TertiaryColor"
        }`}
      />

      {/* Icon / avatar */}
      <span className="relative shrink-0">
        {person ? (
          <span
            className={`grid size-11 place-items-center rounded-full font-TitleFont text-lg text-PrimaryColor/90 ${person.avatarTone}`}
          >
            {person.name[0]}
          </span>
        ) : isLocked ? (
          <span className="grid size-11 place-items-center rounded-full bg-InputBg text-SecondaryColor">
            <GoLock className="size-4" aria-hidden="true" />
          </span>
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-InputBg">
            <Logo isShowText={false} />
          </span>
        )}
        <TypeBadge type={notification.type} />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={
            notification.read
              ? "font-PrimaryMediumFont text-PrimaryColor"
              : "font-PrimarySemiBoldFont text-PrimaryColor"
          }
        >
          {notification.title}
        </p>
        <p className="truncate text-sm text-SecondaryColor">{notification.body}</p>
      </div>

      <span className="shrink-0 text-xs text-SecondaryColor">{notification.time}</span>
    </div>
  );

  return (
    <li>
      <Link to={to} onClick={() => onRead(notification.id)} className="block">
        {content}
      </Link>
    </li>
  );
};

const Notifications = () => {
  const [items, setItems] = useState<AppNotification[]>(INITIAL);
  const [filter, setFilter] = useState<FilterKey>("all");

  const markOneAsRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const visible = items.filter((n) => matchesFilter(n, filter));

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
                onClick={markAllAsRead}
                disabled={unreadCount(items, "all") === 0}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-SecondaryColor/30 px-4 py-2 text-sm font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor disabled:cursor-not-allowed disabled:opacity-40"
              >
                <GoCheck aria-hidden="true" />
                Mark all as read
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

          {/* Filter pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {FILTERS.map(({ key, label }) => {
              const count = unreadCount(items, key);
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-PrimarySemiBoldFont transition ${
                    active
                      ? "bg-TertiaryColor text-white"
                      : "bg-InputBg text-SecondaryColor hover:text-PrimaryColor"
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span
                      className={`grid size-4 place-items-center rounded-full text-[10px] ${
                        active ? "bg-white/25" : "bg-TertiaryColor text-white"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feed */}
          {visible.length === 0 ? (
            <p className="mt-16 text-center text-SecondaryColor">
              Nothing here yet.
            </p>
          ) : (
            GROUPS.map((group) => {
              const groupItems = visible.filter((n) => n.group === group);
              if (groupItems.length === 0) return null;

              return (
                <section key={group} className="mt-6">
                  <p className="mb-2 px-4 text-xs tracking-wide text-SecondaryColor uppercase">
                    {group}
                  </p>
                  <ul className="space-y-1">
                    {groupItems.map((notification) => (
                      <NotificationRow
                        key={notification.id}
                        notification={notification}
                        onRead={markOneAsRead}
                      />
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
