import { useQuery } from "@tanstack/react-query";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import { useEffect } from "react";
import socket from "../../lib/socket/socket";
import queryClient from "../../lib/tanstack-query/queryClient";
import type ConversationItemType from "../../components/Messages/types";

const useUnreadMessagesCount = () => {
  const {
    data: conversationsList,
    isPending: isConversationsListQueryPending,
  } = useQuery(conversationsListQuery());

  useEffect(() => {
    const queryKey = conversationsListQuery().queryKey

    const refetchList = () => {
        queryClient.invalidateQueries({queryKey})
    }

    socket.on("conversation_updated" , refetchList)
    socket.on("connect" , refetchList)
    
    return () => {
        socket.off("conversation_updated" , refetchList)
        socket.off("connect" , refetchList)

    }
  } , [])

  const unreadMessagesCount = (conversationsList ?? []).reduce((prev : number , curr : ConversationItemType) => {
    return prev + curr.unread_count
  } , 0)


  return {unreadMessagesCount,isMessagesCountPending : isConversationsListQueryPending}
}

export default  useUnreadMessagesCount