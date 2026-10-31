import type { SortedUser } from "../../types/discover";
import type {
  DISCOVER_QUICK_FILTERS,
  DiscoverFilters,
} from "../../utils/constants/discover";

export default interface FilterPanelType {
  fieldsClassName?: string;
  onApplyFilters: (data: DiscoverFilters) => void;
}

export interface UpNextProfilesType {
  people: SortedUser[];
  currentIndex: number;
}
export interface SwipeButtonsType {
  onSwipeButton: (direction: 1 | -1) => void;
}

export interface QuickFiltersType {
  selectedFilters: string;
  onChangeFilter: (option: (typeof DISCOVER_QUICK_FILTERS)[number]) => void;
  onSwipeButton: (direction: 1 | -1) => void;
}

export interface FilterModalType {
  onApplyFilters : (data: DiscoverFilters) => void
}