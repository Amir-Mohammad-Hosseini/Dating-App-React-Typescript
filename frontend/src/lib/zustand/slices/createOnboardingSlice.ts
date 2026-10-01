import type { StateCreator } from "zustand";

export type OnboardingData = {
  gender: string;
  age: number | null;
  sexual_pref: string;
  biography: string;
  tags: string[];
  location: string;
  gps: [number, number] | null;
};

export type OnboardingSlice = {
  onboardingDatas: OnboardingData;

  step: number;
  setStep: (step: number) => void;

  setField: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;

  reset: () => void;
};

const initialState: OnboardingData = {
  gender: "",
  age: null,
  sexual_pref: "",
  biography: "",
  tags: [],
  location: "",
  gps: null,
};

const createOnboardingSlice: StateCreator<
  OnboardingSlice,
  [],
  [],
  OnboardingSlice
> = (set) => ({
  onboardingDatas: initialState,

  step: 1,

  setStep: (step) => {
    set({ step });
  },

  setField: (key, value) => {
    set((state) => ({
      onboardingDatas: {
        ...state.onboardingDatas,
        [key]: value,
      },
    }));
  },

  reset: () => {
    set({
      onboardingDatas: initialState,
      step: 1,
    });
  },
});

export default createOnboardingSlice;
