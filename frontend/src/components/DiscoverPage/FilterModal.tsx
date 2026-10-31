import FilterPanel from "./FilterPanel";
import type { FilterModalType } from "./types";

const FilterModal = ({onApplyFilters} : FilterModalType) => {
  return (
    <div className="modal lg:hidden" id="filter-modal" popover="auto">
      <div className="modal-box absolute bottom-0 mx-auto w-dvw space-y-4 rounded-t-2xl bg-PrimaryDarkBgColor">
        <FilterPanel onApplyFilters={onApplyFilters} />
      </div>
      <div className="modal-backdrop">
        <button popoverTarget="filter-modal" popoverTargetAction="hide">
          close
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
