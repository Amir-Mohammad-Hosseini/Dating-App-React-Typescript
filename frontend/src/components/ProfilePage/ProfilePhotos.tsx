import { FaPlus, FaTimes } from "react-icons/fa";
import type { ProfilePhotosType } from "./types";

const ProfilePhotos = ({
  photosNumber,
  photos,
  onDeletePhoto,
  onAddPhoto,
}: ProfilePhotosType) => {
  return (
    <section className="mx-6 my-10">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Photos</h5>
        <p className="text-SecondaryColor">{photosNumber} of 5 added</p>
      </div>
      <div className="my-4 grid w-full grid-cols-3 gap-6">
        {photos.map((photo, index) =>
          photo ? (
            <div
              key={photo.kind === "existing" ? photo.id : photo.tempId}
              className="relative aspect-square justify-self-center overflow-hidden rounded-2xl"
            >
              <button
                type="button"
                onClick={() => onDeletePhoto(index)}
                className="cursor-pointer bg-PrimaryDarkBgColor/70 absolute top-1 right-1 lg:top-2 lg:right-2 flex size-6 lg:size-8 items-center justify-center rounded-full"
              >
                <FaTimes className="size-3 lg:size-4" />
              </button>
              <img
                className="h-full w-full object-cover object-top"
                src={photo.url}
              />
              {index === 0 && (
                <span className="bg-TertiaryColor text-PrimaryColor absolute bottom-1.5 left-1 rounded-full py-0.5 px-1.5 lg:py-2 lg:px-4 text-xs">
                  Main
                </span>
              )}
            </div>
          ) : (
            <label
              key={index}
              htmlFor={`photo-${index + 1}`}
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1.5 text-SecondaryColor hover:text-PrimaryColor border-SecondaryColor hover:border-PrimaryColor aspect-square justify-self-center rounded-2xl border border-dashed transition"
            >
              <FaPlus size={20} />

              {index === 0 && <p>Add main photo</p>}

              <input
                type="file"
                accept="image/*"
                id={`photo-${index + 1}`}
                onChange={onAddPhoto}
                className="sr-only"
              />
            </label>
          ),
        )}
      </div>
      <p className="text-SecondaryColor text-xs">
        Drag to reorder. Your first photo is the one people see before they open
        your profile.
      </p>
    </section>
  );
};

export default ProfilePhotos;
