import { useState } from "react";
import {
  LuLogOut,
  LuTrash2,
} from "react-icons/lu";
import Navbar from "../../components/Navbar/Navbar";
import SETTINGS_PAGE_TABS from "../../utils/constants/settings";
import SettingsTabs from "../../components/SettingsPage/SettingsTabs";
import SettingAccountActionButton from "../../components/SettingsPage/SettingAccountActionButton";

const Settings = () => {
  const [activePanel, setActivePanel] = useState("account");
  const ActivePanelContent = SETTINGS_PAGE_TABS.find(
    (tabItemDatas) => tabItemDatas.tabKey === activePanel,
  )?.panelContent;

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor text-white md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 pb-24 md:pb-0">
        <header className="px-5 pt-6 pb-2 sm:px-6 lg:px-10 lg:mt-2">
          <h1 className="font-serif text-3xl italic">Settings</h1>
        </header>

        <div className="flex flex-col gap-4 px-5 pb-10 sm:px-6 lg:flex-row lg:items-start lg:px-10">
          <SettingsTabs
            activePanel={activePanel}
            onActivePanel={(tabName: string) => setActivePanel(tabName)}
          />

          {/* ---------- content ---------- */}
          <div className="min-w-0 flex-1 lg:border-l lg:border-SecondaryColor/10 lg:px-8 xl:px-12">
            <div className="mx-auto flex max-w-xl flex-col gap-5">
              {/* ================= MAIN CONTENT ================= */}

              {ActivePanelContent && <ActivePanelContent />}

              {/* ================= ACCOUNT ACTIONS ================= */}
              <div>
                <h2 className="mb-3 font-serif text-xl">Account actions</h2>

                <div className="overflow-hidden rounded-2xl border border-PrimaryColor/30">

                  <SettingAccountActionButton Icon={LuLogOut} className="cursor-pointer hover:text-TertiaryColor transition">
                    <span className="flex-1 text-sm font-medium">Log out</span>
                  </SettingAccountActionButton>
                  <SettingAccountActionButton Icon={LuTrash2} className="cursor-pointer hover:text-TertiaryColor transition">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        Delete account
                      </span>
                      <span className="mt-0.5 block text-xs text-SecondaryColor/70">
                        This can't be undone
                      </span>
                    </span>
                  </SettingAccountActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
