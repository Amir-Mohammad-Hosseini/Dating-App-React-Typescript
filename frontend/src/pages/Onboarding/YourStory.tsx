import { useState } from "react";
import Button from "../../components/Button/Button";
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
import { useNavigate } from "react-router";

const YourStory = () => {
  const [interests, setInterests] = useState(DEFAULT_INTERESTS);

  const step = useAppStore((state) => state.step);
  const setStep = useAppStore((state) => state.setStep);
  const setField = useAppStore((state) => state.setField);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YourStoryFormType>({
    resolver: zodResolver(yourStorySchema),
    defaultValues: {
      biography: "",
      tags: [],
    },
  });

  const handleAddInterest = (interest: string) => {
    setInterests((prevInterests) => [...prevInterests, interest]);
  };

  const handleGoPrevPage = () => {
    setStep(step - 1);
  };

  const onValid = (yourStoryObj: YourStoryFormType) => {
    Object.keys(yourStoryObj).forEach((key) => {
      const typedKey = key as keyof YourStoryFormType;

      setField(typedKey, yourStoryObj[typedKey]);
    });
    navigate("/onboarding/yourLocation");
    setStep(step + 1);
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="font-ItalicFont text-3xl mb-1">What are you like?</h1>
        <p className="text-SecondaryColor text-lg">
          A line or two about you, then the things you’re into.
        </p>
      </div>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onValid)}>
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

        <div className="mx-auto flex w-full gap-3 lg:max-w-100">
          <button
            type="button"
            onClick={handleGoPrevPage}
            className="hidden rounded-xl border border-SecondaryColor/30 px-6 font-bold transition hover:border-PrimaryColor md:block"
          >
            Back
          </button>

          <div className="flex-1">
            <Button
              text="Continue"
              type="submit"
              className="my-0! rounded-xl font-bold shadow-lg shadow-TertiaryColor/30"
              submittingText="Submitting..."
              isSubmitting={false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default YourStory;
