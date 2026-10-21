import { IoFilter } from "react-icons/io5";
import NotificationLogo from "../NotificationLogo/NotificationLogo";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../Loader/LoadingOverlay";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import ConversationItem from "./ConversationItem";
import type ConversationItemType from "./types";

const ConversationList = () => {
  const {data : conversationsList , isPending : isConversationsListQueryPending} = useQuery(conversationsListQuery())

  if(isConversationsListQueryPending){
    return <LoadingOverlay show />
  }

  console.log(conversationsList)

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
        {conversationsList.map((conversation : ConversationItemType) => <ConversationItem key={conversation.connection_id} {...conversation} />)}
      </ul>
    </div>
  );
};

export default ConversationList;
