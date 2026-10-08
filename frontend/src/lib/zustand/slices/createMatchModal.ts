import type { StateCreator } from "zustand";
import type { SortedUser } from "../../../types/discover";

export type MatchInfo = {
  person: SortedUser;
  connectionId: number;
};

export type MatchModalSlice = {
  match : MatchInfo | null
  openMatchModal: (match:MatchInfo) => void;
  closeMatchModal: () => void;
};

const createMatchModal: StateCreator<MatchModalSlice, [], [], MatchModalSlice> = (
  set,
) => ({
  match : null,
  openMatchModal: (match) => set({ match }),
  closeMatchModal: () => set({ match : null }),
});

export default createMatchModal;
