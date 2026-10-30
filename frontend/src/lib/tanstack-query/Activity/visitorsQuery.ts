import getVisitors from "../../../services/api/Activity/Visitors/getVisitors"
import queryKeys from "../queryKeys"

const visitorsQuery = () => {
    return {
        queryKey : queryKeys.activity.visitors,
        queryFn : getVisitors
    }
}

export default visitorsQuery