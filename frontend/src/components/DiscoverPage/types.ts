import type { SortedUser } from "../../types/discover";

export default interface FilterPanelType {
  fieldsClassName?: string;
}

export interface UpNextProfilesType {
  people: SortedUser[];
  currentIndex: number;
}
