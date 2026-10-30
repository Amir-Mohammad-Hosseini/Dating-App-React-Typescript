import ActivityCard from "./ActivityCard";
import ActivityEmpty, { ActivityError } from "./ActivityEmpty";
import type ActivityListType from "./types";

export default function ActivityList({
  variant,
  items,
  isError,
  onLike,
}: ActivityListType) {
  if (isError) return <ActivityError />;
  if (!items || items.length === 0) return <ActivityEmpty variant={variant} />;

  return (
    <ul className="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
      {items.map((item) => (
        <li key={item.user_id} className="min-w-0">
          <ActivityCard item={item} variant={variant} onLike={onLike} />
        </li>
      ))}
    </ul>
  );
}
