import type { SortedUser } from "../../types/discover";
import type { DiscoverFilters } from "../../utils/constants/discover";

export default interface FilterPanelType {
  fieldsClassName?: string;
  onApplyFilters : (data : DiscoverFilters) => void
}

export interface UpNextProfilesType {
  people: SortedUser[];
  currentIndex: number;
}
export interface SwipeButtonsType {
  onSwipeButton : (direction : 1 | -1) => void
}


