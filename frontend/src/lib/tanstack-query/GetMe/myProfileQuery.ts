import getMyProfile from "../../../services/api/GetMe/getMyProfile"
import queryKeys from "../queryKeys"

const myProfileQuery = () => {
    return {
        queryKey : queryKeys.myProfile.all,
        queryFn : getMyProfile
    }
}

export default myProfileQuery