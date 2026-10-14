import SETTINGS_PAGE_TABS from "../../utils/constants/settings"
import type SettingsTabsType from "./types"

const SettingsTabs = ({activePanel , onActivePanel}: SettingsTabsType) => {
  return (
          <nav className="lg:w-64 lg:shrink-0 xl:w-72">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {SETTINGS_PAGE_TABS.map(({ tabKey, label, Icon }) => (
                <li key={tabKey} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onActivePanel(tabKey)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                      activePanel === tabKey
                        ? "bg-TertiaryColor/20 text-PrimaryColor"
                        : "text-SecondaryColor hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
  )
}

export default SettingsTabs
