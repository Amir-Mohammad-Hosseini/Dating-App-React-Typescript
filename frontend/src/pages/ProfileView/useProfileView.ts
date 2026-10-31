import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import profileViewQuery from "../../lib/tanstack-query/ProfileView/profileViewQuery";
import conversationsListQuery from "../../lib/tanstack-query/Conversations/conversationsListQuery";

import type ConversationItemType from "../../components/Messages/types";

import usePresenceProfile from "../../hooks/Conversations/usePresenceProfile";

const useProfileView = () => {
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

  const {
    presenceProfile,
    isPresenceProfileQueryPending,
  } = usePresenceProfile(userId);

  const isPending =
    isProfileViewQueryPending ||
    isConversationsListQueryPending ||
    isPresenceProfileQueryPending;

  const profilePictures = profileViewDatas
    ? [
        profileViewDatas.profile_pic,
        ...profileViewDatas.other_pictures,
      ]
    : [];

  const distance = profileViewDatas?.distance;

  const distanceKm =
    distance !== null &&
    distance !== undefined &&
    Number.isFinite(Number(distance))
      ? Number(distance)
      : null;

  const matchedUserDatas = conversationsList?.find(
    (conversation: ConversationItemType) =>
      conversation.user_id === profileViewDatas?.id,
  );

  return {
    isValidUserId,
    isPending,
    isProfileViewQueryError,
    profileViewDatas,
    profilePictures,
    presenceProfile,
    distanceKm,
    matchedUserDatas,
  };
};

export default useProfileView;