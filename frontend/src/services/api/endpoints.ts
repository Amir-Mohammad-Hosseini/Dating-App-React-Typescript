type Id = number | string;

const ENDPOINTS = {
  ACTIVITY: {
    LIKERS: "profile/likers",
    VISITORS: "profile/visitors",
  },

  AUTH: {
    FORGOT_PASSWORD: "resetpassword",
    LOGIN: "login",
    SIGN_UP: "signup",
    SET_NEW_PASSWORD: "setnewpassword",
    VERIFY_EMAIL: "signup/verifyuser",
  },

  BLOCK: (userId: Id) => `browsing/blockuser/${userId}`,

  CLEAR_CHAT: "chat/clear_chat",

  CONVERSATIONS: "chat/chat_connections",
  MATCHES: "chat/chat_connections",

  DISCOVER: {
    USERS_LIST: "browsing/userlists",
    DISCOVER_PEOPLE: "browsing/sorted",
    LIKE_PROFILE: (userId: Id) => `browsing/likeuser/${userId}`,
    UNLIKE_PROFILE: (userId: Id) => `browsing/unlikeuser/${userId}`,
  },

  GET_ME: "profile",

  MESSAGE: {
    PROFILE_PRESENCE: (userId: Id) => `chat/presence/${userId}`,
    HISTORY_MESSAGES: "chat/room_messages",
    CHAT_IMAGE_MESSAGE: "chat/upload_image",
  },

  MY_PROFILE: {
    EDIT_PICTURES: "profile/pictures",
    EDIT_SETTINGS: "profile/editsettings",

    ACCOUNT_ACTIONS: {
      DELETE_USER: "profile/deleteuser",
      BLOCKED_ACCOUNTS: "profile/blocked",
      CHANGE_PASSWORD: "profile/changepassword",
      LOGOUT: "profile/logout",
      UNBLOCK_ACCOUNT: (accountId: Id) => `profile/unblock/${accountId}`,
    },

    NOTIFICATIONS: {
      LIST: "profile/notifications",
      CLEAR_ALL: "profile/notifications",
      READ: (notifId: Id) => `profile/readnotification/${notifId}`,
      READ_ALL: "profile/readnotifications",
    },
  },

  ONBOARDING: {
    SETUP: "profile/setup",
    SET_PROFILE_PICTURE: "profile/setprofilepic",
    UPLOAD_IMAGE: "profile/imageupload",
  },

  PROFILE_VIEW: (userId: Id) => `browsing/profile/${userId}`,

  REPORT_PROFILE: (userId: Id) => `browsing/reportuser/${userId}`,

  GEOCODING: {
    REVERSE: (latitude: number, longitude: number) => {
      const params = new URLSearchParams({
        lat: String(latitude),
        lon: String(longitude),
        format: "json",
      });

      return `https://nominatim.openstreetmap.org/reverse?${params}`;
    },
  },
};

export default ENDPOINTS;
