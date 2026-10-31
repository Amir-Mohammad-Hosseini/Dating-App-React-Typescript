import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAppStore from "../../lib/zustand/store";

import { DEFAULT_INTERESTS } from "../../utils/constants/onboarding";

import yourStorySchema, {
  type YourStoryFormType,
} from "../../lib/zod/Onboarding/extendSchemas/yourStorySchema";

import useOnboardingStep from "../../hooks/Onboarding/useOnboardingStep";

const useYourStory = () => {
  const { biography, tags } = useAppStore(
    (state) => state.onboardingDatas,
  );

  const setField = useAppStore((state) => state.setField);

  const [interests, setInterests] = useState(
    tags.length ? tags : DEFAULT_INTERESTS,
  );

  const { goNext } = useOnboardingStep();

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

    goNext();
  };

  return {
    interests,
    register,
    handleSubmit,
    errors,
    handleAddInterest,
    onValid,
  };
};

export default useYourStory;