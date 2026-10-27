import { useQuery } from "@tanstack/react-query";
import ActivityList from "../../components/ActivityPage/ActivityList";
import likersQuery from "../../lib/tanstack-query/Activity/likersQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";

const LikersPage =() => {
  const { data: likersData, isPending: isLikersQueryPending,isError : isLikersQueryError } =
    useQuery(likersQuery());

    if(isLikersQueryPending){
      return <LoadingOverlay show />
    }

  return <ActivityList variant="likes" items={likersData} isError={isLikersQueryError} />;
}

export default  LikersPage