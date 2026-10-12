import getMatches from "../../../services/api/Matches/getMatches"

const matchesQuery = () => {
    return {
        queryKey : ["matches"],
        queryFn : getMatches
    }
}

export default matchesQuery