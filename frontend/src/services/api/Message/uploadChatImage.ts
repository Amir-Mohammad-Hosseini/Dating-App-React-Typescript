import customFetch from "../../../lib/axios/customFetch"
import ENDPOINTS from "../endpoints"

const uploadChatImage = async (file : File) => {
    const formData = new FormData()
    formData.append("image" , file)
    const response = await customFetch.post(ENDPOINTS.MESSAGE.CHAT_IMAGE_MESSAGE , formData , {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.data.image_url
}

export default uploadChatImage