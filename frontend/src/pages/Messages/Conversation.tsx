import type ConversationItemType from "../../components/Messages/types";
import HistoryMessage from "../../components/MessagesPage/HistoryMessage";
import type HistoryMessageType from "../../components/MessagesPage/types";

import ConversationOtherProfile from "../../components/ConversationPage/ConversationOtherProfile";
import ConversationOptions from "../../components/ConversationPage/ConversationOptions";
import { PageLoader } from "../../components/Loader";
import {
  EmptyHistoryMessages,
  SendMessageForm,
} from "../../components/MessagesPage";
import useConversation from "./useConversation";

const Conversation = () => {
  const {
    isQueryPending,
    isUploadImageMutationPending,
    conversationsList,
    matchId,
    historyMessages,
    handleLoadScrollToBottom,
    handleSendImageAsMessage,
    handleSendMessage,
    handleWriteMessage,
    lastMessageRef,
    draft,
  } = useConversation();

  if (isQueryPending) {
    return <PageLoader />;
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
          <EmptyHistoryMessages anotherFirstname={matchedUser.firstname} />
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

        <SendMessageForm
          draft={draft}
          onSubmitMessage={handleSendMessage}
          onWriteMessage={handleWriteMessage}
          onSendImage={handleSendImageAsMessage}
          isUploadImagePending={isUploadImageMutationPending}
        />
      </div>
    </div>
  );
};

export default Conversation;
