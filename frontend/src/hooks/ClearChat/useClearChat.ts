import { useMutation } from "@tanstack/react-query";
import clearChatMutation from "../../lib/tanstack-query/ClearChat/clearChatMutation";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";

const useClearChat = () => {
  const { mutate: clearChatMutate, isPending: isClearChatMutationPending } =
    useMutation(clearChatMutation());

  const handleShowClearChatSwal = async (matchId?: number | string) => {
    const isClearChatConfirm = await confirmAction({
      title: "Are you sure?",
      text: "Do you want to clear this chat?",
      confirmButtonText: "Yes, confirm",
      icon: "warning",
      confirmButtonColor: "#1e40af",
    });

    if (isClearChatConfirm) {
      clearChatMutate(matchId!);
    }
  };

  return { handleShowClearChatSwal, isClearChatMutationPending };
};

export default useClearChat;
