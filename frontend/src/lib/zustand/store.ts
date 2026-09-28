import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import createUserSlice, { type UserSlice } from "./slices/createUserSlice";
import createOnboardingSlice, {
  type OnboardingSlice,
} from "./slices/createOnboardingSlice";

type AppStore = UserSlice & OnboardingSlice;

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createUserSlice(...args),
        ...createOnboardingSlice(...args),
      }),
      {
        name: "ember-dating-store",
        partialize: (state) => ({
          user: state.user,
        }),
      },
    ),
  ),
);

export default useAppStore;
