import Logo from "../../components/Logo/Logo";
import { AiOutlineHome } from "react-icons/ai";
import { FaHeart, FaRegUser } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import useUnreadMessagesCount from "../../hooks/Conversations/useUnreadMessagesCount";
import NavLinkItem from "./NavLinkItem";
import { FaEye } from "react-icons/fa";

const NAV_ITEMS = [
  { to: "/discover", label: "Discover", Icon: AiOutlineHome },
  { to: "/matches", label: "Matches", Icon: FaHeart },
  { to: "/activity", label: "Activity", Icon: FaEye },
  { to: "/messages", label: "Messages", Icon: LuMessageSquare },
  { to: "/myProfile", label: "Profile", Icon: FaRegUser },
];

const Navbar = () => {
  const { unreadMessagesCount } = useUnreadMessagesCount();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-SecondaryColor/20 bg-SecondaryDarkBgColor px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:sticky md:inset-x-auto md:top-0 md:bottom-auto md:flex md:h-dvh md:w-20 md:shrink-0 md:flex-col md:border-t-0 md:border-r md:px-3 md:py-6 lg:w-60 lg:px-4"
    >
      <div className="mb-8 hidden md:block">
        <div className="flex justify-center lg:hidden">
          <Logo isShowText={false} />
        </div>
        <div className="hidden px-3 lg:block">
          <Logo isShowText />
        </div>
      </div>

      <ul className="flex w-full items-stretch justify-between gap-0.5 md:flex-col md:items-center md:justify-start md:gap-2 lg:items-stretch">
        {NAV_ITEMS.map((navItem) => (
          <NavLinkItem
            key={navItem.to}
            {...navItem}
            unreadMessagesCount={unreadMessagesCount ?? 0}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;