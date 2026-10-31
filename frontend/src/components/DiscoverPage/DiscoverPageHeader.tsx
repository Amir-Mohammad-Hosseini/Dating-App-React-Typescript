import { IoFilter } from "react-icons/io5";
import { Logo } from "../Logo";
import { NotificationLogo } from "../NotificationLogo";

const DiscoverPageHeader = () => {
  return (
    <div className="flex items-center justify-between py-6 md:hidden">
      <Logo isShowText />
      <div className="flex items-center justify-center gap-x-2">
        <NotificationLogo />
        <button
          popoverTarget="filter-modal"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor lg:hidden"
        >
          <IoFilter className="h-3.5 w-3.5 text-SecondaryColor" />
        </button>
      </div>
    </div>
  );
};

export default DiscoverPageHeader;
