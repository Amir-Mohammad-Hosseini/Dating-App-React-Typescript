import { toast } from "sonner";
import postLogin from "../../../../services/api/Auth/Login/postLogin";
import type { NavigateFunction } from "react-router";

const loginMutation = (navigate : NavigateFunction) => {
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