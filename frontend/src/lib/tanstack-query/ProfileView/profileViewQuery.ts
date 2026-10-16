import getProfileView from "../../../services/api/ProfileView/getProfileView"

const profileViewQuery = (userId : number | string) => {
    return {
        queryKey : ["profileView" , userId]
        ,
        queryFn : () => getProfileView(userId) ,
    }
}

export default profileViewQuery