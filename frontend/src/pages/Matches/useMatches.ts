import { useQuery } from "@tanstack/react-query";
import matchesQuery from "../../lib/tanstack-query/Matches/matchesQuery";
import useLikers from "../Activity/useLikers";

const useMatches = () => {
  const { data: matchesPeople, isPending : isMatchesPeopleQueryPending , isError :  isMatchesPeopleQueryError , error : matchesPeopleError} = useQuery(matchesQuery());
  const {likersData , isLikersQueryPending , isLikersQueryError , likersError} = useLikers()

  const isPending = isMatchesPeopleQueryPending || isLikersQueryPending
  const isError = isMatchesPeopleQueryError || isLikersQueryError
  return {matchesPeople ,isPending , isError , matchesPeopleError ,likersData, likersError}
}

export default useMatches
