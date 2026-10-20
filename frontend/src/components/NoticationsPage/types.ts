export default interface NotificationItemType {
  id: number | string;
  picture: string;
  read: string;
  redirect_path: string;
  sender_id: string;
  text: string;
  user_id: number | string;
}
