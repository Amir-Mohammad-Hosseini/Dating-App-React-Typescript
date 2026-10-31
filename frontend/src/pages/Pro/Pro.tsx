// pages/Pro/Pro.tsx
import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { GoCheck } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
import {
  FaCrown,
  FaArrowRight,
} from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import Logo from "../../components/Logo/Logo";
import FeatureCell from "../../components/ProPage/FeatureCell";
import type { BillingType } from "./types";
import PLANS, { COMPARISON, FAQ, HIGHLIGHTS } from "../../utils/constants/pro";

const Pro = () => {
  const [billing, setBilling] = useState<BillingType>("yearly");
  const plan = PLANS[billing];

  const handleUpgrade = () => {
    // TODO: connect to your payment / upgrade mutation
    console.log("upgrade", billing);
  };

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <div className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[90%] pb-16 sm:max-w-[85%] lg:max-w-4xl">
          {/* Top bar */}
          <div className="flex items-center justify-between py-6">
            <Link
              to="/matches"
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
              aria-label="Back to discover"
            >
              <IoChevronBack className="size-4" aria-hidden="true" />
            </Link>
            <div className="md:hidden">
              <Logo isShowText />
            </div>
          </div>

          {/* Hero + pricing card */}
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex size-14 items-center justify-center rounded-full border border-TertiaryColor/40 bg-TertiaryColor/15 text-TertiaryColor">
                <FaCrown className="size-6" />
              </div>
              <h1 className="mt-5 font-TitleFont text-4xl leading-tight text-PrimaryColor sm:text-5xl">
                Never run out of people to meet
              </h1>
              <p className="mt-4 max-w-md text-SecondaryColor">
                Go Pro to like without limits, see who is already into you, and
                keep discovering when your filters run dry.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="relative isolate overflow-hidden rounded-3xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor p-6"
            >
              <div className="pointer-events-none absolute -top-20 -left-16 -z-10 size-56 rounded-full bg-TertiaryColor/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-16 -z-10 size-56 rounded-full bg-TertiaryColor/30 blur-3xl" />

              {/* Billing toggle */}
              <div
                role="radiogroup"
                aria-label="Billing period"
                className="grid grid-cols-2 gap-1 rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor p-1"
              >
                {(["monthly", "yearly"] as BillingType[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={billing === option}
                    onClick={() => setBilling(option)}
                    className={`cursor-pointer rounded-full py-2 text-sm capitalize transition ${
                      billing === option
                        ? "bg-TertiaryColor font-PrimarySemiBoldFont text-SecondaryDarkBgColor"
                        : "text-SecondaryColor hover:text-PrimaryColor"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-TitleFont text-5xl text-PrimaryColor">
                  {plan.price}
                </span>
                <span className="pb-1.5 text-sm text-SecondaryColor">
                  {plan.period}
                </span>
                {plan.badge && (
                  <span className="mb-2 ml-auto rounded-full border border-TertiaryColor/40 bg-TertiaryColor/15 px-2.5 py-0.5 text-xs text-TertiaryColor">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-SecondaryColor">{plan.note}</p>

              <ul className="mt-5 space-y-2.5">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center gap-2.5 text-sm text-PrimaryColor"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-TertiaryColor/15 text-TertiaryColor">
                      <GoCheck className="size-3" />
                    </span>
                    {item.title}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleUpgrade}
                className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-TertiaryColor py-3 font-PrimarySemiBoldFont text-SecondaryDarkBgColor transition hover:bg-HoverBtnBg"
              >
                Upgrade to Pro
                <FaArrowRight className="size-3.5 transition group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* What you get */}
          <section className="mt-16">
            <h2 className="font-TitleFont text-2xl text-PrimaryColor">
              What Pro gives you
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor p-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-TertiaryColor/15 text-TertiaryColor">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-PrimarySemiBoldFont text-PrimaryColor">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm text-SecondaryColor">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison */}
          <section className="mt-16">
            <h2 className="font-TitleFont text-2xl text-PrimaryColor">
              Free vs Pro
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor">
              <table className="w-full min-w-96 text-left">
                <thead>
                  <tr className="border-b border-SecondaryColor/20 text-sm">
                    <th className="px-5 py-4 font-normal text-SecondaryColor">
                      Feature
                    </th>
                    <th className="w-28 px-3 py-4 text-center font-normal text-SecondaryColor">
                      Free
                    </th>
                    <th className="w-28 px-3 py-4 text-center font-PrimarySemiBoldFont text-TertiaryColor">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-SecondaryColor/10 last:border-0"
                    >
                      <td className="px-5 py-4 text-sm text-PrimaryColor">
                        {row.feature}
                      </td>
                      <td className="px-3 py-4 text-center">
                        <FeatureCell value={row.free} />
                      </td>
                      <td className="bg-TertiaryColor/5 px-3 py-4 text-center">
                        <FeatureCell value={row.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="font-TitleFont text-2xl text-PrimaryColor">
              Questions
            </h2>
            <div className="mt-6 space-y-3">
              {FAQ.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-SecondaryColor/20 bg-SecondaryDarkBgColor px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-PrimaryColor [&::-webkit-details-marker]:hidden">
                    {q}
                    <IoChevronBack
                      className="size-4 shrink-0 -rotate-90 text-SecondaryColor transition group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm text-SecondaryColor">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={handleUpgrade}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-TertiaryColor px-8 py-3 font-PrimarySemiBoldFont text-SecondaryDarkBgColor transition hover:bg-HoverBtnBg"
            >
              Upgrade to Pro
              <FaArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-xs text-SecondaryColor">
              Not ready?{" "}
              <Link to="/discover" className="underline hover:text-PrimaryColor">
                Keep browsing for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
