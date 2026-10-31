import CardStack from "../../components/CardStack/CardStack";
import FilterPanel from "../../components/DiscoverPage/FilterPanel";
import Navbar from "../../components/Navbar/Navbar";
import UpNextProfiles from "../../components/DiscoverPage/UpNextProfiles";
import DiscoverEmptyState from "../../components/DiscoverPage/DiscoverEmptyState";
import MatchModal from "../../components/MatchModal/MatchModal";
import { DiscoverPageHeader, FilterModal } from "../../components/DiscoverPage";
import QuickFilters from "../../components/DiscoverPage/QuickFilters";
import useDiscover from "./useDiscover";
import { PageLoader } from "../../components/Loader";

const Discover = () => {
  const {
    selectedQuickFilter,
    isProfileDiscoverFinished,
    isPending,
    isError,
    handleApplyFilters,
    handleChangeQuickFilter,
    cardStackRef,
    isFetchingNewFilters,
    availablePeople,
    handleGoAheadIndex,
    currentIndex,
    handleSwipeProfile,
  } = useDiscover();

  if (isPending) {
    return <PageLoader />;
  }
  if (isError) {
    throw new Error("An error occurred");
  }

  return (
    <>
      <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
        <Navbar />

        <div className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-[90%] sm:max-w-[85%]">
            <DiscoverPageHeader />

            {isFetchingNewFilters ? (
  <div className="flex min-h-96 items-center justify-center md:mt-12">
    <span className="loading loading-spinner loading-lg text-SecondaryColor" />
  </div>
) : isProfileDiscoverFinished ? (
              <DiscoverEmptyState />
            ) : (
              <div className="flex lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start md:mt-12">
                <h3 className="hidden justify-self-center font-TitleFont text-2xl whitespace-nowrap text-SecondaryColor [writing-mode:vertical-rl] lg:block select-none">
                  Find someone worth the notification
                </h3>
                <CardStack
                  ref={cardStackRef}
                  people={availablePeople}
                  onChangeCurrentIndex={handleGoAheadIndex}
                />

                <UpNextProfiles
                  people={availablePeople}
                  currentIndex={currentIndex}
                />
              </div>
            )}

            <QuickFilters
              selectedFilters={selectedQuickFilter}
              onChangeFilter={handleChangeQuickFilter}
              onSwipeButton={handleSwipeProfile}
            />

            <section className="mt-10 hidden rounded-t-2xl border border-SecondaryColor/30 bg-SecondaryDarkBgColor px-8 py-6 lg:block">
              <FilterPanel
                onApplyFilters={handleApplyFilters}
                fieldsClassName="lg:grid lg:grid-cols-1 lg:items-end lg:gap-4"
              />
            </section>

            <FilterModal onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      </div>

      <MatchModal />
    </>
  );
};

export default Discover;
