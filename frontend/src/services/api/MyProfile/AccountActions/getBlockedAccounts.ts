import customFetch from "../../../../lib/axios/customFetch"

const getBlockedAccounts = async () => {
    const response = await customFetch("profile/blocked")
    return response.data
}

export default getBlockedAccounts