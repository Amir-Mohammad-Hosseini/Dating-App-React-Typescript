import { NavLink } from "react-router";
import { IoFilter } from "react-icons/io5";
import SearchInput from "../Input/SearchInput";
import { conversations } from "../../data/messages-data";
import { IoIosNotifications } from "react-icons/io";

const ConversationList = () => {
  const newMatches = conversations.filter((c) => c.isNewMatch);

  return (
    <div className="flex h-full flex-col overflow-x-hidden">
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <h1 className="font-ItalicFont text-3xl">Messages</h1>
        <div className="flex items-center justify-center gap-x-2">
        <button
          type="button"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
        >
          <IoIosNotifications className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          popoverTarget="filter-modal"
          aria-label="Filter conversations"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
        >
          <IoFilter className="size-4" aria-hidden="true" />
        </button>
        </div>
      </div>

      <div className="mt-4 px-6">
        <SearchInput />
      </div>

      {/* New matches row */}
      <div className="mt-5 shrink-0">
        <p className="px-6 text-xs text-SecondaryColor">New matches</p>
        <ul className="carousel carousel-center mt-3 gap-4 px-6 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {newMatches.map((match) => (
            <li key={match.id} className="carousel-item">
              <NavLink to={`/messages/${match.id}`} className="flex flex-col items-center gap-1.5">
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid size-15 place-items-center rounded-full border-2 font-TitleFont text-2xl text-PrimaryColor/90 transition ${match.avatarTone} ${
                        isActive ? "border-TertiaryColor" : "border-SecondaryColor/40"
                      }`}
                    >
                      {match.name[0]}
                    </span>
                    <span className="text-sm text-SecondaryColor">{match.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Conversation list */}
      <ul className="mt-2 flex-1 overflow-y-auto px-3 pb-4">
        {conversations.map((conv) => (
          <li key={conv.id}>
            <NavLink
              to={`/messages/${conv.id}`}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition hover:bg-SecondaryDarkBgColor/40 ${
                  isActive ? "bg-SecondaryDarkBgColor/60" : ""
                }`
              }
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative shrink-0">
                  <span
                    className={`grid size-14 place-items-center rounded-full font-TitleFont text-xl text-PrimaryColor/90 ${conv.avatarTone}`}
                  >
                    {conv.name[0]}
                  </span>
                  {conv.online && (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-SecondaryDarkBgColor bg-OnlineBgColor"
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-PrimarySemiBoldFont">{conv.name}</p>
                  <p
                    className={`truncate text-sm ${
                      conv.isTyping
                        ? "italic text-TertiaryColor"
                        : conv.unreadCount > 0
                          ? "text-PrimaryColor"
                          : "text-SecondaryColor"
                    }`}
                  >
                    {conv.isTyping ? "Typing…" : conv.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="text-xs text-SecondaryColor">{conv.lastMessageTime}</span>
                {conv.unreadCount > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-TertiaryColor font-PrimarySemiBoldFont text-xs text-SecondaryDarkBgColor">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
