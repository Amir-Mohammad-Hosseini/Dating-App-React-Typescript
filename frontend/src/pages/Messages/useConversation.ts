import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEventHandler,
} from "react";
import { useParams } from "react-router";
import socket from "../../lib/socket/socket";
import { useMutation, useQuery } from "@tanstack/react-query";
import roomHistoryMessagesQuery from "../../lib/tanstack-query/Message/roomHistoryMessagesQuery";
import queryClient from "../../lib/tanstack-query/queryClient";
import { toast } from "sonner";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import uploadChatImageMutation from "../../lib/tanstack-query/Message/uploadChatImageMutation";
import ALLOWED_IMAGE_TYPES, {
  MAX_IMAGE_SIZE,
} from "../../utils/constants/conversation";

const useConversation = () => {
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

  const handleWriteMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value);
  };

  const handleSendImageAsMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files![0];

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

  return {
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
  };
};

export default useConversation;
