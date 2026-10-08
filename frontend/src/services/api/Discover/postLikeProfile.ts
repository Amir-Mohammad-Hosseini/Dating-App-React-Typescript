import customFetch from "../../../lib/axios/customFetch"

const postLikeProfile = async (userId : number) => {
    const response = await customFetch.post(`browsing/likeuser/${userId}`)
    console.log(response)
    return response.data
}

export default postLikeProfile