import { useState } from "react";
import { groupClass } from "../../utils/constants/settings";
import SettingSwitchButton from "./SettingSwitchButton";

const SettingNotificationsPanel = () => {
  const [notifs] = useState({
    matches: true,
    messages: true,
    likes: false,
    updates: false,
  });
  return (
    <div>
      <h2 className="font-serif text-xl">Notifications</h2>
      <p className="mt-1 mb-4 text-sm text-SecondaryColor/70">
        Choose what Ember can notify you about.
      </p>

      <div className={groupClass}>
        <SettingSwitchButton
          text="New matches"
          isValid={notifs.matches}
          onClick={() => {}}
        />
        <SettingSwitchButton
          text="New messages"
          isValid={notifs.messages}
          onClick={() => {}}
        />
        <SettingSwitchButton
          text="Likes"
          isValid={notifs.likes}
          onClick={() => {}}
        />
        <SettingSwitchButton
          text="Product updates"
          isValid={notifs.updates}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default SettingNotificationsPanel;
