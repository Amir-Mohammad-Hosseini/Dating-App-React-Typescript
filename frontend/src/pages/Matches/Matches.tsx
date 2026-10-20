import { CiLock } from "react-icons/ci";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import matchesQuery from "../../lib/tanstack-query/Matches/matchesQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import MatchPerosn from "../../components/MatchesPage/MatchPerosn";
import type MatchPersonType from "../../components/MatchesPage/types";
import NotificationLogo from "../../components/NotificationLogo/NotificationLogo";

const Matches = () => {
  const { data: matchesPeople, isPending } = useQuery(matchesQuery());

  if (isPending) {
    return <LoadingOverlay show />;
  }

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 px-6 pt-6 pb-28 sm:px-8 md:px-10 md:py-8 lg:px-12">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-TitleFont text-3xl md:text-4xl">Matches</h1>
            <p className="mt-1 text-sm text-SecondaryColor md:text-base">
              {matchesPeople.length} matches · 3 new since your last visit
            </p>
          </div>
          {/* TODO: there is no #filter-modal on this page yet */}
          <div className="flex items-center justify-center gap-x-2">
            <NotificationLogo />
          </div>
        </header>

        {/* Likes you (locked) */}
        <section className="mt-8" aria-labelledby="likes-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="likes-heading" className="font-PrimarySemiBoldFont text-lg">
              Likes you
              <span className="text-SecondaryColor"> · 23</span>
            </h2>
            <Link
              to="/pro"
              className="cursor-pointer font-PrimarySemiBoldFont text-sm text-TertiaryColor transition hover:text-HoverBtnBg"
            >
              See all
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-SecondaryColor/30">
            {/* Blurred fake avatars behind the overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center gap-5 px-6"
            >
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  key={index}
                  className="size-20 shrink-0 animate-pulse rounded-full bg-TertiaryColor/35 blur-[6px] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>

            <div className="relative flex flex-col items-center gap-2 px-4 py-4 text-center">
              <CiLock
                className="text-TertiaryColor"
                size={18}
                aria-hidden="true"
              />
              <p className="font-PrimaryMediumFont">
                23 people already liked you
              </p>
              <Link
                to="/pro"
                type="button"
                className="cursor-pointer rounded-full bg-TertiaryColor px-6 py-2.5 font-PrimarySemiBoldFont text-white transition hover:bg-HoverBtnBg"
              >
                Upgrade to see who
              </Link>
            </div>
          </div>
        </section>

        {/* Your matches */}
        <section className="mt-10" aria-labelledby="matches-heading">
          <h2
            id="matches-heading"
            className="mb-4 font-PrimarySemiBoldFont text-lg"
          >
            Your matches
          </h2>

          <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {matchesPeople.map((match: MatchPersonType) => (
              <MatchPerosn key={match.user_id} {...match} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Matches;
