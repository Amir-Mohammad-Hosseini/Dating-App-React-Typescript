import customFetch from "../../../../lib/axios/customFetch"
import type { SignupFormType } from "../../../../lib/zod/Auth/signupSchema"

const postSignup = async (userDatas : SignupFormType) => {
    const response = await customFetch.post("signup" , userDatas)
    return response
}

export default postSignup