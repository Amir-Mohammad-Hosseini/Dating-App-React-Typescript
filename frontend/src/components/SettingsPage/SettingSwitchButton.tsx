import { rowClass } from "../../utils/constants/settings"
import type { SettingSwitchButtonTypeType } from "./types"

const SettingSwitchButton = ({text , isValid , onClick} : SettingSwitchButtonTypeType) => {
  return (
        <div className={rowClass}>
          <span className="flex-1 text-sm font-medium">{text}</span>
          <button
            type="button"
            role="switch"
            aria-checked={isValid}
            aria-label="New matches notifications"
            onClick={onClick}
            className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
              isValid
                ? "border-PrimaryColor bg-PrimaryColor"
                : "border-SecondaryColor/20 bg-SecondaryDarkBgColor"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full transition-transform ${
                isValid
                  ? "translate-x-5 bg-SecondaryDarkBgColor"
                  : "bg-SecondaryColor/60"
              }`}
            />
          </button>
        </div>
  )
}

export default SettingSwitchButton
