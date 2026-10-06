import { GoCheck } from "react-icons/go";
import useAppStore from "../../lib/zustand/store";
import { useMutation } from "@tanstack/react-query";
import doneMutation from "../../lib/tanstack-query/Onboarding/doneMutation";
import { useNavigate, useOutletContext } from "react-router";
import useOnboardingStep from "../../hooks/useOnboardingStep";
import { useEffect, type SubmitEventHandler } from "react";
import { deletePhotoFromIndexedDb } from "../../lib/indexedDB/indexedDB";
const YouAreDone = () => {
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
  return (
    <form id="onboarding-form" onSubmit={handleSubmitOnboardingDatas}>
      <div className="mx-auto mt-12 relative flex items-center justify-center">
        <span className="w-30 h-30 rounded-full absolute bg-TertiaryColor/10"></span>
        <span className="w-26 h-26 rounded-full absolute bg-TertiaryColor/30"></span>
        <span className="relative flex items-center justify-center w-22 h-22 bg-TertiaryColor rounded-full">
          <GoCheck size={26} className="-mb-1" />
        </span>
      </div>
      <div className="my-8 text-center">
        <h1 className="mb-1.5 font-ItalicFont text-3xl">
          You’re in, {userFirstname}.
        </h1>
        <p className="text-lg text-SecondaryColor">
          Your profile is live and matching starts now. You can change anything
          later from your profile.
        </p>
      </div>
    </form>
  );
};

export default YouAreDone;
