import type { ChangeEvent, SubmitEventHandler } from "react";

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

export interface EmptyHistoryMessagesType {
  anotherFirstname : string
}

export interface SendMessageFormType {
  draft : string
  onSubmitMessage : SubmitEventHandler<HTMLFormElement>
  onWriteMessage : (event : ChangeEvent<HTMLInputElement>) => void
  onSendImage : (event: ChangeEvent<HTMLInputElement>) => void
  isUploadImagePending : boolean
}