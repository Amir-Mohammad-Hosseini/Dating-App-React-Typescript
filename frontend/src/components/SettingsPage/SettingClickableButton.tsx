import { LuChevronRight } from "react-icons/lu";
import { iconBoxClass, rowClass } from "../../utils/constants/settings";
import type { SettingClickableButtonType } from "./types";

const SettingClickableButton = ({
  children = null,
  text,
  Icon,
  onClick,
  isSubmitting,
  submittingContent,
}: SettingClickableButtonType) => {
  return (
    <button
      type="button"
      className={rowClass}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting
        ? submittingContent
        : Icon && (
            <span className={iconBoxClass}>
              <Icon size={16} />
            </span>
          )}
      {children || <span className="flex-1 text-sm font-medium">{text}</span>}
      <LuChevronRight size={16} className="text-SecondaryColor/60" />
    </button>
  );
};

export default SettingClickableButton;
