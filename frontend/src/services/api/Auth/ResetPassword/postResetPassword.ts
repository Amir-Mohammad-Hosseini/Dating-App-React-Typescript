import customFetch from "../../../../lib/axios/customFetch"
import type ResetPasswordDatasType from "../../../../types/reset-password"

const postResetPassword= async (resetPasswordDatas : ResetPasswordDatasType) => {
    const response = await customFetch.post("setnewpassword" ,resetPasswordDatas)
    return response.data
}

export default  postResetPassword