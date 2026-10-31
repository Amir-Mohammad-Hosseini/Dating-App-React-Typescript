import useAppStore from "../../lib/zustand/store";
import { useMutation } from "@tanstack/react-query";
import doneMutation from "../../lib/tanstack-query/Onboarding/doneMutation";
import { useNavigate, useOutletContext } from "react-router";
import useOnboardingStep from "../../hooks/Onboarding/useOnboardingStep";
import { useEffect, type SubmitEventHandler } from "react";
import { deletePhotoFromIndexedDb } from "../../lib/indexedDB/indexedDB";

const useYouAreDone = () => {
  const userFirstname = useAppStore((state) => state.user)?.firstname;
  const onboardingDatas = useAppStore((state) => state.onboardingDatas);
  const markProfileComplete = useAppStore((state) => state.markProfileComplete);
  const reset = useAppStore((state) => state.reset);
  const { goNext } = useOnboardingStep();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation(doneMutation(navigate));

  const { setIsSubmitting } = useOutletContext<{
    setIsSubmitting: (status: boolean) => void;
  }>();

  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending, setIsSubmitting]);

  const handleSubmitOnboardingDatas: SubmitEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    await mutateAsync(onboardingDatas);
    goNext();
    markProfileComplete();
    navigate("/discover");

    await deletePhotoFromIndexedDb();
    reset();
  };

  return {userFirstname , handleSubmitOnboardingDatas}
}

export default useYouAreDone