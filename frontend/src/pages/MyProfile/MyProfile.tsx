import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import Input from "../../components/Input/Input";
import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding";
import SelectInput from "../../components/Input/SelectInput";
import TextareaInput from "../../components/Input/TextareaInput";
import PrivacyProfileWrapper from "./PrivacyProfileWrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import myProfileQuery from "../../lib/tanstack-query/GetMe/myProfileQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import locationQuery from "../../lib/tanstack-query/Onboarding/locationQuery";
import InterestChip from "../../components/ProfilePage/InterestChip";
import AddInterestInput from "../../components/Input/AddInterestInput";
import { useEffect, useState, type ChangeEvent } from "react";
import AccountActions from "../../components/ProfilePage/AccountActions";
import { createPhotosArray, MAX_PHOTOS } from "../../utils/constants/myProfile";
import { useForm } from "react-hook-form";
import BirthdayInput from "../../components/Input/BirthdayInput";
import type {
  MyProfileFormType,
  myProfileSchemaType,
} from "../../lib/zod/MyProfile/myProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import myProfileSchema from "../../lib/zod/MyProfile/myProfileSchema";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Loader/Spinner";
import {
  myProfileFormMutation,
  myProfilePhotosMutation,
} from "../../lib/tanstack-query/MyProfile/myProfileMutation";
import queryClient from "../../lib/tanstack-query/queryClient";
import { toast } from "sonner";
import createFormDataFromPhotos from "./../../utils/myProfileUtils"

export type PhotoItem =
  | { kind: "existing"; id: number; url: string }
  | { kind: "new"; tempId: string; file: File; url: string };

export type PhotoSlot = PhotoItem | null;

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<myProfileSchemaType>({
    resolver: zodResolver(myProfileSchema),
  });

  const { data: myProfileDatas, isPending: isMyProfileDatasQueryPending } =
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
  const [myPhotos, setMyPhotos] = useState<PhotoSlot[]>(
    Array(MAX_PHOTOS).fill(null),
  );

  const {
    mutateAsync: myProfilePhotosMutate,
    isPending: isMyProfilePhotosMutatePending,
  } = useMutation(myProfilePhotosMutation());
  const {
    mutateAsync: myProfileFormMutate,
    isPending: isMyProfileFormMutatePending,
  } = useMutation(myProfileFormMutation());

  useEffect(() => {
    if (myProfileDatas) {
      setMyInterests(myProfileDatas?.tags);
      const serverPhotos = [
        myProfileDatas.profile_pic,
        ...(myProfileDatas.other_pictures ?? []),
      ]
        .filter((photo) => photo?.picture_data)
        .map((photo) => ({
          kind: "existing" as const,
          id: photo.picture_id,
          url: photo.picture_data,
        }));

      setMyPhotos(createPhotosArray(serverPhotos));
    }
  }, [myProfileDatas]);

  const isMyProfileQueryPending =
    isMyProfileDatasQueryPending || isMyLocationDatasQueryPending;

  const isMyProfileMutatePending =
    isMyProfilePhotosMutatePending || isMyProfileFormMutatePending;

  if (isMyProfileQueryPending) {
    return <LoadingOverlay show />;
  }

  const { firstname, lastname, gender, biography, sexual_pref } =
    myProfileDatas;

  const { address } = myLocationDatas;

  const onValid = async (data: myProfileSchemaType) => {
    const updatedMyPrfileForm: MyProfileFormType = {
      ...data,
      tags: myInterests,
      username: myProfileDatas.username,
      email: myProfileDatas.email,
      gps_lon: myProfileDatas.ip_location.x,
      gps_lat: myProfileDatas.ip_location.y,
    };

    const photosFormData = createFormDataFromPhotos(myPhotos);

    try {
      const [profileFormResult, profilePhotosResult] = await Promise.allSettled(
        [
          myProfileFormMutate(updatedMyPrfileForm),
          myProfilePhotosMutate(photosFormData),
        ],
      );

      const isProfileFormResultSuccess =
        profileFormResult.status === "fulfilled";
      const isProfilePhotosResultSuccess =
        profilePhotosResult.status === "fulfilled";

      if (isProfileFormResultSuccess || isProfilePhotosResultSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      }
      if (isProfileFormResultSuccess && isProfilePhotosResultSuccess) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Some updates failed");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.log(error)
    }
  };

  const handleChangeAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const photoUrl = URL.createObjectURL(file);

    const newPhoto: PhotoItem = {
      kind: "new",
      tempId: crypto.randomUUID(),
      file,
      url: photoUrl,
    };

    setMyPhotos((prevPhotos) => {
      const firstNullItemIndex = prevPhotos.findIndex((item) => !item);
      if (firstNullItemIndex === -1) {
        return prevPhotos;
      }
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[firstNullItemIndex] = newPhoto;
      return updatedPhotos;
    });
  };

  const handleDeletePhoto = (photoIndex: number) => {
    setMyPhotos((prevPhotos) => {
      const unRemovedPhotos = [...prevPhotos];
      unRemovedPhotos.splice(photoIndex, 1);
      unRemovedPhotos.push(null);
      return unRemovedPhotos;
    });
  };

  const handleAddInterest = (interest: string) => {
    setMyInterests((prevInterests) => [...prevInterests, interest]);
  };

  const handleDeleteInterest = (deletedInterest: string) => {
    setMyInterests((prevInterests) =>
      [...prevInterests].filter((interest) => interest !== deletedInterest),
    );
  };

  const myPhotosNumber = myPhotos.filter((photo) => photo).length;

  console.log("MY PROFILE DATAS GOT FROM SERVER", myProfileDatas);

  return (
    <div className="relative md:flex md:overflow-x-hidden">
      <Navbar />
      <form onSubmit={handleSubmit(onValid)} className="w-full pb-24 md:pb-10">
        <div className="m-6 h-12">
          <div className="flex items-center justify-between">
            <h1 className="font-TitleFont text-3xl">Edit profile</h1>
            <Button
              text="Save changes"
              type="submit"
              className="bg-TertiaryColor rounded-full px-4 py-1 cursor-pointer shadow-xl w-fit"
              isSubmitting={isMyProfileMutatePending}
              submittingText={<Spinner />}
            />
          </div>
        </div>
        <div className="bg-SecondaryColor/40 absolute h-px w-dvw"></div>
        <section className="mx-6 my-10">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">Photos</h5>
            <p className="text-SecondaryColor">{myPhotosNumber} of 5 added</p>
          </div>
          <div className="my-4 grid w-full grid-cols-3 gap-6">
            {myPhotos.map((photo, index) =>
              photo ? (
                <div
                  key={photo.kind === "existing" ? photo.id : photo.tempId}
                  className="relative aspect-square justify-self-center overflow-hidden rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(index)}
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
              defaultvalue={`${address.city}, ${address.country}`}
              {...register("location")}
              error={errors.location?.message}
            />
          </div>
        </section>

        {/* About you */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-xl font-semibold">About you</h4>
          </div>
          <TextareaInput
            text="Bio"
            defaultValue={biography}
            // extraDescription={`${biography.length}/300`}
            {...register("biography")}
            error={errors.biography?.message}
          />
        </section>

        {/* Interests */}
        <section className="mx-6 mt-6">
          <h4 className="mb-3 text-xl font-semibold">Interests</h4>
          <div className="grid grid-cols-none gap-y-12 lg:grid-cols-2 items-start">
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
        <AccountActions />
      </form>
    </div>
  );
};

export default MyProfile;
