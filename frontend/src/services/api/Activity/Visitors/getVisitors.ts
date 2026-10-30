import customFetch from "../../../../lib/axios/customFetch"
import ENDPOINTS from "../../endpoints"

const getVisitors = async () => {
    return (await customFetch(ENDPOINTS.ACTIVITY.VISITORS)).data
}

export default  getVisitors