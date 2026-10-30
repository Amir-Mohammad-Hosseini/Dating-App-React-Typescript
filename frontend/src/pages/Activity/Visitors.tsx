import { useQuery } from "@tanstack/react-query";
import ActivityList from "../../components/ActivityPage/ActivityList";
import visitorsQuery from "../../lib/tanstack-query/Activity/visitorsQuery";
import { PageLoader } from "../../components/Loader";

const VisitorsPage = () => {
  const {
    data: visitorsData,
    isPending: isVisitorsQueryPending,
    isError: isVisitirsQueryError,
  } = useQuery(visitorsQuery());

  if (isVisitorsQueryPending) {
    return <PageLoader />
  }

  return (
    <ActivityList
      variant="visitors"
      items={visitorsData}
      isError={isVisitirsQueryError}
    />
  );
};

export default VisitorsPage;
