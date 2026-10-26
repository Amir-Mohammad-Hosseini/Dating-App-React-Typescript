import { isAxiosError } from "axios"
import uploadChatImage from "../../../services/api/Message/uploadChatImage"
import { toast } from "sonner"

const uploadChatImageMutation = () => {
    return {
        mutationFn : uploadChatImage ,
        onSuccess : () => {

        },
        onError : (error : Error) => {
            if(isAxiosError(error) && error.response?.status === 413){
                toast.error("Image is too large (max 5 MB).")
                return
            }
            toast.error("Image upload failed. Try again.")
        }
    }
}

export default  uploadChatImageMutation