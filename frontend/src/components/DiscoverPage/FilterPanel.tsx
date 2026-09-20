import RangeInput from "../Input/RangeInput";
import RadioInput from "../Input/RadioInput";
import Button from "../Button/Button";
import type FilterPanelType from "./types";

const OPTIONS = ["Everyone", "Women", "Men"];


const FilterPanel = ({ fieldsClassName = "" }: FilterPanelType) => {
  return (
    <form className="flex flex-col gap-4">
      <h3 className="font-bold font-TitleFont text-lg">Refine your stack</h3>

      <div className={`flex flex-col gap-4 ${fieldsClassName}`}>
        <RangeInput text="Distance" name="distance" min={1} max={50} defaultValue="25" extraDescription="Up to 12 km" />
        <RangeInput text="Age range" name="ageRange" min={22} max={90} defaultValue="25" extraDescription="22–31" />
        <RadioInput text="Show me" options={OPTIONS} />
        <Button text="Apply filters" className="text-SecondaryDarkBgColor" />
      </div>
    </form>
  );
};

export default FilterPanel;