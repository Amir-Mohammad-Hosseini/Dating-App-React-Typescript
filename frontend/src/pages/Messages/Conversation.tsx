import { useEffect, useRef, useState, type SubmitEventHandler } from "react";
import { Link, useParams } from "react-router";
import { GoChevronLeft, GoCommentDiscussion } from "react-icons/go";
import { IoSend, IoImageOutline, IoEllipsisVertical } from "react-icons/io5";
import socket from "../../lib/socket/socket";
import { useQuery } from "@tanstack/react-query";
import roomHistoryMessagesQuery from "../../lib/tanstack-query/Message/roomHistoryMessagesQuery";
import queryClient from "../../lib/tanstack-query/queryClient";
import { toast } from "sonner";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import type ConversationItemType from "../../components/Messages/types";
import useBlockProfile from "../../hooks/BlockProfile/useBlockProfile";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import HistoryMessage from "../../components/MessagesPage/HistoryMessage";
import type HistoryMessageType from "../../components/MessagesPage/types";
import closeMenu from "../../utils/conversation";

const Conversation = () => {
  const { matchId } = useParams();
  const [draft, setDraft] = useState("");

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { data: historyMessages, isPending: isHistoryMessagesQueryPending } =
    useQuery(roomHistoryMessagesQuery(matchId));
  const {
    data: conversationsList,
    isPending: isConversationsListQueryPending,
  } = useQuery(conversationsListQuery());

  const { handleShowBlockSwal } = useBlockProfile();

  useEffect(() => {
    if (!matchId) return;

    const markRead = () => {
      if(document.visibilityState !== "visible")
        return
      socket.emit("mark_read" , {
        room : matchId
      })
    }

    const joinRoom = () => {
      socket.emit("join_room", {
        room: matchId,
      });
      markRead()
    };
    const onReceive = () => {
      queryClient.invalidateQueries({ queryKey: ["historyMessages", matchId] });
      markRead()
    };
    const onConnect = () => {
      joinRoom();
      queryClient.invalidateQueries({ queryKey: ["historyMessages", matchId] });
    };

    if (socket.connected) {
      joinRoom();
    }
    socket.on("receive_message", onReceive);
    socket.on("connect", onConnect);

    return () => {
      socket.emit("leave_room", {
        room: matchId,
      });
      socket.off("receive_message", onReceive);
      socket.off("connect", onConnect);
    };
  }, [matchId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyMessages?.length]);

  const handleSendMessage: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    socket.emit(
      "send_message",
      {
        room: matchId,
        text,
      },
      (response: { ok: boolean; error?: string }) => {
        if (!response.ok) {
          toast.error("Message was not sent. Try again.");
          setDraft(text);
        }
      },
    );
    setDraft("");
  };

  const handleBlockProfile = (profileId: number | string) => {
    handleShowBlockSwal(profileId);
    closeMenu();
  };

  const isQueryPending =
    isHistoryMessagesQueryPending || isConversationsListQueryPending;
  if (isQueryPending) {
    return <LoadingOverlay show />;
  }

  const matchedUser: ConversationItemType = conversationsList.find(
    (conversation: ConversationItemType) =>
      conversation.connection_id === Number(matchId),
  );

  return (
    <div className="flex h-full">
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

            <Link
              to={`/users/${matchedUser.user_id}`}
              className="-mx-2 flex min-w-0 items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-SecondaryDarkBgColor/60"
            >
              {matchedUser.picture_data ? (
                <img
                  src={matchedUser.picture_data}
                  alt={matchedUser.firstname}
                  className="size-11 rounded-full"
                />
              ) : (
                <span className="grid size-11 shrink-0 place-items-center rounded-full font-TitleFont text-lg text-PrimaryColor/90 bg-TertiaryColor">
                  {matchedUser.firstname[0]}
                </span>
              )}

              <div className="min-w-0">
                <p className="font-PrimarySemiBoldFont">
                  {matchedUser.firstname}
                </p>
                <p
                // className={`text-sm ${match.online ? "text-OnlineBgColor" : "text-SecondaryColor"}`}
                >
                  {/* {match.online ? "Online" : "Offline"} */}
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
                    closeMenu();
                  }}
                  className="rounded-xl text-PrimaryColor"
                >
                  Clear chat
                </button>
              </li>
              <li>
                {/* <button
                  type="button"
                  onClick={() => {
                    // TODO: open a confirmation modal before reporting
                    console.log("report", matchedUser.user_id);
                    closeMenu();
                  }}
                  className="rounded-xl text-TertiaryColor"
                >
                  Report {matchedUser.firstname}
                </button> */}
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleBlockProfile(matchedUser.user_id)}
                  className="rounded-xl text-TertiaryColor"
                >
                  Block {matchedUser.firstname}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Messages */}
        {historyMessages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-SecondaryDarkBgColor text-PrimaryColor">
              <GoCommentDiscussion className="size-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-ItalicFont text-2xl">No messages yet</p>
              <p className="mt-1 text-SecondaryColor">
                Say hello to {matchedUser.firstname} and start the conversation.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
            {historyMessages.map(({ key, ...message }: HistoryMessageType) => (
              <HistoryMessage key={key} {...message} />
            ))}
            <div ref={lastMessageRef} />
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={handleSendMessage}
          className="flex shrink-0 items-center gap-2 border-t border-SecondaryColor/20 px-4 py-3 sm:px-6"
        >
          <label
            htmlFor="image-file"
            className="border border-SecondaryColor/30 rounded-full size-10 cursor-pointer flex items-center justify-center text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
          >
            <input
              id="image-file"
              type="file"
              accept="image/*"
              aria-label="Attach a photo"
              className="sr-only"
            />
            <IoImageOutline className="size-4" aria-hidden="true" />
          </label>
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
    </div>
  );
};

export default Conversation;