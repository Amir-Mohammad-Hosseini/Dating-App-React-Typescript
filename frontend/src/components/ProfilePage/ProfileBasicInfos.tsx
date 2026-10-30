import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding";
import { BirthdayInput, Input, SelectInput } from "../Input";
import type { ProfileBasicInfosType } from "./types";

const ProfileBasicInfos = ({
  basicInfos,
  address,
  register,
  control,
  errors,
}: ProfileBasicInfosType) => {
  const { firstname, lastname, gender, sexual_pref } = basicInfos;
  return (
    <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
      <h4 className="mb-4 text-xl font-semibold">Basic info</h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          text="First name"
          type="text"
          isForgotPassword={false}
          placeholder=""
          defaultvalue={firstname}
          {...register("firstname")}
          error={errors.firstname?.message}
        />
        <Input
          text="Last name"
          type="text"
          isForgotPassword={false}
          placeholder=""
          defaultvalue={lastname}
          {...register("lastname")}
          error={errors.lastname?.message}
        />
      </div>

      <div className="mt-4">
        <BirthdayInput
          error={errors.age?.message}
          name="age"
          control={control}
        />
        <SelectInput
          text="Gender"
          options={GENDERS}
          defaultValue={gender}
          {...register("gender")}
          error={errors.gender?.message}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectInput
          text="Sexual Pref"
          options={INTERESTED_IN}
          defaultValue={sexual_pref}
          {...register("sexual_pref")}
          error={errors.sexual_pref?.message}
        />
        <Input
          text="Location"
          type="text"
          isForgotPassword={false}
          placeholder="Warsaw, Poland"
          defaultvalue={
            address
              ? `${address.city ?? ""}, ${address.country ?? ""}`
              : (basicInfos.user_location ?? "")
          }
          {...register("location")}
          error={errors.location?.message}
        />
      </div>
    </section>
  );
};

export default ProfileBasicInfos;
