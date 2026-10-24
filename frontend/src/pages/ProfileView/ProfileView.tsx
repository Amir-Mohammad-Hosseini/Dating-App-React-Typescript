import { useParams } from "react-router";
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
import ProfileViewActions from "../../components/ProfileViewPage/ProfileViewActions";
import MatchModal from "../../components/MatchModal/MatchModal";
import ProfileViewTopbar from "../../components/ProfileViewPage/ProfileViewTopbar";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";
import type ConversationItemType from "../../components/Messages/types";

const ProfileView = () => {
  const { userId: userIdParam } = useParams();
  const userId = Number(userIdParam);
  const isValidUserId = Number.isInteger(userId) && userId > 0;

  const {
    data: profileViewDatas,
    isPending: isProfileViewQueryPending,
    isError: isProfileViewQueryError,
  } = useQuery({
    ...profileViewQuery(userId),
    enabled: isValidUserId,
  });

  const {
    data: conversationsList,
    isPending: isConversationsListQueryPending,
  } = useQuery(conversationsListQuery());

  const isPending =
    isProfileViewQueryPending || isConversationsListQueryPending;

  if (!isValidUserId) {
    return <NotFound message="Profile not found" />;
  }

  if (isPending) {
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
    id,
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
    distance !== null &&
    distance !== undefined &&
    Number.isFinite(Number(distance))
      ? Number(distance)
      : null;

  const matchedUserDatas = conversationsList.find(
    (conversation: ConversationItemType) => conversation.user_id === id,
  );
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
          <ProfileViewPhotos photos={profilePictures} firstname={firstname} />

          {/* Info */}
          <div className="-mt-7 rounded-t-[28px] bg-PrimaryDarkBgColor px-5 pt-7 pb-2 [grid-area:info] md:mt-0 md:rounded-none md:bg-transparent md:px-0 md:pt-0">
            <ProfileViewInfo
              firstname={firstname}
              username={username}
              age={age}
              isActive={isRecentlyActive(last_connection)}
              distanceKm={distanceKm}
              connectionId={matchedUserDatas?.connection_id || null}
            />
            <ProfileViewAbout about={biography} />
            <ProfileViewInterests interests={tags} />
            <ProfileViewBasics gender={gender} interestedIn={sexual_pref} />
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
