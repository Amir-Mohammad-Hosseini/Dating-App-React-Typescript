import Spinner from "./Spinner";

type PageLoaderProps = {
  label?: string;
};

/**
 * Full-screen loading state. Good fits:
 *  - a Suspense/router fallback while a route chunk loads
 *  - gating the app tree until the persisted zustand store has rehydrated
 *  - any other "nothing to show yet" moment
 */
const PageLoader = ({ label = "Finding your people…" }: PageLoaderProps) => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-PrimaryDarkBgColor">
      <Spinner size="lg" />
      <div className="text-center">
        <p className="font-ItalicFont text-2xl">Ember</p>
        <p className="mt-1 text-sm text-SecondaryColor">{label}</p>
      </div>
    </div>
  );
};

export default PageLoader;
