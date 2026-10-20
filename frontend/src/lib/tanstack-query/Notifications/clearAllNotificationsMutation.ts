import { toast } from "sonner"
import queryClient from "../queryClient"
import deleteClearAllNotifications from "../../../services/api/Notifications/deleteClearAllNotifications"

const clearAllNotificationsMutation = () => {
    return {
        mutationFn : deleteClearAllNotifications,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["notifications"]
            })
            toast.success("Notifications cleared")
        }
    }
}

export default clearAllNotificationsMutation