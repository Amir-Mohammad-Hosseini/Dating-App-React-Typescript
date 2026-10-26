import customFetch from "../../../lib/axios/customFetch"

const uploadChatImage = async (file : File) => {
    const formData = new FormData()
    formData.append("image" , file)
    const response = await customFetch.post("chat/upload_image" , formData , {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return response.data.image_url
}

export default uploadChatImage