import customFetch from "../../../../lib/axios/customFetch"

const postUnblockAccount =async (accountId : number | string) => {
    const response = await customFetch.post(`profile/unblock/${accountId}`)
    return response.data
}

export default postUnblockAccount