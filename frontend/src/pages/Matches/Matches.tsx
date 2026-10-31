import Navbar from "../../components/Navbar/Navbar";
import MatchPerosn from "../../components/MatchesPage/MatchPerosn";
import type MatchPersonType from "../../components/MatchesPage/types";
import { PageLoader } from "../../components/Loader";
import useMatches from "./useMatches";
import {
  LockedLikedYou,
  MatchesPageHeader,
} from "../../components/MatchesPage";

const Matches = () => {
  const {
    matchesPeople,
    isPending,
    isError,
    matchesPeopleError,
    likersError,
    likersData,
  } = useMatches();

  if (isPending) {
    return <PageLoader />;
  }

  if (isError) {
    if (matchesPeopleError) {
      throw new Error(matchesPeopleError?.message || "An error occurred");
    } else {
      throw new Error(likersError?.message || "An error occurred");
    }
  }

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 px-6 pt-6 pb-28 sm:px-8 md:px-10 md:py-8 lg:px-12">
        <MatchesPageHeader matchesCount={matchesPeople.length} />

        {/* Likes you (locked) */}
        <LockedLikedYou likersCount={likersData?.length || 0} />

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
