import RangeInput from "../Input/RangeInput";
import Button from "../Button/Button";
import type FilterPanelType from "./types";
import Spinner from "../Loader/Spinner";
import { useForm } from "react-hook-form";
import type { DiscoverFilters } from "../../utils/constants/discover";
import DEFAULT_DISCOVER_FILTERS from "../../utils/constants/discover";

const FilterPanel = ({ fieldsClassName = "" , onApplyFilters }: FilterPanelType) => {
  const { register, handleSubmit, watch } = useForm<DiscoverFilters>({
    defaultValues: {
      ...DEFAULT_DISCOVER_FILTERS,
      min_age: 18,
      max_age: 31,
      max_distance: 25,
    },
  });

  const [minAge, maxAge, maxDistance] = watch([
    "min_age",
    "max_age",
    "max_distance",
  ]);

  const onSubmit = (data: DiscoverFilters) => {
    onApplyFilters(data)
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold font-TitleFont text-lg">Refine your stack</h3>

      <div className={`flex flex-col gap-4 ${fieldsClassName}`}>
        <RangeInput
          text="Distance"
          {...register("max_distance" , {valueAsNumber : true})}
          min={1}
          max={50}
          defaultValue={25}
          extraDescription={`Up to ${maxDistance} km`}
        />
        <RangeInput
          text="Min age"
          {...register("min_age", { valueAsNumber: true })}
          min={18}
          max={99}
          extraDescription={`${minAge}`}
        />
        <RangeInput
          text="Max age"
          {...register("max_age", { valueAsNumber: true })}
          min={18}
          max={99}
          extraDescription={`${maxAge}`}
        />
        {/* <RadioInput text="Show me" options={OPTIONS} /> */}
        <Button
          text="Apply filters"
          className="text-SecondaryDarkBgColor"
          isSubmitting={false}
          submittingText={<Spinner />}
          type="submit"
        />
      </div>
    </form>
  );
};

export default FilterPanel;
