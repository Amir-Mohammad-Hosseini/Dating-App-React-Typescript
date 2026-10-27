import getLikers from "../../../services/api/Activity/Likers/getLikers"

const likersQuery = () => {
    return {
        queryKey : ["likers"],
        queryFn : getLikers
    }
}

export default  likersQuery