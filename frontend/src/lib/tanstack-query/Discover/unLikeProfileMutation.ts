import { toast } from "sonner"
import postUnLikeProfile from "../../../services/api/Discover/postUnLikeProfile"
import type { SortedUser } from "../../../types/discover"

const unLikeProfileMutation = () => {
    return {
        mutationFn :(person: SortedUser) => postUnLikeProfile(person.id),
        onSuccess : (data : any , person : SortedUser) => {
        },
        onError : (error : Error) => {
            toast.error(error.message)
        }
    }
}

export default unLikeProfileMutation