import ActivityList from "../../components/ActivityPage/ActivityList";
import { MOCK_LIKERS } from "../../data/visitors-likers";

// TODO: replace mock with useQuery -> GET /api/profile/likers
const LikesPage =() => {
  return <ActivityList variant="likes" items={MOCK_LIKERS} />;
}

export default  LikesPage