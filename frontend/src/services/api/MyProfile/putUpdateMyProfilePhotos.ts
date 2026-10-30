import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const putUpdateMyProfilePhotos = async (formData : FormData) => {

    const response = await customFetch.put(ENDPOINTS.MY_PROFILE.EDIT_PICTURES, formData)
    return response.data
}

export default putUpdateMyProfilePhotos