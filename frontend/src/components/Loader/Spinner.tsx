type SpinnerSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<SpinnerSize, { ring: number; overlap: number; border: number }> = {
  sm: { ring: 16, overlap: 6, border: 2 },
  md: { ring: 26, overlap: 10, border: 2.5 },
  lg: { ring: 40, overlap: 15, border: 3 },
};

type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

/**
 * Two overlapping rings, spinning in opposite directions — a nod to the
 * Ember wordmark's interlocking circles. Pure Tailwind core utilities
 * (animate-spin) plus a couple of arbitrary values, no tailwind.config
 * changes needed.
 */
const Spinner = ({ size = "md", className = "" }: SpinnerProps) => {
  const { ring, overlap, border } = SIZE_MAP[size];
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
