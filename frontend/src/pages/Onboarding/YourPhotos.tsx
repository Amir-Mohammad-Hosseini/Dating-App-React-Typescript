import { FaPlus, FaTimes } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

import { OnboardingLayoutHeader } from "../../components/Onboarding";

import useYourPhotos from "./useYourPhotos";

const YourPhotos = () => {
  const {
    photos,
    handleChangeAddPhoto,
    handleClickDeletePhoto,
    handleSubmitPhotos,
  } = useYourPhotos();

  return (
    <div>
      <OnboardingLayoutHeader
        title="Show them who you are."
        text="One photo is enough to start. You can add up to five."
      />

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
                className={`rounded-xl border border-dashed border-SecondaryColor overflow-hidden ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                {photo ? (
                  <div className="relative w-full h-full">
                    <button
                      type="button"
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

                    {index === 0 && (
                      <div className="bg-SecondaryDarkBgColor rounded-full py-1 px-3 absolute bottom-2 left-2">
                        <p className="text-sm">Main photo</p>
                      </div>
                    )}
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
            Your first photo is your main photo. Every photo you add raises
            your fame rating.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourPhotos;