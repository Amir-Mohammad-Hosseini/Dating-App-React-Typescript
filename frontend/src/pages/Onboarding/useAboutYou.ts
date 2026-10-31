import { useForm } from "react-hook-form";
import type { AboutYouFormType } from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import aboutYouSchema from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import useAppStore from "../../lib/zustand/store";
import useOnboardingStep from "../../hooks/Onboarding/useOnboardingStep";

const useAboutYou = () => {
  const { gender, sexual_pref } = useAppStore((state) => state.onboardingDatas);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AboutYouFormType>({
    resolver: zodResolver(aboutYouSchema),
    defaultValues: {
      gender,
      sexual_pref,
    },
  });

  const { goNext } = useOnboardingStep();
  const setField = useAppStore((state) => state.setField);

  const onValid = (aboutYouObj: AboutYouFormType) => {
    Object.keys(aboutYouObj).forEach((key) => {
      const typedKey = key as keyof AboutYouFormType;

      setField(typedKey, aboutYouObj[typedKey]);
    });

    goNext();
  };

  return {register , handleSubmit, control , errors , onValid}
}

export default useAboutYou