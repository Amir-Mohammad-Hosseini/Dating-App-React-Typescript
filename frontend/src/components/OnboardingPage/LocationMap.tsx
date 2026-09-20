import { GoLocation } from "react-icons/go";

type LocationMapType = {
  // null = location not set yet, otherwise the label to show in the chip
  label: string | null;
};

const LocationMap = ({ label }: LocationMapType) => {
  const isSet = label !== null;

  return (
    <div
      role="img"
      aria-label={isSet ? `Approximate location: ${label}` : "Location not set"}
      className="relative h-42 overflow-hidden rounded-2xl border border-SecondaryColor/20 md:h-48"
    >
      {/* Blocks and streets */}
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2 bg-SecondaryColor/30">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="border-6 border-SecondaryDarkBgColor bg-SecondaryDarkBgColor"
          >
            <div className="h-full rounded-lg bg-PrimaryDarkBgColor" />
          </div>
        ))}
      </div>

      {/* River */}
      <svg
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-[#5b6b82]/40"
      >
        <path
          d="M -10 128 C 60 106, 120 142, 190 126 S 320 100, 410 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Approximate-area circle */}
      <div
        className={`absolute top-1/2 left-1/2 flex size-31 -translate-1/2 items-center justify-center rounded-full border-2 bg-TertiaryColor/25 transition-colors ${
          isSet
            ? "border-solid border-TertiaryColor"
            : "border-dashed border-TertiaryColor/70"
        }`}
      >
        {isSet ? (
          <span className="grid size-10 place-items-center rounded-full bg-TertiaryColor/30">
            <span className="size-4 rounded-full border-2 border-white bg-TertiaryColor" />
          </span>
        ) : (
          <span className="size-4 rounded-full border-2 border-dashed border-SecondaryColor bg-SecondaryDarkBgColor/80" />
        )}
      </div>

      {/* Chip */}
      <p
        className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-SecondaryColor/50 bg-SecondaryDarkBgColor px-3 py-1 text-sm ${
          isSet
            ? "font-PrimaryMediumFont text-PrimaryColor"
            : "text-SecondaryColor"
        }`}
      >
        {isSet && <GoLocation aria-hidden="true" />}
        {isSet ? label : "Location not set"}
      </p>
    </div>
  );
};

export default LocationMap;
