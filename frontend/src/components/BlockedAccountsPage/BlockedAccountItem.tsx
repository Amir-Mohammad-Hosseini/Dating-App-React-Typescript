import { useMutation } from "@tanstack/react-query";
import unblockAccountMutation from "../../lib/tanstack-query/MyProfile/AccountActions/unblockAccountMutation";
import type BlockedAccountItemType from "./types";

const BlockedAccountItem = ({
  id,
  firstname,
  lastname,
  username,
  picture,
}: BlockedAccountItemType) => {
  const {
    mutate: unblockAccountMutate,
    isPending: isUnblockedAccountMutationPending,
  } = useMutation(unblockAccountMutation());
  const handleUnblockAccount = (accountId: number | string) => {
    unblockAccountMutate(accountId);
  };
  return (
    <li className="flex items-center gap-3 p-4 sm:gap-4">
      <img
        src={picture}
        alt={`${firstname} ${lastname}`}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10 sm:h-14 sm:w-14 object-top"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white">
          {firstname} {lastname}
        </p>
        <p className="truncate text-sm text-PrimaryColor">{username}</p>
      </div>

      <button
        onClick={() => handleUnblockAccount(id)}
        type="button"
        disabled={isUnblockedAccountMutationPending}
        className="shrink-0 rounded-full border border-TertiaryColor/60 px-4 py-1.5 text-sm font-medium text-TertiaryColor transition hover:bg-tertext-TertiaryColor hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-tertext-TertiaryColor/60 disabled:opacity-50"
      >
        {isUnblockedAccountMutationPending ? "Submitting..." : "Unblock"}
      </button>
    </li>
  );
};

export default BlockedAccountItem;
