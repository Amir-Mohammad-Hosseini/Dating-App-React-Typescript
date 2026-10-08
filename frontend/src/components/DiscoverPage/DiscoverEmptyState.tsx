// components/DiscoverPage/DiscoverEmptyState.tsx
import { motion } from "motion/react";
import { Link } from "react-router";
import { GoCheck } from "react-icons/go";
import { FaCrown, FaArrowRight } from "react-icons/fa6";

const PERKS = [
  "See people outside your current filters",
  "Unlimited likes, every day",
  "See everyone who already liked you",
];

const DiscoverEmptyState = () => {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" }}
      className="relative isolate mx-auto flex h-132 mt-8 w-full max-w-95 flex-col items-center justify-center overflow-hidden rounded-3xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor p-8 text-center"
    >
      <div className="pointer-events-none absolute -top-20 -left-16 -z-10 size-56 rounded-full bg-TertiaryColor/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 -z-10 size-56 rounded-full bg-TertiaryColor/30 blur-3xl" />

      <div className="flex size-14 items-center justify-center rounded-full border border-TertiaryColor/40 bg-TertiaryColor/15 text-TertiaryColor">
        <FaCrown className="size-6" />
      </div>

      <h2 className="mt-5 font-TitleFont text-2xl text-PrimaryColor">
        You've seen everyone nearby for today
      </h2>
      <p className="mt-2 max-w-70 text-sm text-SecondaryColor">
        New people join every day — go Pro to keep discovering instead of
        waiting for tomorrow.
      </p>

      <ul className="mt-6 space-y-2.5 self-stretch text-left">
        {PERKS.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2.5 text-sm text-PrimaryColor"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-TertiaryColor/15 text-TertiaryColor">
              <GoCheck className="size-3" />
            </span>
            {perk}
          </li>
        ))}
      </ul>

      <Link
        to="/pro"
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-TertiaryColor py-3 font-PrimarySemiBoldFont text-SecondaryDarkBgColor transition hover:bg-HoverBtnBg"
      >
        Upgrade to Pro
        <FaArrowRight className="size-3.5 transition group-hover:translate-x-1" />
      </Link>

      <p className="mt-3 text-xs text-SecondaryColor">
        Or check back tomorrow for a fresh batch of profiles.
      </p>
    </motion.div>
  );
};

export default DiscoverEmptyState;