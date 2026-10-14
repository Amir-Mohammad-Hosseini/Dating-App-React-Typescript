import { FaRegUser } from "react-icons/fa";
import { LuBell, LuCircleHelp, LuShield } from "react-icons/lu";
import SettingAccountPanel from "../../components/SettingsPage/SettingAccountPanel";
import SettingNotificationsPanel from "../../components/SettingsPage/SettingNotificationsPanel";
import SettingSupportPanel from "../../components/SettingsPage/SettingSupportPanel";
import SettingPrivacyPanel from "../../components/SettingsPage/SettingPrivacyPanel";

const SETTINGS_PAGE_TABS = [
  { tabKey: "account", label: "Account", Icon: FaRegUser , panelContent : SettingAccountPanel },
  { tabKey: "notifications", label: "Notifications", Icon: LuBell , panelContent : SettingNotificationsPanel },
  { tabKey: "privacy", label: "Privacy", Icon: LuShield , panelContent : SettingPrivacyPanel },
  { tabKey: "support", label: "Support", Icon: LuCircleHelp , panelContent : SettingSupportPanel },
];

export const rowClass =
  "flex w-full items-center gap-3 border-b border-SecondaryColor/10 px-4 py-3.5 text-left last:border-b-0";
export const iconBoxClass =
  "flex size-9 shrink-0 items-center justify-center rounded-xl bg-SecondaryDarkBgColor text-SecondaryColor";
export const groupClass =
  "overflow-hidden rounded-2xl border border-SecondaryColor/10 bg-SecondaryDarkBgColor/60";

export default SETTINGS_PAGE_TABS;
