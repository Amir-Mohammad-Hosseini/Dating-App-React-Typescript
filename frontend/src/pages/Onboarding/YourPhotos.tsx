import { useEffect, useState, type ChangeEvent, type SubmitEventHandler } from "react";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import {
  mainPhotoMutation,
  otherPhotosMutation,
} from "../../lib/tanstack-query/Onboarding/yourPhotosMutation";
import useOnboardingStep from "../../hooks/useOnboardingStep";
import { useOutletContext } from "react-router";

type Photo = {
  file: File;
  url: string;
} | null;

const YourPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>(Array(5).fill(null));
  const { goNext } = useOnboardingStep();

  const { mutate: mainPhotoMutate, isPending: isMainPhotoPending } =
    useMutation(mainPhotoMutation());
  const { mutate: otherPhotosMutate, isPending: isOtherPhotosPending } =
    useMutation(otherPhotosMutation());

  const { setIsSubmitting } = useOutletContext<{
    setIsSubmitting: (status: boolean) => void;
  }>();

  useEffect(() => {
    setIsSubmitting(isMainPhotoPending || isOtherPhotosPending);
  }, [isMainPhotoPending, isOtherPhotosPending, setIsSubmitting]);

  const handleChangeAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const photoUrl = URL.createObjectURL(file);
    setPhotos((prevPhotos) => {
      const firstNullItemIndex = prevPhotos.findIndex((item) => item === null);
      if (firstNullItemIndex === -1) {
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
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(photoIndex, 1);
      updatedPhotos.push(null);

      return updatedPhotos;
    });
  };

  const handleSubmitPhotos: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (photos[0]) {
      mainPhotoMutate(photos[0].file);
    }

    const otherFiles = photos
      .slice(1)
      .filter((photo) => photo !== null)
      .map((photo) => photo.file);
    otherPhotosMutate(otherFiles);

    goNext();
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">
          Show them who you are.
        </h1>
        <p className="text-lg text-SecondaryColor">
          One photo is enough to start. You can add up to five.
        </p>
      </div>
      <div>
        <form
          id="onboarding-form"
          className="grid grid-cols-4 grid-rows-2 gap-3 w-full aspect-2/1"
          onSubmit={handleSubmitPhotos}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const photo = photos[index];

            return (
              <div
                key={index}
                className={`rounded-xl border border-dashed border-SecondaryColor overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                {photo ? (
                  <div className="relative w-full h-full">
                    <button
                      onClick={() => handleClickDeletePhoto(index)}
                      className="cursor-pointer absolute w-5 h-5 bg-SecondaryDarkBgColor hover:bg-TertiaryColor rounded-full flex items-center justify-center top-2 right-2"
                    >
                      <FaTimes size={12} />
                    </button>
                    <img
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 ? (
                      <div className="bg-SecondaryDarkBgColor rounded-full py-1 px-3 absolute bottom-2 left-2">
                        <p className="text-sm">Main photo</p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <label
                    htmlFor={`photo-${index + 1}`}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1.5 text-SecondaryColor hover:text-PrimaryColor"
                  >
                    <FaPlus size={20} />

                    {index === 0 && <p>Add main photo</p>}

                    <input
                      type="file"
                      accept="image/*"
                      id={`photo-${index + 1}`}
                      onChange={handleChangeAddPhoto}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            );
          })}
        </form>
        <div className="flex items-start justify-start mt-2 gap-x-1 text-SecondaryColor">
          <FaImage className="mt-1" size={18} />
          <p>
            Your first photo is your main photo. Every photo you add raises your
            fame rating.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourPhotos;
