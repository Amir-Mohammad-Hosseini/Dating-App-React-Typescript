import AboutRadioInput from "../../components/Input/AboutRadioInput";
import BirthdayInput from "../../components/Input/BirthdayInput";
import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding";
import { useForm } from "react-hook-form";
import type { AboutYouFormType } from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import aboutYouSchema from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import useAppStore from "../../lib/zustand/store";
import useOnboardingStep from "../../hooks/useOnboardingStep";

const AboutYou = () => {
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

  return (
    <div>
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">Let’s start with you.</h1>
        <p className="text-lg text-SecondaryColor">
          Just the basics, so we know who to show you.
        </p>
      </div>

      <form
        id="onboarding-form"
        onSubmit={handleSubmit(onValid)}
        className="w-full space-y-6"
      >
        <AboutRadioInput
          text="I am"
          options={GENDERS}
          {...register("gender")}
          error={errors.gender?.message}
        />
        <AboutRadioInput
          text="Interested in"
          options={INTERESTED_IN}
          {...register("sexual_pref")}
          error={errors.sexual_pref?.message}
        />
        <BirthdayInput
          name="age"
          control={control}
          error={errors.age?.message}
        />
      </form>
    </div>
  );
};

export default AboutYou;
