import { useQuery } from "@tanstack/react-query";
import blockedAccountsQuery from "../../lib/tanstack-query/MyProfile/AccountActions/blockedAccountsQuery";

const useBlockedAccounts = () => {
  const { data: blockedAccounts, isPending: isBlockedAccountsQueryPending } =
    useQuery(blockedAccountsQuery());

    return {blockedAccounts , isBlockedAccountsQueryPending}
}

export default useBlockedAccounts