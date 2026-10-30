import Logo from "../../components/Logo/Logo";
import useUnreadMessagesCount from "../../hooks/Conversations/useUnreadMessagesCount";
import NAV_ITEMS from "../../utils/constants/navbar";
import NavLinkItem from "./NavLinkItem";

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
