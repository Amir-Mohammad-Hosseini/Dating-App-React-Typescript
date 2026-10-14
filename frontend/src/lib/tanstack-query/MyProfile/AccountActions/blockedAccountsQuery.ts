import getBlockedAccounts from "../../../../services/api/MyProfile/AccountActions/getBlockedAccounts"

const blockedAccountsQuery = () => {
    return {
        queryKey : ["blockedAccounts"],
        queryFn : getBlockedAccounts
    }
}

export default blockedAccountsQuery