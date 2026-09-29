import AboutRadioInput from "../../components/Input/AboutRadioInput";
import BirthdayInput from "../../components/Input/BirthdayInput";
import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding";
import { useForm } from "react-hook-form";
import type { AboutYouFormType } from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import aboutYouSchema from "../../lib/zod/Onboarding/extendSchemas/aboutYouSchema";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import useAppStore from "../../lib/zustand/store";

const AboutYou = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AboutYouFormType>({
    resolver: zodResolver(aboutYouSchema),
  });

  const navigate = useNavigate();
  const step = useAppStore((state) => state.step);
  const setStep = useAppStore((state) => state.setStep);
  const setField = useAppStore((state) => state.setField);

  const onValid = (aboutYouObj: AboutYouFormType) => {
    Object.keys(aboutYouObj).forEach((key) => {
      const typedKey = key as keyof AboutYouFormType;

      setField(typedKey, aboutYouObj[typedKey]);
    });

    navigate("/onboarding/yourStory");
    setStep(step + 1);
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">Let’s start with you.</h1>
        <p className="text-lg text-SecondaryColor">
          Just the basics, so we know who to show you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onValid)} className="w-full space-y-6">
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

        <div className="flex-1">
          <Button
            text="Continue"
            type="submit"
            className="my-0! rounded-xl font-bold shadow-lg shadow-TertiaryColor/30"
            submittingText="Submitting..."
            isSubmitting={false}
          />
        </div>
      </form>
    </div>
  );
};

export default AboutYou;
