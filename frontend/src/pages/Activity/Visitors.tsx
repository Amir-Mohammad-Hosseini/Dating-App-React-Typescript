import { useQuery } from "@tanstack/react-query";
import ActivityList from "../../components/ActivityPage/ActivityList";
import visitorsQuery from "../../lib/tanstack-query/Activity/visitorsQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";

const VisitorsPage = () => {

    const { data: visitorsData, isPending: isVisitorsQueryPending, isError : isVisitirsQueryError } =
    useQuery(visitorsQuery());

    if(isVisitorsQueryPending){
      return <LoadingOverlay show />
    }

  return <ActivityList variant="visitors" items={visitorsData} isError={isVisitirsQueryError} />;
}

export default  VisitorsPage