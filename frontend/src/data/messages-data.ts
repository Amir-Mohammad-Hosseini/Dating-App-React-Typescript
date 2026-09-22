export type MessageBubble = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  age: number;
  role: string;
  distance: string;
  bio: string;
  interests: string[];
  avatarTone: string;
  online: boolean;
  isNewMatch: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isTyping?: boolean;
  messages: MessageBubble[];
};

// Same red/grey alternation used on the Matches page
export const AVATAR_TONES = [
  "bg-linear-to-br from-[#ea4a61] to-[#7d2b3a]",
  "bg-linear-to-br from-[#c9cdd3] to-[#54575d]",
];

export const conversations: Conversation[] = [
  {
    id: "sana",
    name: "Sana",
    age: 24,
    role: "Product designer",
    distance: "4 km away",
    bio: "Rock climbing on weekends. Tea over coffee. Always up for a museum wander.",
    interests: ["Climbing", "Museums", "Tea"],
    avatarTone: AVATAR_TONES[0],
    online: true,
    isNewMatch: true,
    lastMessage: "Haha okay you've convinced me, tacos it is",
    lastMessageTime: "2m",
    unreadCount: 2,
    messages: [
      { id: "1", from: "them", text: "Hey! Loved the climbing photo on your profile", time: "09:01" },
      { id: "2", from: "me", text: "Ha thanks, that route almost broke me", time: "09:03" },
      { id: "3", from: "them", text: "Haha okay you've convinced me, tacos it is", time: "09:05" },
    ],
  },
  {
    id: "milo",
    name: "Milo",
    age: 29,
    role: "Chef",
    distance: "6 km away",
    bio: "Start with anything by Khruangbin and I'm yours.",
    interests: ["Cooking", "Music", "Vinyl"],
    avatarTone: AVATAR_TONES[1],
    online: true,
    isNewMatch: true,
    lastMessage: "Typing…",
    lastMessageTime: "5m",
    unreadCount: 0,
    isTyping: true,
    messages: [
      { id: "1", from: "them", text: "Start with anything by Khruangbin", time: "Yesterday" },
    ],
  },
  {
    id: "rana",
    name: "Rana",
    age: 27,
    role: "Photographer",
    distance: "2 km away",
    bio: "Chasing golden hour and good stories.",
    interests: ["Photography", "Travel", "Coffee"],
    avatarTone: AVATAR_TONES[0],
    online: false,
    isNewMatch: true,
    lastMessage: "Sent you the gallery link, check it when you can",
    lastMessageTime: "1h",
    unreadCount: 0,
    messages: [
      { id: "1", from: "them", text: "Sent you the gallery link, check it when you can", time: "08:10" },
    ],
  },
  {
    id: "kian",
    name: "Kian",
    age: 26,
    role: "Grad student",
    distance: "3 km away",
    bio: "Half through a thesis, fully through my patience. Good listener, better cook.",
    interests: ["Cooking", "Reading", "Hiking"],
    avatarTone: AVATAR_TONES[1],
    online: true,
    isNewMatch: true,
    lastMessage: "That thesis defense joke was too real",
    lastMessageTime: "3h",
    unreadCount: 1,
    messages: [
      { id: "1", from: "them", text: "I'm a better cook than I am a hiker, fair warning", time: "09:13" },
      { id: "2", from: "me", text: "That looks unreal. Where is it?", time: "09:05" },
      { id: "3", from: "them", text: "Two hours from here, I can take you if you're up for it", time: "09:06" },
    ],
  },
  {
    id: "elin",
    name: "Elin",
    age: 25,
    role: "Nurse",
    distance: "7 km away",
    bio: "New match. Say hello.",
    interests: ["Yoga", "Dogs"],
    avatarTone: AVATAR_TONES[0],
    online: false,
    isNewMatch: true,
    lastMessage: "Yeah Saturday works, 6pm?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [{ id: "1", from: "them", text: "Yeah Saturday works, 6pm?", time: "Yesterday" }],
  },
];
