export interface ActivityItem {
  user_id: number;
  firstname: string;
  username: string;
  age: number | null;
  picture_data: string | null;
  is_online: boolean;
  activity_time: string; // ISO date of the last visit / like
  visit_count?: number; // Visitors tab only
  connection_id: number | null; // not null = matched
  i_liked: boolean;
  is_new: boolean;
};

export default interface ActivityListType {
  variant: ActivityVariant;
  items?: ActivityItem[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onLike?: (userId: number) => void;
};

export type ActivityVariant = "visitors" | "likes";
