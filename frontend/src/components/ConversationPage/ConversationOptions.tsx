import { IoEllipsisVertical } from "react-icons/io5";
import closeMenu from "../../utils/conversation";
import useBlockProfile from "../../hooks/BlockProfile/useBlockProfile";
import type { ConversationOptionsType } from "./types";
import queryClient from "../../lib/tanstack-query/queryClient";

const ConversationOptions = ({
  userId,
  firstname,
  matchId
}: ConversationOptionsType) => {
  const { handleShowBlockSwal } = useBlockProfile();

  const handleClearChat = () => {
    closeMenu();
  };

  const handleBlockProfile = (profileId: number | string) => {
    handleShowBlockSwal(profileId);
    queryClient.invalidateQueries({
      queryKey: ["historyMessages" , "conversations" , matchId],
    });
    closeMenu();
  };

  const handleReportUser = () => {
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
            className="rounded-xl text-PrimaryColor"
          >
            Clear chat
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={handleReportUser}
            className="rounded-xl text-TertiaryColor"
          >
            Report {firstname}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleBlockProfile(userId)}
            className="rounded-xl text-TertiaryColor"
          >
            Block {firstname}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ConversationOptions;
