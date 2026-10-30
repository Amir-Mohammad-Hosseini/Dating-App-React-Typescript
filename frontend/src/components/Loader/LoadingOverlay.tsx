import Spinner from "./Spinner";
import type LoadingOverlayType from "./types";

const LoadingOverlay = ({ show, size = "md" }: LoadingOverlayType) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-PrimaryDarkBgColor/70 backdrop-blur-sm">
      <Spinner size={size} />
    </div>
  );
};

export default LoadingOverlay;
