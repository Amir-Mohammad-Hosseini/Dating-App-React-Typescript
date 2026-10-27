import type NavLinkItemType from "./types";
import { NavLink } from "react-router";

const NavLinkItem = ({
  to,
  label,
  Icon,
  unreadMessagesCount,
}: NavLinkItemType) => {
  return (
    <li className="min-w-0 flex-1 md:flex-none lg:w-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] leading-none transition hover:text-PrimaryColor md:size-12 md:justify-center md:p-0 lg:h-12 lg:w-full lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-base lg:leading-normal ${
            isActive
              ? "bg-TertiaryColor/20 text-PrimaryColor"
              : "text-SecondaryColor"
          }`
        }
      >
        <span className="relative">
          <Icon size={22} aria-hidden="true" />
          {to === "/messages" && unreadMessagesCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-3 grid h-4 min-w-4 place-items-center rounded-full bg-TertiaryColor px-1 font-PrimarySemiBoldFont text-[10px] text-PrimaryColor"
            >
              {unreadMessagesCount > 99 ? "99+" : unreadMessagesCount}
            </span>
          )}
        </span>
        <span className="max-w-full truncate md:sr-only lg:not-sr-only">
          {label}
        </span>
      </NavLink>
    </li>
  );
};

export default NavLinkItem;