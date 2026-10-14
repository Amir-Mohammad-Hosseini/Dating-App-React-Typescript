import type { SettingAccountActionButtonType } from "./types";
import { iconBoxClass, rowClass } from "../../utils/constants/settings";
import { LuChevronRight } from "react-icons/lu";

const SettingAccountActionButton = ({
  children,
  Icon,
  className = "",
  isSubmitting ,
  submittingContent,
  onClickAccountAction
}: SettingAccountActionButtonType) => {
  return (
    <button
      type="button"
      onClick={onClickAccountAction}
      className={`${rowClass} ${className}`}
      disabled={isSubmitting}
    >
      {
        isSubmitting ? submittingContent : 
      <span className={iconBoxClass}>
        <Icon size={16} />
      </span>
      }
      {children}
      <LuChevronRight size={16} className="text-SecondaryColor/60" />
    </button>
  );
};

export default SettingAccountActionButton;
