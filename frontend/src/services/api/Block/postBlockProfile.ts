import customFetch from "../../../lib/axios/customFetch"

const postBlockProfile = async (userId : number | string) => {
    const response = await customFetch.post(`browsing/blockuser/${userId}`)
    return response.data
}

export default postBlockProfile