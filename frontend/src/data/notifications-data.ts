export type NotificationType = "match" | "message" | "like" | "view" | "system";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  group: "Today" | "Yesterday" | "This week";
  read: boolean;
  // For "match" / "message": id into messages-data's conversations, used
  // both to look up the avatar and to build the link to that chat.
  personId?: string;
};

export const notifications: AppNotification[] = [
  {
    id: "n1",
    type: "match",
    title: "You and Sana matched!",
    body: "Say hello while it's fresh.",
    time: "18m",
    group: "Today",
    read: false,
    personId: "sana",
  },
  {
    id: "n2",
    type: "message",
    title: "Kian",
    body: "I'm a better cook than I am a hiker, so the snacks will be excellent.",
    time: "32m",
    group: "Today",
    read: false,
    personId: "kian",
  },
  {
    id: "n3",
    type: "like",
    title: "3 people liked you",
    body: "Unlock to see who they are.",
    time: "1h",
    group: "Today",
    read: false,
  },
  {
    id: "n4",
    type: "message",
    title: "Milo",
    body: "Start with anything by Khruangbin.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
    personId: "milo",
  },
  {
    id: "n5",
    type: "match",
    title: "You and Elin matched!",
    body: "Say hello while it's fresh.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
    personId: "elin",
  },
  {
    id: "n6",
    type: "view",
    title: "Someone viewed your profile",
    body: "Unlock to see who's curious about you.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
  },
  {
    id: "n7",
    type: "system",
    title: "Add one more photo",
    body: "Profiles with more photos tend to get noticed more often.",
    time: "Mon",
    group: "This week",
    read: true,
  },
  {
    id: "n8",
    type: "like",
    title: "5 people liked you",
    body: "Unlock to see who they are.",
    time: "Sat",
    group: "This week",
    read: true,
  },
];
