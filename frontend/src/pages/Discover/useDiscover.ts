import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import discoverPeopleQuery from "../../lib/tanstack-query/Discover/discoverPeopleQuery";
import userListsQuery from "../../lib/tanstack-query/Discover/userListsQuery";
import type { SortedUser } from "../../types/discover";
import DEFAULT_DISCOVER_FILTERS, {
  DISCOVER_QUICK_FILTERS,
  type DiscoverFilters,
} from "../../utils/constants/discover";
import type { CardStackHandle } from "../../components/CardStack/CardStack";

const useDiscover = () => {
  const [filters, setFilters] = useState<DiscoverFilters>(
    DEFAULT_DISCOVER_FILTERS,
  );
  const [selectedQuickFilter, setSelectedQuickFilter] = useState(
    DISCOVER_QUICK_FILTERS[0]?.label ?? "",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardStackRef = useRef<CardStackHandle>(null);

  const {
    data: discoveredPeople,
    isPending: isDiscoverPeoplePending,
    isError: isDiscoverPeopleError,
    // true while the results of the NEW filters are loading
    isPlaceholderData: isFetchingNewFilters,
  } = useQuery({
    ...discoverPeopleQuery(filters),
    placeholderData: keepPreviousData,
  });

  const {
    data: userLists,
    isPending: isUserListsPending,
    isError: isUserListsError,
  } = useQuery(userListsQuery());

  // Only true on the very first load (no data at all yet)
  const isPending = isDiscoverPeoplePending || isUserListsPending;

  // Only a real error when there is no data to show
  const isError =
    (isDiscoverPeopleError && !discoveredPeople) ||
    (isUserListsError && !userLists);

  const availablePeople = useMemo(() => {
    const excludedIds = new Set([
      ...(userLists?.connected ?? []),
      ...(userLists?.liked ?? []),
    ]);

    return (discoveredPeople ?? []).filter(
      (person: SortedUser) => !excludedIds.has(person.id),
    );
  }, [discoveredPeople, userLists]);

  const isProfileDiscoverFinished = currentIndex >= availablePeople.length;

  const handleGoAheadIndex = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleSwipeProfile = useCallback(
    (direction: 1 | -1) => {
      if (isProfileDiscoverFinished) return;

      cardStackRef.current?.triggerTopSwipe(direction);
      handleGoAheadIndex();
    },
    [isProfileDiscoverFinished, handleGoAheadIndex],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping) return;

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
    setCurrentIndex(0);
  };

  const handleChangeQuickFilter = (
    option: (typeof DISCOVER_QUICK_FILTERS)[number],
  ) => {
    setSelectedQuickFilter(option.label);
    setCurrentIndex(0);
    setFilters({ ...DEFAULT_DISCOVER_FILTERS, ...option.value });
  };

  return {
    selectedQuickFilter,
    isProfileDiscoverFinished,
    isPending,
    isError,
    isFetchingNewFilters,
    handleApplyFilters,
    handleChangeQuickFilter,
    cardStackRef,
    availablePeople,
    handleGoAheadIndex,
    currentIndex,
    handleSwipeProfile,
  };
};

export default useDiscover;