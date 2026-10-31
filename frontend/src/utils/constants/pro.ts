import { FaCompass, FaHeart, FaInfinity } from "react-icons/fa";
import type { BillingType } from "../../pages/Pro/types";

const PLANS: Record<
  BillingType,
  { price: string; period: string; note: string; badge?: string }
> = {
  monthly: {
    price: "$9.99",
    period: "/ month",
    note: "Billed monthly. Cancel any time.",
  },
  yearly: {
    price: "$5.99",
    period: "/ month",
    note: "Billed $71.88 once a year. Cancel any time.",
    badge: "Save 40%",
  },
};

export const HIGHLIGHTS = [
  {
    icon: FaInfinity,
    title: "Unlimited likes",
    text: "Like as many people as you want. No daily cap, no waiting for tomorrow.",
  },
  {
    icon: FaHeart,
    title: "See who liked you",
    text: "Open the list of people who already like you and match with them in one tap.",
  },
  {
    icon: FaCompass,
    title: "Go beyond your filters",
    text: "See people outside your age, distance and fame range when you run out of profiles.",
  },
];

export const COMPARISON: { feature: string; free: boolean | string; pro: boolean | string }[] = [
  { feature: "Daily likes", free: "Limited", pro: "Unlimited" },
  { feature: "See who liked you", free: false, pro: true },
  { feature: "Profiles outside your filters", free: false, pro: true },
  { feature: "Browse and match", free: true, pro: true },
  { feature: "Chat with your matches", free: true, pro: true },
];

export const FAQ = [
  {
    q: "Can I cancel whenever I want?",
    a: "Yes. Cancel from your settings and Pro stays active until the end of the period you already paid for.",
  },
  {
    q: "What happens to my matches if I cancel?",
    a: "Nothing. Your matches and chats stay exactly as they are. You only lose the Pro features.",
  },
  {
    q: "Will I be charged again automatically?",
    a: "Your plan renews at the end of each period. We email you before it renews.",
  },
];

export default PLANS