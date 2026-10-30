import customFetch from "../../../../lib/axios/customFetch"
import ENDPOINTS from "../../endpoints"

const postForgotPasswordEmail = async (email : string) => {
    const response = await customFetch.post(ENDPOINTS.AUTH.FORGOT_PASSWORD , {
        resetvalue : email
    })
    return response.data
}

export default  postForgotPasswordEmail