import customFetch from "../../../../lib/axios/customFetch"
import ENDPOINTS from "../../endpoints"

const getLikers = async () => {
     return (await customFetch(ENDPOINTS.ACTIVITY.LIKERS)).data
}

export default  getLikers