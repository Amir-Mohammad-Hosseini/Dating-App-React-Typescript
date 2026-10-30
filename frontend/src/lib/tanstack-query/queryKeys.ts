import type { DiscoverFilters } from "../../utils/constants/discover";

const queryKeys = {
  activity: {
    likers: ["likers"] as const,
    visitors: ["visitors"] as const,
  },
  auth: {
    verifyEmail: ["verifyEmail"] as const,
  },
  conversations: {
    list: ["conversations"] as const,
    presence: {
      all: ["presence"] as const,
      user: (userId?: string | number) => ["presence", userId] as const,
    },
  },
  discover: {
    people: (filters: DiscoverFilters) => ["discover", filters] as const,
    usersList: ["userlists"] as const,
  },
  myProfile: {
    all: ["myProfile"] as const,
  },
  matches: {
    all: ["matches"] as const,
  },
  message: {
    all: (matchId?: string | number) => ["historyMessages", matchId] as const,
  },
  blockes: {
    all: ["blockedAccounts"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
  onboarding: {
    location: (coordinates: { latitude: number; longitude: number } | null) =>
      ["location", coordinates?.latitude, coordinates?.longitude] as const,
    photo: ["onboarding-photo"] as const,
  },
  profileView: {
    all: (userId: number | string) => ["profileView", userId] as const,
  },
};

export default queryKeys;
