import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEventHandler,
} from "react";
import { useParams } from "react-router";
import { GoCommentDiscussion } from "react-icons/go";
import { IoSend, IoImageOutline } from "react-icons/io5";
import socket from "../../lib/socket/socket";
import { useMutation, useQuery } from "@tanstack/react-query";
import roomHistoryMessagesQuery from "../../lib/tanstack-query/Message/roomHistoryMessagesQuery";
import queryClient from "../../lib/tanstack-query/queryClient";
import { toast } from "sonner";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import type ConversationItemType from "../../components/Messages/types";
import HistoryMessage from "../../components/MessagesPage/HistoryMessage";
import type HistoryMessageType from "../../components/MessagesPage/types";
import uploadChatImageMutation from "../../lib/tanstack-query/Message/uploadChatImageMutation";
import ALLOWED_IMAGE_TYPES, {
  MAX_IMAGE_SIZE,
} from "../../utils/constants/conversation";
import ConversationOtherProfile from "../../components/ConversationPage/ConversationOtherProfile";
import ConversationOptions from "../../components/ConversationPage/ConversationOptions";
import { PageLoader } from "../../components/Loader";

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

  const { mutate: uploadImageMutate, isPending: isUploadImageMutationPending } =
    useMutation(uploadChatImageMutation());

  useEffect(() => {
    if (!matchId) return;

    const markRead = () => {
      if (document.visibilityState !== "visible") return;
      socket.emit("mark_read", {
        room: matchId,
      });
    };

    const joinRoom = () => {
      socket.emit("join_room", {
        room: matchId,
      });
      markRead();
    };
    const onReceive = () => {
      queryClient.invalidateQueries({ queryKey: ["historyMessages", matchId] });
      markRead();
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

  const handleSendImageAsMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files![0];
    console.log(imageFile);

    if (!imageFile) {
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
      toast.error("Only JPG, PNG, WebP or GIF images are allowed.");
      return;
    }
    if (imageFile.size > MAX_IMAGE_SIZE) {
      toast.error("Image is too large (max 5 MB).");
      return;
    }

    uploadImageMutate(imageFile, {
      onSuccess: (image_url) => {
        socket.emit(
          "send_message",
          {
            room: matchId,
            image_url,
          },
          (response: { ok: boolean; error?: string }) => {
            if (!response.ok) {
              toast.error("Image was not sent. Try again.");
            }
          },
        );
      },
    });
  };

  const handleLoadScrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isQueryPending =
    isHistoryMessagesQueryPending || isConversationsListQueryPending;
  if (isQueryPending) {
    return <PageLoader />
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
          <ConversationOtherProfile
            userId={matchedUser.user_id}
            profilePic={matchedUser.picture_data}
            firstname={matchedUser.firstname}
            isOnline={matchedUser.is_online}
          />

          <ConversationOptions
            userId={matchedUser.user_id}
            matchId={matchId}
            firstname={matchedUser.firstname}
          />
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
              <HistoryMessage
                key={key}
                {...message}
                onImageLoad={handleLoadScrollToBottom}
              />
            ))}
            <div ref={lastMessageRef} />
          </div>
        )}

        {/* Send Message Form */}
        <form
          onSubmit={handleSendMessage}
          className="flex shrink-0 items-center gap-2 border-t border-SecondaryColor/20 px-4 py-3 sm:px-6"
        >
          <label
            htmlFor="image-file"
            className={`border border-SecondaryColor/30 rounded-full size-10 cursor-pointer flex items-center justify-center text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor ${
              isUploadImageMutationPending
                ? "pointer-events-none animate-pulse opacity-60"
                : ""
            }`}
          >
            <input
              id="image-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              aria-label="Attach a photo"
              onChange={handleSendImageAsMessage}
              disabled={isUploadImageMutationPending}
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
