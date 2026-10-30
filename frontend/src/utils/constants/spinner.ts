import type { SpinnerSize } from "../../components/Loader/types";

const SPINNER_SIZE_MAP: Record<SpinnerSize, { ring: number; overlap: number; border: number }> = {
  sm: { ring: 16, overlap: 6, border: 2 },
  md: { ring: 26, overlap: 10, border: 2.5 },
  lg: { ring: 40, overlap: 15, border: 3 },
};

export default  SPINNER_SIZE_MAP