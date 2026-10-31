import { useState } from "react";

import SETTINGS_PAGE_TABS from "../../utils/constants/settings";

const useSettings = () => {
  const [activePanel, setActivePanel] = useState("account");

  const ActivePanelContent = SETTINGS_PAGE_TABS.find(
    (tabItemDatas) => tabItemDatas.tabKey === activePanel,
  )?.panelContent;

  const handleActivePanel = (tabName: string) => {
    setActivePanel(tabName);
  };

  return {
    activePanel,
    ActivePanelContent,
    handleActivePanel,
  };
};

export default useSettings;