import { IoEllipsisVertical } from "react-icons/io5";
import closeMenu from "../../utils/conversation";
import useBlockProfile from "../../hooks/BlockProfile/useBlockProfile";
import type { ConversationOptionsType } from "./types";
import queryClient from "../../lib/tanstack-query/queryClient";
import useReportProfile from "../../hooks/ReportProfile/useReportProfile";
import Spinner from "../Loader/Spinner";
import useClearChat from "../../hooks/ClearChat/useClearChat";

const ConversationOptions = ({
  userId,
  firstname,
  matchId,
}: ConversationOptionsType) => {
  const { handleShowBlockSwal, isBlockProfileMutatePending } =
    useBlockProfile();
  const { handleShowReportSwal, isReportProfileMutationPending } =
    useReportProfile();
  const { handleShowClearChatSwal, isClearChatMutationPending } =
    useClearChat();

  const handleClearChat = () => {
    handleShowClearChatSwal(matchId);
    closeMenu();
  };

  const handleBlockProfile = (profileId: number | string) => {
    handleShowBlockSwal(profileId);
    queryClient.invalidateQueries({
      queryKey: ["historyMessages", "conversations", matchId],
    });
    closeMenu();
  };

  const handleReportUser = () => {
    handleShowReportSwal(userId);
    closeMenu();
  };

  return (
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
            onClick={handleClearChat}
            disabled={isClearChatMutationPending}
            className="rounded-xl text-PrimaryColor"
          >
            {isClearChatMutationPending ? <Spinner /> : "Clear chat"}
          </button>
        </li>
        <li>
          <button
            type="button"
            disabled={isReportProfileMutationPending}
            onClick={handleReportUser}
            className="rounded-xl text-TertiaryColor"
          >
            {isReportProfileMutationPending ? (
              <Spinner />
            ) : (
              `Report ${firstname}`
            )}
          </button>
        </li>
        <li>
          <button
            type="button"
            disabled={isBlockProfileMutatePending}
            onClick={() => handleBlockProfile(userId)}
            className="rounded-xl text-TertiaryColor"
          >
            {isBlockProfileMutatePending ? <Spinner /> : `Block ${firstname}`}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ConversationOptions;
