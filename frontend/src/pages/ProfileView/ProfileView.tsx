import ProfileViewInterests from "../../components/ProfileViewPage/ProfileViewInterests";
import ProfileViewAbout from "../../components/ProfileViewPage/ProfileViewAbout";
import ProfileViewBasics from "../../components/ProfileViewPage/ProfileViewBasics";
import ProfileViewFameRating from "../../components/ProfileViewPage/ProfileViewFameRating";
import ProfileViewPhotos from "../../components/ProfileViewPage/ProfileViewPhotos";
import ProfileViewInfo from "../../components/ProfileViewPage/ProfileViewInfo";
import ProfileViewActions from "../../components/ProfileViewPage/ProfileViewActions";
import ProfileViewTopbar from "../../components/ProfileViewPage/ProfileViewTopbar";

import NotFound from "../Errors/NotFound";

import MatchModal from "../../components/MatchModal/MatchModal";

import { PageLoader } from "../../components/Loader";

import useProfileView from "./useProfileView";

const ProfileView = () => {
  const {
    isValidUserId,
    isPending,
    isProfileViewQueryError,
    profileViewDatas,
    profilePictures,
    presenceProfile,
    distanceKm,
    matchedUserDatas,
  } = useProfileView();

  if (!isValidUserId) {
    return <NotFound message="Profile not found" />;
  }

  if (isPending) {
    return <PageLoader />;
  }

  if (isProfileViewQueryError || !profileViewDatas) {
    return <NotFound message="Profile not found" />;
  }

  const {
    id,
    firstname,
    username,
    age,
    biography,
    tags,
    gender,
    sexual_pref,
    fame_rating,
  } = profileViewDatas;

  return (
    <>
      <div className="min-h-dvh w-full bg-PrimaryDarkBgColor sm:mx-auto sm:max-w-140 md:mx-0 md:max-w-none md:px-8 md:pb-10 lg:px-12 xl:px-16">
        <div
          className="grid grid-cols-1 [grid-template-areas:'photo'_'info'_'actions']
          md:grid-cols-[320px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-8
          md:[grid-template-areas:'top_top'_'photo_info'_'actions_info']
          lg:mx-auto lg:max-w-5xl lg:grid-cols-[400px_1fr] lg:gap-x-12"
        >
          {/* Topbar */}
          <ProfileViewTopbar id={id} />

          {/* Photo */}
          <ProfileViewPhotos
            photos={profilePictures}
            firstname={firstname}
          />

          {/* Info */}
          <div className="-mt-7 rounded-t-[28px] bg-PrimaryDarkBgColor px-5 pt-7 pb-2 [grid-area:info] md:mt-0 md:rounded-none md:bg-transparent md:px-0 md:pt-0">
            <ProfileViewInfo
              firstname={firstname}
              username={username}
              age={age}
              isOnline={presenceProfile?.is_online ?? false}
              distanceKm={distanceKm}
              connectionId={matchedUserDatas?.connection_id || null}
            />

            <ProfileViewAbout about={biography} />

            <ProfileViewInterests interests={tags} />

            <ProfileViewBasics
              gender={gender}
              interestedIn={sexual_pref}
            />

            <ProfileViewFameRating fameRating={fame_rating} />
          </div>

          <ProfileViewActions profileDatas={profileViewDatas} />
        </div>
      </div>

      <MatchModal />
    </>
  );
};

export default ProfileView;