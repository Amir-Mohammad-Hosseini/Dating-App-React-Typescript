import { useQuery } from "@tanstack/react-query";
import profilePresenceQuery from "../../lib/tanstack-query/Conversations/profilePresenceQuery";
import { useEffect } from "react";
import socket from "../../lib/socket/socket";
import queryClient from "../../lib/tanstack-query/queryClient";
import type { PresenceDataType } from "../../components/Messages/types";
import type ConversationItemType from "../../components/Messages/types";

const usePresenceProfile = (userId: number | string) => {
  const { data: presenceProfile, isPending: isPresenceProfileQueryPending } =
    useQuery(profilePresenceQuery(userId));

  useEffect(() => {
    if (!userId) return;

    const queryKey = profilePresenceQuery(userId).queryKey;
    const onPresenceChanged = ({
      userId,
      online,
      lastSeen,
    }: PresenceDataType) => {
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

    socket.on("presence_changed", onPresenceChanged);

    return () => {
      socket.off("presence_changed", onPresenceChanged);
    };
  }, []);

  return { presenceProfile, isPresenceProfileQueryPending };
};

export default usePresenceProfile;
