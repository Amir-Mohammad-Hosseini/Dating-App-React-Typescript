import { BiTargetLock } from "react-icons/bi";
import { GoLocation, GoLock } from "react-icons/go";
import LocationMap from "./../../components/OnboardingPage/LocationMap";
import Spinner from "../../components/Loader/Spinner";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import useYourLocation from "./useYourLocation";

const YourLocation = () => {
  const {
    locationData,
    isQueryLoading,
    handleFindLocation,
    handleClearLocation,
    handleSubmit,
    isLocationError,
    locationError,
    isLocationMutatePending,
  } = useYourLocation();

  if (isQueryLoading) {
    return <LoadingOverlay show />;
  }

  if (isLocationError) {
    throw new Error(locationError?.message || "An error occurred");
  }

  const location = locationData?.address;
  const label = location ? `${location?.city}, ${location?.country}` : null;

  return (
    <form id="onboarding-form" onSubmit={handleSubmit}>
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">Where are you?</h1>
        <p className="text-lg text-SecondaryColor">
          We use this to show you people close by.
        </p>
      </div>

      <LocationMap label={label} />

      {location ? (
        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-SecondaryColor/30 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-TertiaryColor/20 text-TertiaryColor">
            <GoLocation className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-PrimarySemiBoldFont">{label}</p>
            <p className="text-sm text-SecondaryColor">Approximate location</p>
          </div>
          <button
            onClick={handleClearLocation}
            type="button"
            className="cursor-pointer font-PrimarySemiBoldFont text-TertiaryColor transition hover:text-HoverBtnBg"
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleFindLocation}
            disabled={isLocationMutatePending}
            type="button"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-SecondaryColor/30 bg-SecondaryColor/20 py-4 font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLocationMutatePending ? (
              <Spinner />
            ) : (
              <>
                <BiTargetLock aria-hidden="true" />
                Use my current location
              </>
            )}
          </button>

          {locationError && (
            <p role="alert" className="mt-3 text-sm text-TertiaryColor">
              {locationError}
            </p>
          )}
        </>
      )}

      <p className="mt-4 flex items-start gap-2 text-sm text-SecondaryColor">
        <GoLock aria-hidden="true" className="mt-0.5 shrink-0" />
        People see how far away you are, never your exact spot.
      </p>
    </form>
  );
};

export default YourLocation;
