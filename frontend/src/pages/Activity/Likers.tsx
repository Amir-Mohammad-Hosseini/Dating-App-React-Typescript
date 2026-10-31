import { PageLoader } from "../../components/Loader";
import { ActivityList } from "../../components/ActivityPage";
import useLikers from "./useLikers";

const LikersPage = () => {
  const {likersData , isLikersQueryPending , isLikersQueryError , likersError} = useLikers()

  if (isLikersQueryPending) {
    return <PageLoader />;
  }

  if(isLikersQueryError){
    throw new Error(likersError?.message)
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
