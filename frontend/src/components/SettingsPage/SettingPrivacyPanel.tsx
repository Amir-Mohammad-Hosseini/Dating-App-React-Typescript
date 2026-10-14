import { groupClass } from "../../utils/constants/settings";
import { useState } from "react";
import SettingSwitchButton from "./SettingSwitchButton";
import SettingClickableButton from "./SettingClickableButton";

const SettingPrivacyPanel = () => {
  const [privacy] = useState({
    showMe: true,
    readReceipts: false,
  });

  return (
    <div>
      <h2 className="font-serif text-xl">Privacy</h2>
      <p className="mt-1 mb-4 text-sm text-SecondaryColor/70">
        Control what's visible and who can reach you.
      </p>

      <div className={groupClass}>
        <SettingSwitchButton
          text="Show me on Ember"
          onClick={() => {}}
          isValid={privacy.showMe}
        />
        <SettingSwitchButton
          text="Read receipts"
          onClick={() => {}}
          isValid={privacy.readReceipts}
        />

        <SettingClickableButton
          text="Distance visibility"
          Icon={null}
          onClick={() => {}}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">
              Distance visibility
            </span>
            <span className="mt-0.5 block text-xs text-SecondaryColor/70">
              Shown to matches
            </span>
          </span>
        </SettingClickableButton>

        <SettingClickableButton
          text="Blocked users"
          Icon={null}
          onClick={() => {}}
          children={null}
        />
      </div>
    </div>
  );
};

export default SettingPrivacyPanel;
