import type { StateCreator } from "zustand";

export type OnboardingSlice = {
  gender: string;
  age: number | null;
  sexualPref: string;
  biography: string;
  tags: string[];
  location: string;
  gps: [number, number] | null;
  mainPhoto: File | null;
  otherPhotos: File[];

  setField: <K extends keyof OnboardingSlice>(key: K, value: OnboardingSlice[K]) => void;
  reset: () => void;
};

const initialState = {
  gender: "",
  age: null,
  sexualPref: "",
  biography: "",
  tags: [],
  location: "",
  gps: null,
  mainPhoto: null,
  otherPhotos: [],
};
const createOnboardingSlice : StateCreator<OnboardingSlice , [] , [] , OnboardingSlice> = (set) => ({
    ...initialState,
    setField : (key , value) => set({ [key] : value}),
    reset : () => set(initialState)
})

export default createOnboardingSlice