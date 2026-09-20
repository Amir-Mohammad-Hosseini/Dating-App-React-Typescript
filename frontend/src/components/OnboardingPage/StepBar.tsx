const TOTAL = 4;

const StepBar = ({ step }: { step: number }) => (
  <div
    className="flex flex-1 items-center gap-2"
    role="progressbar"
    aria-valuemin={1}
    aria-valuemax={TOTAL}
    aria-valuenow={step}
  >
    {Array.from({ length: TOTAL }, (_, i) => (
      <span
        key={i}
        className={`h-1 flex-1 rounded-full transition-colors ${
          i < step ? "bg-TertiaryColor" : "bg-DisabledBtnBg"
        }`}
      />
    ))}
  </div>
);

export default StepBar