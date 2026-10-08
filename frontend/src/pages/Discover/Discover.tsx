import CardStack, {
  type CardStackHandle,
} from "../../components/CardStack/CardStack";
import Logo from "../../components/Logo/Logo";
import { IoFilter } from "react-icons/io5";
import FilterPanel from "../../components/DiscoverPage/FilterPanel";
import Navbar from "../../components/Navbar/Navbar";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import discoverPeopleQuery from "../../lib/tanstack-query/Discover/discoverPeopleQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import UpNextProfiles from "../../components/DiscoverPage/UpNextProfiles";
import type { SortedUser } from "../../types/discover";
import { useCallback, useEffect, useRef, useState } from "react";
import DiscoverEmptyState from "../../components/DiscoverPage/DiscoverEmptyState";
import SwipeButtons from "../../components/DiscoverPage/SwipeButtons";
import userListsQuery from "../../lib/tanstack-query/Discover/userListsQuery";
import DEFAULT_DISCOVER_FILTERS, {
  DISCOVER_QUICK_FILTERS,
  type DiscoverFilters,
} from "../../utils/constants/discover";
import RadioInput from "../../components/Input/RadioInput";
import MatchModal from "../../components/MatchModal/MatchModal";

const Discover = () => {
  const [filters, setFilters] = useState(DEFAULT_DISCOVER_FILTERS);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState(
    DISCOVER_QUICK_FILTERS[0]?.label ?? "",
  );
  const {
    data: discoveredPeople,
    isPending: isDiscoverPeoplePending,
    isError: isDiscoverPeopleError,
  } = useQuery(discoverPeopleQuery(filters));
  const {
    data: userLists,
    isPending: isUserListsPending,
    isError: isUserListsError,
  } = useQuery(userListsQuery());

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const cardStackRef = useRef<CardStackHandle>(null);

  const isPending = isDiscoverPeoplePending || isUserListsPending;
  const isError = isDiscoverPeopleError || isUserListsError;

  const handleSwipeProfile = useCallback((direction: 1 | -1) => {
    cardStackRef.current?.triggerTopSwipe(direction);
    handleGoAheadIndex();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        handleSwipeProfile(1);
      } else if (event.key === "ArrowLeft") {
        handleSwipeProfile(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwipeProfile]);

  const handleApplyFilters = (data: DiscoverFilters) => {
    setFilters(data);
  };

  const handleChangeQuickFilter = (
    option: (typeof DISCOVER_QUICK_FILTERS)[number],
  ) => {
    setSelectedQuickFilter(option.label);

    setCurrentIndex(0);

    setFilters({ ...DEFAULT_DISCOVER_FILTERS, ...option.value });
  };

  const handleGoAheadIndex = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (isPending) {
    return <LoadingOverlay show />;
  }
  if (isError) {
    throw new Error("An error occurred");
  }

  const excludedIds = new Set([
    ...(userLists?.connected ?? []),
    ...(userLists?.liked ?? []),
  ]);

  const nonRepititivePeople =
    discoveredPeople?.filter(
      (person: SortedUser) => !excludedIds.has(person.id),
    ) ?? [];

  const isProfileDiscoverFinished = currentIndex >= nonRepititivePeople.length;

  return (
    <>
      <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
        <Navbar />

        {/* Content column: takes whatever width is left beside the Navbar */}
        <div className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-[90%] sm:max-w-[85%]">
            <div className="flex items-center justify-between py-6 md:hidden">
              <Logo isShowText />
              <div className="flex items-center justify-center gap-x-2">
                <Link
                  to="/notifications"
                  type="button"
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
                >
                  <IoIosNotifications className="size-4" aria-hidden="true" />
                </Link>
                <button
                  popoverTarget="filter-modal"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor lg:hidden"
                >
                  <IoFilter className="h-3.5 w-3.5 text-SecondaryColor" />
                </button>
              </div>
            </div>

            {isProfileDiscoverFinished ? (
              <DiscoverEmptyState />
            ) : (
              <div className="flex lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start md:mt-12">
                <h3 className="hidden justify-self-center font-TitleFont text-2xl whitespace-nowrap text-SecondaryColor [writing-mode:vertical-rl] lg:block select-none">
                  Find someone worth the notification
                </h3>
                <CardStack
                  ref={cardStackRef}
                  people={nonRepititivePeople}
                  onChangeCurrentIndex={handleGoAheadIndex}
                />

                <UpNextProfiles
                  people={nonRepititivePeople}
                  currentIndex={currentIndex}
                />
              </div>
            )}

            <div className="flex justify-center lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start">
              <div className="hidden w-50 justify-self-start lg:block">
                <RadioInput
                  text="Quick filters"
                  options={DISCOVER_QUICK_FILTERS}
                  className="mt-2 flex-col"
                  selectedValue={selectedQuickFilter}
                  onChange={handleChangeQuickFilter}
                />
              </div>
              <SwipeButtons onSwipeButton={handleSwipeProfile} />
            </div>

            <section className="mt-10 hidden rounded-t-2xl border border-SecondaryColor/30 bg-SecondaryDarkBgColor px-8 py-6 lg:block">
              <FilterPanel
                onApplyFilters={handleApplyFilters}
                fieldsClassName="lg:grid lg:grid-cols-1 lg:items-end lg:gap-4"
              />
            </section>

            <div className="modal lg:hidden" id="filter-modal" popover="auto">
              <div className="modal-box absolute bottom-0 mx-auto w-dvw space-y-4 rounded-t-2xl bg-PrimaryDarkBgColor">
                <FilterPanel onApplyFilters={handleApplyFilters} />
              </div>
              <div className="modal-backdrop">
                <button popoverTarget="filter-modal" popoverTargetAction="hide">
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MatchModal />
    </>
  );
};

export default Discover;
