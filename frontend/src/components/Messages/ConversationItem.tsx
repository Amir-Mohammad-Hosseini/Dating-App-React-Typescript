import { NavLink } from "react-router";
import type ConversationItemType from "./types";
import { formatMessageTime } from "../../utils/conversation";
import useTypingStore from "../../lib/zustand/typingStore/useTypingStore";

const ConversationItem = ({
  connection_id,
  firstname,
  picture_data,
  unread_count,
  last_message,
  last_message_time,
  is_online,
}: ConversationItemType) => {
  const isTyping = Boolean(
    useTypingStore((state) => state.typingRooms[+connection_id]),
  );

  return (
    <li key={connection_id}>
      <NavLink
        to={`/messages/${connection_id}`}
        className={({ isActive }) =>
          `flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition hover:bg-SecondaryDarkBgColor/40 ${
            isActive ? "bg-SecondaryDarkBgColor/60" : ""
          }`
        }
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative shrink-0">
            {picture_data ? (
              <img
                src={picture_data}
                alt={firstname}
                className="size-14 rounded-full object-cover object-top"
              />
            ) : (
              <span className="grid size-14 place-items-center rounded-full font-TitleFont text-xl text-PrimaryColor/90">
                {firstname[0]}
              </span>
            )}
            {is_online && (
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-SecondaryDarkBgColor bg-OnlineBgColor"
              />
            )}
          </span>
          <div className="min-w-0">
            <p className="font-PrimarySemiBoldFont">{firstname}</p>
            <p
              className={`truncate text-sm ${
                isTyping
                  ? "italic text-TertiaryColor"
                  : unread_count > 0
                    ? "text-PrimaryColor"
                    : "text-SecondaryColor"
              }`}
            >
              {isTyping ? "Typing…" : (last_message ?? "No messages yet")}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {last_message_time && (
            <span className="text-xs text-SecondaryColor">
              {formatMessageTime(last_message_time)}
            </span>
          )}
          {unread_count > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-TertiaryColor font-PrimarySemiBoldFont text-xs text-SecondaryDarkBgColor">
              {unread_count}
            </span>
          )}
        </div>
      </NavLink>
    </li>
  );
};

export default ConversationItem;
