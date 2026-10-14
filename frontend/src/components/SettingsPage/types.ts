import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

export default interface SettingsTabsType {
  activePanel: string;
  onActivePanel: (tabName: string) => void;
}

export interface SettingAccountActionButtonType {
  children: ReactNode;
  Icon: IconType;
  className?: string;
  onClickAccountAction: () => void;
  isSubmitting: boolean;
  submittingContent: ReactNode;
}

export interface SettingClickableButtonType {
  children: ReactNode;
  text: string;
  Icon: IconType | null;
  onClick: () => void;
  isSubmitting ?:boolean
  submittingContent ?: ReactNode
}

export interface SettingSwitchButtonTypeType {
  text: string;
  isValid: boolean;
  onClick: () => void;
}
