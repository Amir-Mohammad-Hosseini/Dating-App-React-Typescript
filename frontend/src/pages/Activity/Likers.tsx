import { useQuery } from "@tanstack/react-query";
import likersQuery from "../../lib/tanstack-query/Activity/likersQuery";
import { PageLoader } from "../../components/Loader";
import { ActivityList } from "../../components/ActivityPage";

const LikersPage = () => {
  const {
    data: likersData,
    isPending: isLikersQueryPending,
    isError: isLikersQueryError,
  } = useQuery(likersQuery());

  if (isLikersQueryPending) {
    return <PageLoader />
  }

  return (
    <ActivityList
      variant="likes"
      items={likersData}
      isError={isLikersQueryError}
    />
  );
};

export default LikersPage;
