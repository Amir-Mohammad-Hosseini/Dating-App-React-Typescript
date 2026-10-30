import SPINNER_SIZE_MAP from "../../utils/constants/spinner";
import type { SpinnerType } from "./types";

const Spinner = ({ size = "md", className = "" }: SpinnerType) => {
  const { ring, overlap, border } = SPINNER_SIZE_MAP[size];
  const boxWidth = ring * 2 - overlap;

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: boxWidth, height: ring }}
    >
      <span
        className="absolute top-0 left-0 animate-spin rounded-full border-PrimaryColor border-t-transparent"
        style={{ width: ring, height: ring, borderWidth: border }}
      />
      <span
        className="absolute top-0 right-0 animate-spin rounded-full border-TertiaryColor border-t-transparent [animation-direction:reverse] [animation-duration:1.1s]"
        style={{ width: ring, height: ring, borderWidth: border }}
      />
      <span className="sr-only">Loading…</span>
    </span>
  );
};

export default Spinner;
