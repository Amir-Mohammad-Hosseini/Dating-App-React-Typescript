export interface ActivityItemType {
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

export type ActivityVariantType = "visitors" | "likes";
export default interface ActivityListType {
  variant: ActivityVariantType;
  items?: ActivityItemType[];
  isError?: boolean;
  onRetry?: () => void;
  onLike?: (userId: number) => void;
};

export interface ActivityCardType {
  item: ActivityItemType;
  variant: ActivityVariantType;
  onLike?: (userId: number) => void;
  liking?: boolean;
};

