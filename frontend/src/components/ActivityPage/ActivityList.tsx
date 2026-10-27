import ActivityCard from "./ActivityCard";
import ActivityEmpty, { ActivityError } from "./ActivityEmpty";
import ActivitySkeleton from "./ActivitySkeleton";
import type ActivityListType from "./types";


/** Shared by VisitorsTab and LikesTab: <ActivityList variant="visitors" {...query} /> */
export default function ActivityList({
  variant,
  items,
  isLoading,
  isError,
  onRetry = () => {},
  onLike,
}: ActivityListType) {
  if (isLoading) return <ActivitySkeleton count={6} />;
  if (isError) return <ActivityError onRetry={onRetry} />;
  if (!items || items.length === 0) return <ActivityEmpty variant={variant} />;

  return (
    <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.user_id}>
          <ActivityCard item={item} variant={variant} onLike={onLike} />
        </li>
      ))}
    </ul>
  );
}
