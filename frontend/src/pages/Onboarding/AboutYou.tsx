import AboutRadioInput from "../../components/Input/AboutRadioInput";
import BirthdayInput from "../../components/Input/BirthdayInput";
import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding";
import { OnboardingLayoutHeader } from "../../components/Onboarding";
import useAboutYou from "./useAboutYou";

const AboutYou = () => {
  const  {register , handleSubmit, control , errors , onValid} = useAboutYou()

  return (
    <div>
      <OnboardingLayoutHeader title="Let’s start with you." text="Just the basics, so we know who to show you." />

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
