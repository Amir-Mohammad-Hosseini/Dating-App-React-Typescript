const InterestChip = ({ label }: { label: string }) => {
  const selected = true;

  return (
    <button
      type="button"
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
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
