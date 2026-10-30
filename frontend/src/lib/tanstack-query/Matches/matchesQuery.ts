import getMatches from "../../../services/api/Matches/getMatches"
import queryKeys from "../queryKeys"

const matchesQuery = () => {
    return {
        queryKey : queryKeys.matches.all,
        queryFn : getMatches
    }
}

export default matchesQuery