const ToggleSwitchPrivacyProfile = ({
  label,
  description,
  defaultChecked,
  disabled,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-PrimaryColor text-sm">{label}</p>
      {description && (
        <p className="text-SecondaryColor mt-0.5 text-xs">{description}</p>
      )}
    </div>
    <label
      className={`relative inline-flex shrink-0 cursor-pointer items-center ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="bg-SecondaryColor/30 peer-checked:bg-TertiaryColor h-6 w-10 rounded-full transition-colors" />
      <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
    </label>
  </div>
);

export default ToggleSwitchPrivacyProfile