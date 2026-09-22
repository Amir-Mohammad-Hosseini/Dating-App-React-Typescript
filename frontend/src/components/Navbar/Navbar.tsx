import { NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import { AiOutlineHome } from "react-icons/ai";
import { FaHeart, FaRegUser } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";

const NAV_ITEMS = [
  { to: "/discover", label: "Discover", Icon: AiOutlineHome },
  { to: "/matches", label: "Matches", Icon: FaHeart },
  { to: "/messages", label: "Messages", Icon: LuMessageSquare },
  { to: "/profile", label: "Profile", Icon: FaRegUser },
];

// base/sm: tab in the bottom bar (icon over label)
// md:      icon-only square in the sidebar
// lg+:     full-width row with icon + label
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs transition hover:text-PrimaryColor md:size-12 md:justify-center md:p-0 lg:h-12 lg:w-full lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-base ${
    isActive ? "bg-TertiaryColor/20 text-PrimaryColor" : "text-SecondaryColor"
  }`;

const Navbar = () => {
  return (
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 border-t border-SecondaryColor/20 bg-SecondaryDarkBgColor px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:sticky md:inset-x-auto md:top-0 md:bottom-auto md:flex md:h-dvh md:w-20 md:shrink-0 md:flex-col md:border-t-0 md:border-r md:px-3 md:py-6 lg:w-60 lg:px-4"
      >
        <div className="mb-8 hidden md:block">
          <div className="flex justify-center lg:hidden">
            <Logo isShowText={false} />
          </div>
          <div className="hidden px-3 lg:block">
            <Logo isShowText />
          </div>
        </div>

        <ul className="flex w-full justify-around md:flex-col md:items-center md:justify-start md:gap-2 lg:items-stretch">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink to={to} className={navLinkClass}>
                <Icon size={20} aria-hidden="true" />
                {/* hidden visually at md (icon-only) but still read by screen readers */}
                <span className="md:sr-only lg:not-sr-only">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
  )
}

export default Navbar
