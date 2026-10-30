import { TextareaInput } from "../Input";
import type { ProfileBiographyType } from "./types";

const ProfileBiography = ({
  biography,
  bioLength,
  onCountBioText,
  register,
  errors,
}: ProfileBiographyType) => {
  return (
    <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="text-xl font-semibold">About you</h4>
      </div>
      <TextareaInput
        text="Bio"
        defaultValue={biography}
        {...register("biography", {
          onChange: onCountBioText,
        })}
        error={errors.biography?.message}
        extraDescription={`${bioLength}/300`}
      />
    </section>
  );
};

export default ProfileBiography;
