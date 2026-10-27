import postVerifyEmail from "../../../../services/api/Auth/VerifyEmail/postVerifyEmail"

const verifyEmailQuery = (username ?: string , code ?: string) => {
    return {
        queryKey : ["verifyEmail"],
        queryFn : () => postVerifyEmail(username! , code!)
    }
}

export default  verifyEmailQuery