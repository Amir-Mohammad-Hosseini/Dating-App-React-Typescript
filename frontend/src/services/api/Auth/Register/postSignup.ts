import customFetch from "../../../../lib/axios/customFetch"
import type { SignupFormType } from "../../../../lib/zod/Auth/signupSchema"

const postSignup = async (userDatas : SignupFormType) => {
    console.log(userDatas)
    const response = await customFetch.post("signup" , userDatas)
    console.log(response)
    return response
}

export default postSignup