import ActivityList from "../../components/ActivityPage/ActivityList";
import { MOCK_VISITORS } from "../../data/visitors-likers";

// TODO: replace mock with useQuery -> GET /api/profile/visitors
const VisitorsPage = () => {
  return <ActivityList variant="visitors" items={MOCK_VISITORS} />;
}

export default  VisitorsPage