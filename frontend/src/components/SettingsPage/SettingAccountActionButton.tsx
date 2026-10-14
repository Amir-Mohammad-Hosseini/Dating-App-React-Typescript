import type { SettingAccountActionButtonType } from "./types";
import { iconBoxClass, rowClass } from "../../utils/constants/settings";
import { LuChevronRight } from "react-icons/lu";

const SettingAccountActionButton = ({
  children,
  Icon,
  className = "",
}: SettingAccountActionButtonType) => {
  return (
    <button
      type="button"
      onClick={() => {
        /* اینجا به تابع خروج از حساب وصلش کن */
      }}
      className={`${rowClass} ${className}`}
    >
      <span className={iconBoxClass}>
        <Icon size={16} />
      </span>
      {children}
      <LuChevronRight size={16} className="text-SecondaryColor/60" />
    </button>
  );
};

export default SettingAccountActionButton;
