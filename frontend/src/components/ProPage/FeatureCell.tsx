import { GoCheck } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import type FeatureCellType from "./types";

const FeatureCell = ({ value }: FeatureCellType) => {
  if (typeof value === "string") {
    return <span className="text-sm text-SecondaryColor">{value}</span>;
  }
  return value ? (
    <span className="mx-auto flex size-5 items-center justify-center rounded-full bg-TertiaryColor/15 text-TertiaryColor">
      <GoCheck className="size-3" aria-label="Included" />
    </span>
  ) : (
    <IoClose
      className="mx-auto size-4 text-SecondaryColor/50"
      aria-label="Not included"
    />
  );
};

export default FeatureCell