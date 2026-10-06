import { useState } from "react";
import AddInterestInput from "../../components/Input/AddInterestInput";
import CheckboxInput from "../../components/Input/CheckboxInput";
import TextareaInput from "../../components/Input/TextareaInput";
import useAppStore from "../../lib/zustand/store";
import { DEFAULT_INTERESTS } from "../../utils/constants/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import yourStorySchema, {
  type YourStoryFormType,
} from "../../lib/zod/Onboarding/extendSchemas/yourStorySchema";
import useOnboardingStep from "../../hooks/useOnboardingStep";

const YourStory = () => {
  const {biography , tags} = useAppStore((state) => state.onboardingDatas);
  const setField = useAppStore((state) => state.setField);

  const [interests, setInterests] = useState(tags.length ? tags : DEFAULT_INTERESTS);

  const {goNext} = useOnboardingStep()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YourStoryFormType>({
    resolver: zodResolver(yourStorySchema),
    defaultValues: {
      biography,
      tags,
    },
  });

  const handleAddInterest = (interest: string) => {
    setInterests((prevInterests) => [...prevInterests, interest]);
  };

  const onValid = (yourStoryObj: YourStoryFormType) => {
    Object.keys(yourStoryObj).forEach((key) => {
      const typedKey = key as keyof YourStoryFormType;

      setField(typedKey, yourStoryObj[typedKey]);
    });
    goNext()
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="font-ItalicFont text-3xl mb-1">What are you like?</h1>
        <p className="text-SecondaryColor text-lg">
          A line or two about you, then the things you’re into.
        </p>
      </div>
      <form id="onboarding-form" className="w-full space-y-4" onSubmit={handleSubmit(onValid)}>
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
