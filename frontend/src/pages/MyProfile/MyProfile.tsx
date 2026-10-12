import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Navbar from "../../components/Navbar/Navbar";
import Input from "../../components/Input/Input";
import { Link } from "react-router";
import { GENDERS } from "../../utils/constants/onboarding";
import SelectInput from "../../components/Input/SelectInput";
import TextareaInput from "../../components/Input/TextareaInput";
import PrivacyProfileWrapper from "./PrivacyProfileWrapper";
import { useQuery } from "@tanstack/react-query";
import myProfileQuery from "../../lib/tanstack-query/GetMe/myProfileQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import locationQuery from "../../lib/tanstack-query/Onboarding/locationQuery";
import InterestChip from "../../components/ProfilePage/InterestChip";
import AddInterestInput from "../../components/Input/AddInterestInput";
import { useEffect, useState, type ChangeEvent } from "react";

const MyProfile = () => {
  const { data: myProfileDatas, isPending: isMyPrifileDatasQueryPending } =
    useQuery(myProfileQuery());

  const longitude = myProfileDatas?.ip_location?.x;
  const latitude = myProfileDatas?.ip_location?.y;

  const { data: myLocationDatas, isPending: isMyLocationDatasQueryPending } =
    useQuery(
      locationQuery({
        longitude: longitude ?? 0,
        latitude: latitude ?? 0,
      }),
    );
  const [myInterests, setMyInterests] = useState<string[]>([]);

  useEffect(() => {
    if (myProfileDatas?.tags) {
      setMyInterests(myProfileDatas?.tags);
    }
  }, [myProfileDatas?.tags]);

  if (isMyPrifileDatasQueryPending) {
    return <LoadingOverlay show />;
  }
  if (isMyLocationDatasQueryPending) {
    return <LoadingOverlay show />;
  }

  const {
    firstname,
    lastname,
    gender,
    biography,
    profile_pic,
    other_pictures,
  } = myProfileDatas;

  const { address } = myLocationDatas;

  const myPhotos = [profile_pic, ...other_pictures];

  const allPhotosArray = Array.from(
    { length: 6 },
    (_, index) => myPhotos[index] ?? null,
  );

  const handleChangeAddPhoto = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if(!file || !file.type.startsWith("image/")){
      return
    }
  }

  const handleAddInterest = (interest: string) => {
    setMyInterests((prevInterests) => [...prevInterests, interest]);
  };

  const handleDeleteInterest = (deletedInterest: string) => {
    setMyInterests((prevInterests) =>
      [...prevInterests].filter((interest) => interest !== deletedInterest),
    );
  };

  return (
    <div className="relative md:flex md:overflow-x-hidden">
      <Navbar />
      <div className="w-full pb-24 md:pb-10">
        <div className="m-6 h-12">
          <div className="flex items-center justify-between">
            <h1 className="font-TitleFont text-3xl">Edit profile</h1>
            <button className="bg-TertiaryColor rounded-full px-4 py-1">
              Save changes
            </button>
          </div>
        </div>
        <div className="bg-SecondaryColor/40 absolute h-px w-dvw"></div>
        <section className="mx-6 my-10">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">Photos</h5>
            <p className="text-SecondaryColor">{myPhotos.length} of 6 added</p>
          </div>
          <div className="my-4 grid w-full grid-cols-3 gap-6">
            {allPhotosArray.map((photo, index) =>
              photo ? (
                <div
                  key={photo.picture_data}
                  className="relative aspect-square justify-self-center overflow-hidden rounded-2xl"
                >
                  <button className="cursor-pointer bg-PrimaryDarkBgColor/70 absolute top-1 right-1 lg:top-2 lg:right-2 flex size-6 lg:size-8 items-center justify-center rounded-full">
                    <FaTimes className="size-3 lg:size-4" />
                  </button>
                  <img
                    className="h-full w-full object-cover object-top"
                    src={photo.picture_data}
                  />
                  {photo.profile_pic === "YES" && (
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
                    onChange={handleChangeAddPhoto}
                    className="sr-only"
                  />
                </label>
              ),
            )}
          </div>
          <p className="text-SecondaryColor text-xs">
            Drag to reorder. Your first photo is the one people see before they
            open your profile.
          </p>
        </section>

        {/* Basic info */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <h4 className="mb-4 text-xl font-semibold">Basic info</h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              text="First name"
              name="firstName"
              type="text"
              isForgotPassword={false}
              placeholder=""
              defaultvalue={firstname}
            />
            <Input
              text="Last name"
              name="lastName"
              type="text"
              isForgotPassword={false}
              placeholder=""
              defaultvalue={lastname}
            />
          </div>

          <div className="mt-4">
            {/* <BirthdayInput name="birthday" error="birdhday is invalid"/> */}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectInput
              text="Gender"
              name="gender"
              options={GENDERS}
              defaultValue={gender}
            />
            <Input
              text="Location"
              name="location"
              type="text"
              isForgotPassword={false}
              placeholder="Warsaw, Poland"
              defaultvalue={`${address.city}, ${address.country}`}
            />
          </div>
        </section>

        {/* About you */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-xl font-semibold">About you</h4>
            <span className="text-SecondaryColor text-xs">
              {/* {bio.length}/300 */}
            </span>
          </div>
          <TextareaInput text="Bio" name="bio" defaultValue={biography} />
        </section>

        {/* Interests */}
        <section className="mx-6 mt-6">
          <h4 className="mb-3 text-xl font-semibold">Interests</h4>
          <div className="grid grid-cols-2 items-start">
            {myInterests.length ? (
              <div className="flex flex-wrap gap-2">
                {myInterests.map((interest: any) => (
                  <InterestChip
                    key={interest}
                    label={interest}
                    onDeleteInterest={handleDeleteInterest}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-SecondaryColor">There is no interest</p>
            )}
            <AddInterestInput onAddInterest={handleAddInterest} />
          </div>
        </section>

        {/* Privacy */}
        <PrivacyProfileWrapper />

        {/* Account */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <h4 className="mb-3 text-xl font-semibold">Account</h4>
          <div className="flex flex-col">
            <Link
              to="/settings"
              className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5"
            >
              <IoMdSettings />
              Settings
            </Link>
            <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
              Change password
            </button>
            <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
              Blocked accounts
            </button>
            <button className="text-TertiaryColor py-2 text-left text-sm transition cursor-pointer">
              Log out
            </button>
            <button className="text-SecondaryColor py-2 text-left text-sm transition hover:text-red-400 cursor-pointer">
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
