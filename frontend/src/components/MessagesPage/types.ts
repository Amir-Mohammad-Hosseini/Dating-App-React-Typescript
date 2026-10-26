export default interface HistoryMessageType {
  key: number;
  name: string;
  room: number;
  sender_id: number;
  text: string;
  time_stamp: string;
  image_url: string | null;
  onImageLoad : () => void
}
