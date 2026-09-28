import type { StateCreator } from "zustand";
import type { User } from "../../../types/user";

export type UserSlice = {
  user: User | null;
  setUser: (user: User) => void;
  markProfileComplete: () => void;
  logoutUser: () => void;
};

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  markProfileComplete: () =>
    set((state) =>
      state.user ? { user: { ...state.user, hasProfile: true } } : state,
    ),
  logoutUser: () => set({ user: null }),
});

export default createUserSlice;
