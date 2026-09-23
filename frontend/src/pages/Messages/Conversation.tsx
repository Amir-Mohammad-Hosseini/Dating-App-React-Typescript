import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import { GoChevronLeft, GoLocation } from "react-icons/go";
import { IoSend, IoImageOutline, IoEllipsisVertical } from "react-icons/io5";
import { conversations, type MessageBubble } from "../../data/messages-data";

// daisyUI's dropdown opens/closes on focus (CSS :focus-within), not clicks —
// clicking a menu item keeps focus inside it, so the panel stays open.
// Blurring the active element after an action closes it again.
const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

const Conversation = () => {
  const { matchId } = useParams();
  const match = conversations.find((c) => c.id === matchId);

  // Seeded from mock data; only lives in this component's state for now
  const [messages, setMessages] = useState<MessageBubble[]>(
    match?.messages ?? [],
  );
  const [draft, setDraft] = useState("");

  if (!match) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-ItalicFont text-2xl">Conversation not found</p>
        <Link to="/messages" className="text-TertiaryColor">
          Back to messages
        </Link>
      </div>
    );
  }

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), from: "me", text, time: "now" },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full xl:flex-row">
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-SecondaryColor/20 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/messages"
              aria-label="Back to messages"
              className="grid size-9 shrink-0 place-items-center rounded-full text-SecondaryColor transition hover:text-PrimaryColor lg:hidden"
            >
              <GoChevronLeft className="size-5" aria-hidden="true" />
            </Link>

            {/* Avatar + name open the match's full profile */}
            <Link
              to={`/users/${match.id}`}
              className="-mx-2 flex min-w-0 items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-SecondaryDarkBgColor/60"
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full font-TitleFont text-lg text-PrimaryColor/90 ${match.avatarTone}`}
              >
                {match.name[0]}
              </span>

              <div className="min-w-0">
                <p className="font-PrimarySemiBoldFont">{match.name}</p>
                <p
                  className={`text-sm ${match.online ? "text-OnlineBgColor" : "text-SecondaryColor"}`}
                >
                  {match.online ? "Online" : "Offline"}
                </p>
              </div>
            </Link>
          </div>

          {/* Conversation options */}
          <div className="dropdown dropdown-end shrink-0">
            <div
              tabIndex={0}
              role="button"
              aria-label="Conversation options"
              className="grid size-9 cursor-pointer place-items-center rounded-full text-SecondaryColor transition hover:text-PrimaryColor"
            >
              <IoEllipsisVertical className="size-5" aria-hidden="true" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu z-20 mt-2 w-52 rounded-2xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor p-2 shadow-xl"
            >
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: wire up to real clear-chat logic
                    console.log("clear chat", match.id);
                    closeMenu();
                  }}
                  className="rounded-xl text-PrimaryColor"
                >
                  Clear chat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: open a confirmation modal before reporting
                    console.log("report", match.id);
                    closeMenu();
                  }}
                  className="rounded-xl text-TertiaryColor"
                >
                  Report {match.name}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: open a confirmation modal before blocking
                    console.log("block", match.id);
                    closeMenu();
                  }}
                  className="rounded-xl text-TertiaryColor"
                >
                  Block {match.name}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 sm:max-w-sm ${
                  message.from === "me"
                    ? "rounded-br-sm bg-TertiaryColor text-white"
                    : "rounded-bl-sm bg-InputBg text-PrimaryColor"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-right text-[11px] ${
                    message.from === "me"
                      ? "text-white/70"
                      : "text-SecondaryColor"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSend}
          className="flex shrink-0 items-center gap-2 border-t border-SecondaryColor/20 px-4 py-3 sm:px-6"
        >
          <button
            type="button"
            aria-label="Attach a photo"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/30 text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
          >
            <IoImageOutline className="size-4" aria-hidden="true" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message…"
            autoComplete="off"
            className="h-11 flex-1 rounded-full border border-SecondaryColor/20 bg-InputBg px-4 text-PrimaryColor outline-none transition placeholder:text-SecondaryColor focus:border-TertiaryColor"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send message"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-TertiaryColor text-white transition enabled:cursor-pointer enabled:hover:bg-HoverBtnBg disabled:opacity-50"
          >
            <IoSend className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Profile panel: xl and up only */}
      <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-SecondaryColor/20 p-6 xl:block">
        <Link to={`/users/${match.id}`} className="block">
          <div
            className={`aspect-3/4 grid place-items-center rounded-2xl transition hover:opacity-90 ${match.avatarTone}`}
          >
            <span className="font-TitleFont text-8xl text-white/20">
              {match.name[0]}
            </span>
          </div>
        </Link>

        <h2 className="mt-4 font-TitleFont text-2xl">
          {match.name} <span className="text-SecondaryColor">{match.age}</span>
        </h2>
        <p className="text-SecondaryColor">{match.role}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-SecondaryColor">
          <GoLocation aria-hidden="true" />
          {match.distance}
        </p>

        <p className="mt-4">{match.bio}</p>

        <p className="mt-5 text-xs text-SecondaryColor">Interests</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {match.interests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border border-TertiaryColor/50 bg-TertiaryColor/10 px-3 py-1 text-sm text-PrimaryColor"
            >
              {interest}
            </li>
          ))}
        </ul>

        <Link
          to={`/users/${match.id}`}
          className="mt-6 block rounded-xl border border-SecondaryColor/30 py-2.5 text-center font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor"
        >
          View full profile
        </Link>
      </aside>
    </div>
  );
};

export default Conversation;
