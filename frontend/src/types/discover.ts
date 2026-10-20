export type SortedUser = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  biography: string;
  fame_rating: number;
  distance: number | null;
  profile_pic: string | null;
  tags: string[];
  sexual_pref : "male" | "female" | "bisexual";
  gender : "male" | "female" | "other"
};
