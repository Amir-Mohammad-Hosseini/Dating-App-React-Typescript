import {
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEventHandler,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import { toast } from "sonner";

import {
  mainPhotoMutation,
  otherPhotosMutation,
} from "../../lib/tanstack-query/Onboarding/yourPhotosMutation";

import useOnboardingStep from "../../hooks/Onboarding/useOnboardingStep";

import { savePhotoIntoIndexedDb } from "../../lib/indexedDB/indexedDB";

import queryClient from "../../lib/tanstack-query/queryClient";

export type Photo = {
  file: File;
  url: string;
} | null;

const useYourPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>(Array(5).fill(null));

  const { goNext } = useOnboardingStep();

  const {
    mutateAsync: mainPhotoMutateAsync,
    isPending: isMainPhotoPending,
  } = useMutation(mainPhotoMutation());

  const {
    mutateAsync: otherPhotosMutateAsync,
    isPending: isOtherPhotosPending,
  } = useMutation(otherPhotosMutation());

  const { setIsSubmitting } = useOutletContext<{
    setIsSubmitting: (status: boolean) => void;
  }>();

  useEffect(() => {
    setIsSubmitting(isMainPhotoPending || isOtherPhotosPending);
  }, [isMainPhotoPending, isOtherPhotosPending, setIsSubmitting]);

  const handleChangeAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    // Allow selecting the same file again.
    input.value = "";

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const photoUrl = URL.createObjectURL(file);

    setPhotos((prevPhotos) => {
      const firstNullItemIndex = prevPhotos.findIndex(
        (item) => item === null,
      );

      if (firstNullItemIndex === -1) {
        URL.revokeObjectURL(photoUrl);
        return prevPhotos;
      }

      const updatedPhotos = [...prevPhotos];

      updatedPhotos[firstNullItemIndex] = {
        file,
        url: photoUrl,
      };

      return updatedPhotos;
    });
  };

  const handleClickDeletePhoto = (photoIndex: number) => {
    const selectedPhoto = photos[photoIndex];

    if (selectedPhoto) {
      URL.revokeObjectURL(selectedPhoto.url);
    }

    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];

      updatedPhotos.splice(photoIndex, 1);
      updatedPhotos.push(null);

      return updatedPhotos;
    });
  };

  const handleSubmitPhotos: SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    const mainPhoto = photos[0];

    if (!mainPhoto) {
      toast.error("Please add a main photo.");
      return;
    }

    const otherFiles = photos
      .slice(1)
      .filter((photo) => photo !== null)
      .map((photo) => photo.file);

    try {
      // Upload the main photo first.
      await mainPhotoMutateAsync(mainPhoto.file);

      // Upload other photos only when there are any.
      if (otherFiles.length > 0) {
        await otherPhotosMutateAsync(otherFiles);
      }

      await savePhotoIntoIndexedDb(mainPhoto.file);

      await queryClient.invalidateQueries({
        queryKey: ["onboarding-photo"],
      });

      goNext();

      photos.forEach((photo) => {
        if (photo) {
          URL.revokeObjectURL(photo.url);
        }
      });
    } catch {
      toast.error("Could not upload your photos. Please try again.");
    }
  };

  return {
    photos,
    handleChangeAddPhoto,
    handleClickDeletePhoto,
    handleSubmitPhotos,
  };
};

export default useYourPhotos;