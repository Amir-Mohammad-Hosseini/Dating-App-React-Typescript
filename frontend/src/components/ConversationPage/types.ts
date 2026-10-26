export default interface ConversationOtherProfileType {
  userId: number | string;
  profilePic: string | null;
  firstname: string;
  isOnline: boolean;
}

export interface ConversationOptionsType {
  userId: number | string;
  matchId ?: number | string;
  firstname: string;
}
