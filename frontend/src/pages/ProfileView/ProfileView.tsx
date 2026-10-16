import { GoChevronLeft } from "react-icons/go";
import { MdOutlineBlock } from "react-icons/md";
import { FaTimes, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import profileViewQuery from "../../lib/tanstack-query/ProfileView/profileViewQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import ProfileViewInterests from "../../components/ProfileViewPage/ProfileViewInterests";
import ProfileViewAbout from "../../components/ProfileViewPage/ProfileViewAbout";
import ProfileViewBasics from "../../components/ProfileViewPage/ProfileViewBasics";
import ProfileViewFameRating from "../../components/ProfileViewPage/ProfileViewFameRating";
import ProfileViewPhotos from "../../components/ProfileViewPage/ProfileViewPhotos";
import ProfileViewInfo from "../../components/ProfileViewPage/ProfileViewInfo";
import NotFound from "../Errors/NotFound";
import { isRecentlyActive } from "../../utils/constants/profileView";


const ProfileView = () => {
  const navigate = useNavigate()
  const { userId: userIdParam } = useParams();
  const userId = Number(userIdParam);
  const isValidUserId = Number.isInteger(userId) && userId > 0;

  // hooks must always run before any early return
  const {
    data: profileViewDatas,
    isPending: isProfileViewQueryPending,
    isError: isProfileViewQueryError,
  } = useQuery({
    ...profileViewQuery(userId),
    enabled: isValidUserId,
  });

  if (!isValidUserId) {
    return <NotFound message="Profile not found" />;
  }

  if (isProfileViewQueryPending) {
    return <LoadingOverlay show />;
  }

  if (isProfileViewQueryError) {
    return <NotFound message="Profile not found" />;
  }

  const profilePictures = [
    profileViewDatas.profile_pic,
    ...profileViewDatas.other_pictures,
  ];
  const {
    firstname,
    username,
    age,
    biography,
    tags,
    gender,
    sexual_pref,
    fame_rating,
    last_connection,
    distance,
  } = profileViewDatas;

  const distanceKm =
    distance !== null && distance !== undefined && Number.isFinite(Number(distance))
      ? Number(distance)
      : null;


      const handleGoToPrevPage = () => {
        navigate(-1)
      }

  return (
    <div className="min-h-dvh w-full bg-PrimaryDarkBgColor sm:mx-auto sm:max-w-140 md:mx-0 md:max-w-none md:px-8 md:pb-10 lg:px-12 xl:px-16">
      <div
        className="grid grid-cols-1 [grid-template-areas:'photo'_'info'_'actions']
          md:grid-cols-[320px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-8
          md:[grid-template-areas:'top_top'_'photo_info'_'actions_info']
          lg:mx-auto lg:max-w-5xl lg:grid-cols-[400px_1fr] lg:gap-x-12"
      >
        {/* Topbar */}
        <div className="absolute inset-x-0 top-0 z-10 mt-4 flex items-center justify-between p-4 md:static md:z-auto md:[grid-area:top] md:p-0 md:pb-5">
          <button
          onClick={handleGoToPrevPage}
            aria-label="Back"
            className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none cursor-pointer"
          >
            <GoChevronLeft className="size-5" />
          </button>
          <span className="hidden text-base font-semibold text-PrimaryColor md:block">
            Profile
          </span>
          <button
            aria-label="More options"
            className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none cursor-pointer"
          >
            <MdOutlineBlock className="size-5" />
          </button>
        </div>

        {/* Photo */}
        <ProfileViewPhotos photos={profilePictures} firstname={firstname} />

        {/* Info */}
        <div className="-mt-7 rounded-t-[28px] bg-PrimaryDarkBgColor px-5 pt-7 pb-2 [grid-area:info] md:mt-0 md:rounded-none md:bg-transparent md:px-0 md:pt-0">
          <ProfileViewInfo
            firstname={firstname}
            username={username}
            age={age}
            isActive={isRecentlyActive(last_connection)}
            distanceKm={distanceKm}
          />
          <ProfileViewAbout about={biography} />
          <ProfileViewInterests interests={tags} />
          <ProfileViewBasics gender={gender} interestedIn={sexual_pref} />
          <ProfileViewFameRating fameRating={fame_rating} />
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 z-10 -mx-4 flex items-center justify-center gap-5 bg-linear-to-t from-PrimaryDarkBgColor px-4 pt-3.5 pb-5 [grid-area:actions] md:static md:mx-0 md:self-start md:bg-none md:px-0 md:pt-0 md:pb-0 lg:mt-6">
          <button
            aria-label="Pass"
            className="flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-PrimaryColor"
          >
            <FaTimes className="size-5" />
          </button>
          <button
            aria-label="Like"
            className="flex size-21 items-center justify-center rounded-full bg-TertiaryColor text-white shadow-[0_12px_34px_rgba(245,67,90,0.45)]"
          >
            <FaHeart className="size-8.5" />
          </button>
          <button
            aria-label="Super like"
            className="flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-TertiaryColor"
          >
            <FaStar className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;