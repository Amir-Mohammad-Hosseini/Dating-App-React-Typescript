import type { NavigateFunction } from "react-router"
import postChangePassword from "../../../../services/api/MyProfile/AccountActions/postChangePassword"
import queryClient from "../../queryClient"

const changePasswordMutation = (navigate : NavigateFunction) => {
    return {
        mutationFn : postChangePassword,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["myProfile"]})
            navigate("/myProfile")
        }
    }
}
export default changePasswordMutation