import customFetch from "../../../lib/axios/customFetch"

const getMyProfile = async () =>  {
    const response = await customFetch("profile")
    return response.data
}

export default getMyProfile