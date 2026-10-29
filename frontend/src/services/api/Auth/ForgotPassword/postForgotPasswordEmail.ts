import customFetch from "../../../../lib/axios/customFetch"

const postForgotPasswordEmail = async (email : string) => {
    const response = await customFetch.post("resetpassword" , {
        resetvalue : email
    })

    console.log(response.data)
    return response.data
}

export default  postForgotPasswordEmail