import getLikers from "../../../services/api/Activity/Likers/getLikers"
import queryKeys from "../queryKeys"

const likersQuery = () => {
    return {
        queryKey : queryKeys.activity.likers,
        queryFn : getLikers
    }
}

export default  likersQuery