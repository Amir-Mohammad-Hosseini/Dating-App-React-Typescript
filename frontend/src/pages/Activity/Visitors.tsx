import ActivityList from "../../components/ActivityPage/ActivityList";
import { PageLoader } from "../../components/Loader";
import useVisitors from "./useVisitors";

const VisitorsPage = () => {
  const {visitorsData , isVisitorsQueryPending , isVisitirsQueryError , visitorsError} = useVisitors()

  if (isVisitorsQueryPending) {
    return <PageLoader />
  }

  if(isVisitirsQueryError){
    throw new Error(visitorsError?.message)
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
