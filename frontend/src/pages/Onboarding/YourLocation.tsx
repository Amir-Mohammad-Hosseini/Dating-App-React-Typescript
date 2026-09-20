import { useEffect, useState, type SubmitEventHandler } from "react";
import { useOutletContext } from "react-router";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation, GoLock, GoSearch } from "react-icons/go";
import LocationMap from "./../../components/OnboardingPage/LocationMap";
import {
  reverseGeocode,
  searchCity,
  type Location,
} from "./../../services/api/geocoding";

type OnboardingContext = { setCanContinue: (value: boolean) => void };

const YourLocation = () => {
  const { setCanContinue } = useOutletContext<OnboardingContext>();

  const [location, setLocation] = useState<Location | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // The layout's Continue button stays disabled until a location is set
  useEffect(() => {
    setCanContinue(location !== null);
    return () => setCanContinue(true);
  }, [location, setCanContinue]);

  const label = location ? `${location.city}, ${location.country}` : null;

  const handleUseCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("This browser can't share your location. Search for your city instead.");
      return;
    }

    setError(null);
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const found = await reverseGeocode(coords.latitude, coords.longitude);
          if (found) setLocation(found);
          else setError("We couldn't work out your city. Search for it instead.");
        } catch {
          setError("We couldn't look up your city. Check your connection or search for it.");
        } finally {
          setIsLoading(false);
        }
      },
      (geoError) => {
        setIsLoading(false);
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? "Location access is blocked. Allow it in your browser settings, or search for your city."
            : "We couldn't get your location. Try again or search for your city.",
        );
      },
      { timeout: 10000 },
    );
  };

  const handleSearch: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setError(null);
    setIsLoading(true);

    try {
      const found = await searchCity(trimmed);
      if (found) setLocation(found);
      else setError(`No city found for “${trimmed}”. Check the spelling or try a larger nearby city.`);
    } catch {
      setError("Search isn't working right now. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = () => {
    setLocation(null);
    setQuery("");
    setError(null);
  };

  return (
    <div>
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
            type="button"
            onClick={handleChange}
            className="cursor-pointer font-PrimarySemiBoldFont text-TertiaryColor transition hover:text-HoverBtnBg"
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-SecondaryColor/30 bg-SecondaryColor/20 py-4 font-PrimarySemiBoldFont text-PrimaryColor transition hover:border-PrimaryColor/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <BiTargetLock aria-hidden="true" />
            {isLoading ? "Finding you…" : "Use my current location"}
          </button>

          <div className="my-5 flex items-center gap-3 text-sm text-SecondaryColor">
            <span className="h-px flex-1 bg-SecondaryColor/20" />
            or
            <span className="h-px flex-1 bg-SecondaryColor/20" />
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <GoSearch
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-SecondaryColor"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search your city"
                placeholder="Search your city"
                autoComplete="off"
                enterKeyHint="search"
                className="h-12 w-full rounded-xl border border-SecondaryColor/20 bg-InputBg pr-4 pl-11 text-PrimaryColor outline-none transition placeholder:text-SecondaryColor focus:border-TertiaryColor"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="h-12 rounded-xl bg-DisabledBtnBg px-6 font-PrimarySemiBoldFont text-SecondaryColor transition enabled:cursor-pointer enabled:bg-TertiaryColor enabled:text-SecondaryDarkBgColor enabled:hover:bg-HoverBtnBg"
            >
              Set
            </button>
          </form>

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
    </div>
  );
};

export default YourLocation;
