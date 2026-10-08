import { toast } from "sonner"
import postLikeProfile from "../../../services/api/Discover/postLikeProfile"
import type { SortedUser } from "../../../types/discover"
import useAppStore from "../../zustand/store"

const likeProfileMutation = () => {
    return {
        mutationFn : (person: SortedUser) => postLikeProfile(person.id),
        onSuccess : (data : any , person : SortedUser) => {
            console.log(data , "SUCCESS")
            if(data.isMatch){
                useAppStore.getState().openMatchModal({
                    connectionId : data.connectionId,
                    person
                })
            }
        },
        onError : (error : Error) => {
            toast.error(error.message)
        }
    }
}

export default likeProfileMutation