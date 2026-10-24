import { IoFilter } from "react-icons/io5";
import NotificationLogo from "../NotificationLogo/NotificationLogo";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../Loader/LoadingOverlay";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import ConversationItem from "./ConversationItem";
import type ConversationItemType from "./types";
import { useEffect } from "react";
import socket from "../../lib/socket/socket";
import queryClient from "../../lib/tanstack-query/queryClient";
import type { PresenceDataType, TypingDataType } from "./types";
import useTypingStore from "../../lib/zustand/typingStore/useTypingStore";

const ConversationList = () => {
  const {
    data: conversationsList,
    isPending: isConversationsListQueryPending,
  } = useQuery(conversationsListQuery());

  useEffect(() => {
    const queryKey = conversationsListQuery().queryKey;

     const typingTimers = new Map<number, ReturnType<typeof setTimeout>>();

    const onConversationUpdate = () => {
      queryClient.invalidateQueries({ queryKey });
    };
    
    const onPresenceChanged = ({ userId, online, lastSeen }: PresenceDataType) => {
      queryClient.setQueryData<ConversationItemType[]>(
        queryKey,
        (prevConversations) =>
          prevConversations?.map((conversation) => {
            if (Number(conversation.user_id) !== Number(userId)) {
              return conversation;
            }
            return {
              ...conversation,
              is_online: online,
              last_connection: lastSeen ?? conversation.last_connection,
            };
          }),
      );
    };
    const onUserTyping = ({ room, isTyping }: TypingDataType) => {
      const { setTyping } = useTypingStore.getState();

      clearTimeout(typingTimers.get(room));
      setTyping(room, isTyping);

      if (isTyping) {
        typingTimers.set(
          room,
          setTimeout(() => setTyping(room, false), 4000),
        );
      }
    };
    
    const onConnect = () => {
      queryClient.invalidateQueries({ queryKey });
    }

    socket.on("conversation_updated", onConversationUpdate);
    socket.on("presence_changed", onPresenceChanged);
    socket.on("user_typing", onUserTyping);
    socket.on("connect", onConnect);

    return () => {
      socket.off("conversation_updated", onConversationUpdate);
      socket.off("presence_changed", onPresenceChanged);
      socket.off("user_typing", onUserTyping);
      socket.off("connect", onConnect);
        typingTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  if (isConversationsListQueryPending) {
    return <LoadingOverlay show />;
  }

  console.log(conversationsList);

  return (
    <div className="flex h-full flex-col overflow-x-hidden">
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <h1 className="font-ItalicFont text-3xl">Messages</h1>
        <div className="flex items-center justify-center gap-x-2">
          <NotificationLogo />
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

      {/* Conversation list */}
      <ul className="mt-2 flex-1 overflow-y-auto px-3 pb-4">
        {conversationsList.map((conversation: ConversationItemType) => (
          <ConversationItem
            key={conversation.connection_id}
            {...conversation}
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
