import Spinner from "./Spinner";
import type { PageLoaderType } from "./types";

const PageLoader = ({ label = "Finding your people…" }: PageLoaderType) => {
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
