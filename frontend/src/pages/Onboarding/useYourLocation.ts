import useAppStore from "../../lib/zustand/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import locationMutation from "../../lib/tanstack-query/Onboarding/locationMutation";
import { useEffect, useState, type SubmitEventHandler } from "react";
import locationQuery from "../../lib/tanstack-query/Onboarding/locationQuery";
import useOnboardingStep from "../../hooks/Onboarding/useOnboardingStep";
import { useOutletContext } from "react-router";

const useYourLocation = () => {
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

  const { data : locationData, isLoading: isQueryLoading } = useQuery(
    locationQuery(coordinates),
  );

  const {
    mutate: locationMutate,
    isPending: isLocationMutatePending,
    isError : isLocationError,
    error : locationError,
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
    if (!coordinates || !locationData) {
      return;
    }

    const gpsTuple: [number, number] = [
      +coordinates.longitude.toFixed(5),
      +coordinates.latitude.toFixed(5),
    ];
    const location = `${locationData.city}, ${locationData.country}`;

    setField("gps", gpsTuple);
    setField("location", location);

    goNext();
  };

  return {locationData,isQueryLoading , handleFindLocation , handleClearLocation , handleSubmit , isLocationError , locationError , isLocationMutatePending}
}

export default useYourLocation