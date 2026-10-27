import customFetch from "../../../../lib/axios/customFetch"

const getVisitors = async () => {
    const response = await customFetch("profile/visitors")
    return response.data
}

export default  getVisitors