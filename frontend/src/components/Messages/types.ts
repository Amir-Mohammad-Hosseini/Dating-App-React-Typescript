export default interface ConversationItemType {
  age: number;
  connection_id: number;
  firstname: string;
  picture_data: string;
  user_id: number;
  username: string;
  last_message: string | null;
  last_message_time: string | null;
  last_message_sender_id: number | null;
  unread_count: number;
}
