import { useQuery } from "@tanstack/react-query";
import likersQuery from "../../lib/tanstack-query/Activity/likersQuery";

const useLikers = () => {
   const { data: likersData,
    isPending: isLikersQueryPending,
    isError: isLikersQueryError,
    error : likersError
  } = useQuery(likersQuery());

  return {likersData , isLikersQueryPending , isLikersQueryError , likersError}

}

export default useLikers