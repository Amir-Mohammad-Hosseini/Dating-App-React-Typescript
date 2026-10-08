import customFetch from "../../../lib/axios/customFetch"

const postUnLikeProfile = async (userId : number) => {
    const response = await customFetch.post(`browsing/unlikeuser/${userId}`)
    console.log(response)
    return response.data
}

export default postUnLikeProfile