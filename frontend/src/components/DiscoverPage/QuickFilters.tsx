import { SwipeButtons } from ".";
import { DISCOVER_QUICK_FILTERS } from "../../utils/constants/discover";
import { RadioInput } from "../Input";
import type { QuickFiltersType } from "./types";

const QuickFilters = ({
  selectedFilters,
  onChangeFilter,
  onSwipeButton,
}: QuickFiltersType) => {
  return (
    <div className="flex justify-center lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start">
      <div className="hidden w-50 justify-self-start lg:block">
        <RadioInput
          text="Quick filters"
          options={DISCOVER_QUICK_FILTERS}
          className="mt-2 flex-col"
          selectedValue={selectedFilters}
          onChange={onChangeFilter}
        />
      </div>
      <SwipeButtons onSwipeButton={onSwipeButton} />
    </div>
  );
};

export default QuickFilters;
