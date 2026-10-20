import { useMutation } from "@tanstack/react-query";
import { FaHeart, FaStar, FaTimes } from "react-icons/fa";
import likeProfileMutation from "../../lib/tanstack-query/Discover/likeProfileMutation";
import unLikeProfileMutation from "../../lib/tanstack-query/Discover/unLikeProfileMutation";
import Spinner from "../Loader/Spinner";
import type { SortedUser } from "../../types/discover";
import { useState } from "react";

const ProfileViewActions = ({ profileDatas }: any) => {
  const profileActionsDatas: SortedUser = {
    id: profileDatas.id,
    username: profileDatas.username,
    firstname: profileDatas.firstname,
    lastname: profileDatas.lastname,
    age: profileDatas.age,
    biography: profileDatas.biography,
    fame_rating: profileDatas.fame_rating,
    distance: profileDatas.distance,
    profile_pic: profileDatas.profile_pic.picture_data,
    tags: profileDatas.tags,
    sexual_pref: profileDatas.sexual_pref,
    gender: profileDatas.gender,
  };

  const [matchProfileStatus, setMatchProfileStatus] = useState<{
    isMatch: boolean;
    likeStatus: "like" | "nope";
  } | null>(null);

  const { mutate: likeProfileMutate, isPending: isLikeProfileMutatePending } =
    useMutation(likeProfileMutation());
  const {
    mutate: unLikeProfileMutate,
    isPending: isUnLikeProfileMutatePending,
  } = useMutation(unLikeProfileMutation());

  const handleUnLikeProfile = () => {
    unLikeProfileMutate(profileActionsDatas, {
      onSuccess: () => {
        setMatchProfileStatus({
          isMatch: true,
          likeStatus: "nope",
        });
      },
    });
  };
  const handleLikeProfile = () => {
    likeProfileMutate(profileActionsDatas, {
      onSuccess: () => {
        setMatchProfileStatus({
          isMatch: true,
          likeStatus: "like",
        });
      },
    });
  };

  const isProfileActionPending =
    isLikeProfileMutatePending || isUnLikeProfileMutatePending;

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <div className="sticky bottom-0 z-10 -mx-4 flex items-center w-full justify-center gap-5 bg-linear-to-t from-PrimaryDarkBgColor px-4 pt-3.5 pb-5 [grid-area:actions] md:static md:mx-0 md:self-start md:bg-none md:px-0 md:pt-0 md:pb-0 lg:mt-6">
        <button
          onClick={handleUnLikeProfile}
          disabled={isProfileActionPending}
          aria-label="Pass"
          className="cursor-pointer flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-PrimaryColor"
        >
          {isUnLikeProfileMutatePending ? (
            <Spinner className="size-5" />
          ) : (
            <FaTimes className="size-5" />
          )}
        </button>
        <button
          onClick={handleLikeProfile}
          disabled={isProfileActionPending}
          aria-label="Like"
          className="cursor-pointer flex size-21 items-center justify-center rounded-full bg-TertiaryColor text-white shadow-[0_12px_34px_rgba(245,67,90,0.45)]"
        >
          {isLikeProfileMutatePending ? (
            <Spinner className="size-8.5" />
          ) : (
            <FaHeart className="size-8.5" />
          )}
        </button>
        <button
          onClick={handleLikeProfile}
          disabled={isLikeProfileMutatePending}
          aria-label="Super like"
          className="cursor-pointer flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-TertiaryColor"
        >
          {isLikeProfileMutatePending ? (
            <Spinner className="size-8.5" />
          ) : (
            <FaStar className="size-5" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between gap-x-4">
        <button
          style={{
            backgroundColor:
              matchProfileStatus && matchProfileStatus.likeStatus === "nope"
                ? "var(--color-TertiaryColor)"
                : "",
          }}
          className="text-PrimaryColor py-2 w-40 border border-TertiaryColor rounded-lg hover:bg-TertiaryColor transition"
        >
          I'm interested
        </button>
        <button
          style={{
            backgroundColor:
              matchProfileStatus && matchProfileStatus.likeStatus === "like"
                ? "var(--color-TertiaryColor)"
                : "",
          }}
          className="text-PrimaryColor py-2 w-40 border border-TertiaryColor rounded-lg hover:bg-TertiaryColor transition"
        >
          I'm not interested
        </button>
      </div>
    </div>
  );
};

export default ProfileViewActions;
