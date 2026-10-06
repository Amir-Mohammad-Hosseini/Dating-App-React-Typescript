import { BiTargetLock } from "react-icons/bi";
import { GoLocation, GoLock, GoSearch } from "react-icons/go";
import LocationMap from "./../../components/OnboardingPage/LocationMap";
import useAppStore from "../../lib/zustand/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import locationMutation from "../../lib/tanstack-query/Onboarding/locationMutation";
import { useEffect, useState, type SubmitEventHandler } from "react";
import locationQuery from "../../lib/tanstack-query/Onboarding/locationQuery";
import Spinner from "../../components/Loader/Spinner";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import useOnboardingStep from "../../hooks/useOnboardingStep";
import { useOutletContext } from "react-router";

const YourLocation = () => {
  const { gps } = useAppStore((state) => state.onboardingDatas);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(() =>
    gps
      ? {
          longitude: gps[0],
          latitude: gps[1],
        }
      : null,
  );

  const { goNext } = useOnboardingStep();
  const { setIsSubmitting } = useOutletContext<{
    setIsSubmitting: (status: boolean) => void;
  }>();

  const { data, isLoading: isQueryLoading } = useQuery(
    locationQuery(coordinates),
  );

  const {
    mutate: locationMutate,
    isPending: isLocationMutatePending,
    error,
  } = useMutation(locationMutation(setCoordinates));
  const setField = useAppStore((state) => state.setField);

  useEffect(() => {
    setIsSubmitting(isLocationMutatePending);
  }, [isLocationMutatePending, setIsSubmitting]);

  const handleFindLocation = () => {
    locationMutate();
  };

  const handleClearLocation = () => {
    setCoordinates(null);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!coordinates || !data) {
      return;
    }

    const gpsTuple: [number, number] = [
      +coordinates.longitude.toFixed(5),
      +coordinates.latitude.toFixed(5),
    ];
    const location = `${data.city}, ${data.country}`;

    setField("gps", gpsTuple);
    setField("location", location);

    goNext();
  };

  if (isQueryLoading) {
    return <LoadingOverlay show />;
  }

  const location = data?.address;
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

          <div className="my-5 flex items-center gap-3 text-sm text-SecondaryColor">
            <span className="h-px flex-1 bg-SecondaryColor/20" />
            or
            <span className="h-px flex-1 bg-SecondaryColor/20" />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <GoSearch
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-SecondaryColor"
              />
              <input
                type="text"
                aria-label="Search your city"
                placeholder="Search your city"
                autoComplete="off"
                enterKeyHint="search"
                className="h-12 w-full rounded-xl border border-SecondaryColor/20 bg-InputBg pr-4 pl-11 text-PrimaryColor outline-none transition placeholder:text-SecondaryColor focus:border-TertiaryColor"
              />
            </div>
            <button
              type="button"
              className="h-12 rounded-xl bg-DisabledBtnBg px-6 font-PrimarySemiBoldFont text-SecondaryColor transition enabled:cursor-pointer enabled:bg-TertiaryColor enabled:text-SecondaryDarkBgColor enabled:hover:bg-HoverBtnBg"
            >
              Set
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-3 text-sm text-TertiaryColor">
              {error}
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
