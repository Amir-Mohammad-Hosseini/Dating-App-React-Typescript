import type { IconType } from "react-icons/lib";

export default interface NavLinkItemType {
  to: string;
  label: string;
  Icon: IconType;
  unreadMessagesCount : number
}
