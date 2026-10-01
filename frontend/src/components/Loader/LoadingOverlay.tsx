import Spinner from "./Spinner";

type LoadingOverlayProps = {
  show: boolean;
  size?: "sm" | "md" | "lg";
};

/**
 * Drop inside any `relative` container that needs a "refreshing" state
 * without unmounting its content — e.g. the Discover stack while the next
 * batch loads, or a Messages list mid-refetch.
 *
 * Usage: <div className="relative"> ... <LoadingOverlay show={isFetching} /> </div>
 */
const LoadingOverlay = ({ show, size = "md" }: LoadingOverlayProps) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-PrimaryDarkBgColor/70 backdrop-blur-sm">
      <Spinner size={size} />
    </div>
  );
};

export default LoadingOverlay;
