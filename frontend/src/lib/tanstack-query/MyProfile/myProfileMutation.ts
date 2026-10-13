import postUpdateMyProfileForm from "../../../services/api/MyProfile/postUpdateMyProfileForm"
import putUpdateMyProfilePhotos from "../../../services/api/MyProfile/putUpdateMyProfilePhotos"

export const myProfilePhotosMutation = () => {
    return {
        mutationFn :  putUpdateMyProfilePhotos, 
    }
}
export const myProfileFormMutation = () => {
    return {
        mutationFn : postUpdateMyProfileForm , 
    }
}