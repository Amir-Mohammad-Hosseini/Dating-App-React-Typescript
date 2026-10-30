import getBlockedAccounts from "../../../../services/api/MyProfile/AccountActions/getBlockedAccounts"
import queryKeys from "../../queryKeys"

const blockedAccountsQuery = () => {
    return {
        queryKey : queryKeys.blockes.all,
        queryFn : getBlockedAccounts
    }
}

export default blockedAccountsQuery