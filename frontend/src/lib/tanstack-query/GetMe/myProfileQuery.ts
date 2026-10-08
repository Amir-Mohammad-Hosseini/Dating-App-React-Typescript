import getMyProfile from "../../../services/api/GetMe/getMyProfile"

const myProfileQuery = () => {
    return {
        queryKey : ["myProfile"],
        queryFn : getMyProfile
    }
}

export default myProfileQuery