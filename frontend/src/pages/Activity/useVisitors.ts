import { useQuery } from "@tanstack/react-query";
import visitorsQuery from "../../lib/tanstack-query/Activity/visitorsQuery";

const useVisitors = () => {
      const {
    data: visitorsData,
    isPending: isVisitorsQueryPending,
    isError: isVisitirsQueryError,
    error : visitorsError
  } = useQuery(visitorsQuery());

  return {visitorsData , isVisitorsQueryPending , isVisitirsQueryError , visitorsError}
}

export default useVisitors