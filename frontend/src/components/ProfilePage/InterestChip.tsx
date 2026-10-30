import type InterestChipType from "./types";

const InterestChip = ({ label, onDeleteInterest }: InterestChipType) => {
  const selected = true;

  return (
    <button
      type="button"
      onClick={() => onDeleteInterest(label)}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition cursor-pointer capitalize ${
        selected
          ? "bg-TertiaryColor border-TertiaryColor text-PrimaryColor"
          : "border-SecondaryColor/30 text-SecondaryColor hover:border-SecondaryColor"
      }`}
    >
      {label}
    </button>
  );
};

export default InterestChip;
