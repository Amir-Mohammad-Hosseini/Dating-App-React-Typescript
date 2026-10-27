import type { ActivityItemType, ActivityVariantType } from "../components/ActivityPage/types";

export const focusRingStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-TertiaryColor focus-visible:ring-offset-2 focus-visible:ring-offset-PrimaryDarkBgColor";

export const relativeTime =(iso: string, now: number = Date.now()) =>{
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return new Date(iso).toLocaleDateString("en", { month: "short", day: "numeric" });
}


const whenActivityHappenedTime = (item: ActivityItemType, variant: ActivityVariantType)=> {
  const whenActivityHappened = relativeTime(item.activity_time);
  if (variant === "likes") return `Liked you ${whenActivityHappened}`;
  if (item.visit_count && item.visit_count > 1) {
    return `Visited ${item.visit_count} times · last ${whenActivityHappened}`;
  }
  return `Visited ${whenActivityHappened}`;
}

export default whenActivityHappenedTime