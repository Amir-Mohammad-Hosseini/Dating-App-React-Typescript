import { toast } from "sonner";
import postLogin from "../../../../services/api/Auth/Login/postLogin";

const loginMutation = (navigate : any) => {
    return {
    mutationFn: postLogin,
    onSuccess: () => {
        toast("Logged in successfully")
        navigate("/discover")
    },
    onError : (error : any) => {
        const message = error.response?.data?.message || "An error occurred while logging"
        toast(message)
    }
  }
}

export default loginMutation