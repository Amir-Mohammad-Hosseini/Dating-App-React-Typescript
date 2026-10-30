import { AiOutlineHome } from "react-icons/ai";
import { FaEye, FaHeart, FaRegUser } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";

const NAV_ITEMS = [
  { to: "/discover", label: "Discover", Icon: AiOutlineHome },
  { to: "/matches", label: "Matches", Icon: FaHeart },
  { to: "/activity", label: "Activity", Icon: FaEye },
  { to: "/messages", label: "Messages", Icon: LuMessageSquare },
  { to: "/myProfile", label: "Profile", Icon: FaRegUser },
];

export default NAV_ITEMS