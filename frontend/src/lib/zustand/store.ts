import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import createUserSlice, { type UserSlice } from "./slices/createUserSlice";
import createOnboardingSlice, {
  type OnboardingSlice,
} from "./slices/createOnboardingSlice";
import createMatchModal, { type MatchModalSlice } from "./slices/createMatchModal";

type AppStore = UserSlice & OnboardingSlice & MatchModalSlice

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createUserSlice(...args),
        ...createOnboardingSlice(...args),
        ...createMatchModal(...args)
      }),
      {
        name: "ember-dating-store",
        partialize: (state) => ({
          user: state.user,
          onboardingDatas : state.onboardingDatas
        }),
      },
    ),
  ),
);

export default useAppStore;
