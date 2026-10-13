import customFetch from "../../../lib/axios/customFetch";

const putUpdateMyProfilePhotos = async (formData : FormData) => {

    const response = await customFetch.put("profile/pictures", formData)
    return response.data
}

export default putUpdateMyProfilePhotos