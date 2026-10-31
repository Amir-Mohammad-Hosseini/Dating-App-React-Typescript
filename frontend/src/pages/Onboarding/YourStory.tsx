import { TextareaInput } from "../../components/Input";
import AddInterestInput from "../../components/Input/AddInterestInput";
import CheckboxInput from "../../components/Input/CheckboxInput";

import { OnboardingLayoutHeader } from "../../components/Onboarding";

import useYourStory from "./useYourStory";

const YourStory = () => {
  const {
    interests,
    register,
    handleSubmit,
    errors,
    handleAddInterest,
    onValid,
  } = useYourStory();

  return (
    <div>
      <OnboardingLayoutHeader
        title="What are you like?"
        text="A line or two about you, then the things you’re into."
      />

      <form
        id="onboarding-form"
        className="w-full space-y-4"
        onSubmit={handleSubmit(onValid)}
      >
        <TextareaInput
          text="Bio"
          extraDescription="Optional"
          {...register("biography")}
          error={errors.biography?.message}
        />

        <CheckboxInput
          text="Interests"
          extraDescription="2 of 8"
          options={interests}
          {...register("tags")}
          error={errors.tags?.message}
        />

        <AddInterestInput onAddInterest={handleAddInterest} />
      </form>
    </div>
  );
};

export default YourStory;