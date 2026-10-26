import type NavLinkItemType from "./types";
import { NavLink } from "react-router";

const NavLinkItem = ({
  to,
  label,
  Icon,
  unreadMessagesCount,
}: NavLinkItemType) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 rounded-xl relative px-4 py-2 text-xs transition hover:text-PrimaryColor md:size-12 md:justify-center md:p-0 lg:h-12 lg:w-full lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-base ${
            isActive
              ? "bg-TertiaryColor/20 text-PrimaryColor"
              : "text-SecondaryColor"
          }`
        }
      >
        <Icon size={20} aria-hidden="true" />
        {to === "/messages" && unreadMessagesCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-TertiaryColor px-1 font-PrimarySemiBoldFont text-[10px] text-PrimaryColor"
          >
            {unreadMessagesCount > 99 ? "99+" : unreadMessagesCount}
          </span>
        )}
        <span className="md:sr-only lg:not-sr-only">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
