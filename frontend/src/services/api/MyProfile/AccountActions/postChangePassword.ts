import customFetch from "../../../../lib/axios/customFetch"
import type { ChangePasswordDatas } from "../../../../types/myProfile"

const postChangePassword = async (passwordDatas : ChangePasswordDatas) => {
    const response = await customFetch.post("profile/changepassword" ,passwordDatas)
    return response.data
}
export default postChangePassword