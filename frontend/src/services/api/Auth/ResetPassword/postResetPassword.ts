import customFetch from "../../../../lib/axios/customFetch"
import type ResetPasswordDatasType from "../../../../types/reset-password"
import ENDPOINTS from "../../endpoints"

const postResetPassword= async (resetPasswordDatas : ResetPasswordDatasType) => {
    const response = await customFetch.post(ENDPOINTS.AUTH.SET_NEW_PASSWORD ,resetPasswordDatas)
    return response.data
}

export default  postResetPassword