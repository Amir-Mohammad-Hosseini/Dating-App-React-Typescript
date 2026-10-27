import getVisitors from "../../../services/api/Activity/Visitors/getVisitors"

const visitorsQuery = () => {
    return {
        queryKey : ["visitors"],
        queryFn : getVisitors
    }
}

export default visitorsQuery