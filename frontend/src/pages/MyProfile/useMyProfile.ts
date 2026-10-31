import { useMutation, useQuery } from "@tanstack/react-query";
import myProfileQuery from "../../lib/tanstack-query/GetMe/myProfileQuery";
import locationQuery from "../../lib/tanstack-query/Onboarding/locationQuery";
import { useEffect, useState, type ChangeEvent } from "react";
import { createPhotosArray, MAX_PHOTOS } from "../../utils/constants/myProfile";
import { useForm } from "react-hook-form";
import type {
  MyProfileFormType,
  MyProfileSchemaType,
} from "../../lib/zod/MyProfile/myProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import myProfileSchema from "../../lib/zod/MyProfile/myProfileSchema";
import {
  myProfileFormMutation,
  myProfilePhotosMutation,
} from "../../lib/tanstack-query/MyProfile/myProfileMutation";
import queryClient from "../../lib/tanstack-query/queryClient";
import { toast } from "sonner";
import createFormDataFromPhotos from "./../../utils/myProfileUtils";
import type {
  PhotoItemType,
  PhotoSlotType,
} from "../../components/ProfilePage/types";

const useMyProfile = () => {
  const [bioLength, setBioLength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MyProfileSchemaType>({
    resolver: zodResolver(myProfileSchema),
  });

  const { data: myProfileDatas, isPending: isMyProfileDatasQueryPending } =
    useQuery(myProfileQuery());

  const longitude = myProfileDatas?.ip_location?.x;
  const latitude = myProfileDatas?.ip_location?.y;

  const hasCoordinates = longitude != null && latitude != null;

  const {
    data: myLocationDatas,
    isPending: isMyLocationDatasQueryPending,
    isError: isMyLocationError,
    error: myLocationError,
  } = useQuery({
    ...locationQuery({
      longitude: longitude ?? 0,
      latitude: latitude ?? 0,
    }),
    enabled: hasCoordinates,
  });
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [myPhotos, setMyPhotos] = useState<PhotoSlotType[]>(
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

  useEffect(() => {
    if (myProfileDatas) {
      setBioLength(myProfileDatas?.biography.length);
    }
  }, [myProfileDatas]);

  const isMyProfileQueryPending =
    isMyProfileDatasQueryPending ||
    (hasCoordinates && isMyLocationDatasQueryPending);

  const isMyProfileMutatePending =
    isMyProfilePhotosMutatePending || isMyProfileFormMutatePending;



  const onValid = async (data: MyProfileSchemaType) => {
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
    }
  };

  const handleChangeAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const photoUrl = URL.createObjectURL(file);

    const newPhoto: PhotoItemType = {
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

  const handleChangeBioCountText = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const biographyContent = event.target.value;
    setTimeout(() => {
      setBioLength(biographyContent.length);
    }, 500);
  };

  const handleAddInterest = (interest: string) => {
    setMyInterests((prevInterests) => [...prevInterests, interest]);
  };

  const handleDeleteInterest = (deletedInterest: string) => {
    setMyInterests((prevInterests) =>
      [...prevInterests].filter((interest) => interest !== deletedInterest),
    );
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    onValid,
    isMyLocationError,
    myLocationError,
    bioLength,
    isMyProfileQueryPending,
    isMyProfileMutatePending,
    myLocationDatas,
    handleChangeAddPhoto,
    handleDeletePhoto,
    handleChangeBioCountText,
    handleAddInterest,
    handleDeleteInterest,
    myPhotos,
    myProfileDatas,
    myInterests,
  };
};

export default useMyProfile;
