import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

import type { OnboardingData } from "../../../lib/zustand/slices/createOnboardingSlice";

const postOnboardingDatas = async (
  onboardingDatas: OnboardingData,
) => {
  const response = await customFetch.post(
    ENDPOINTS.ONBOARDING.SETUP,
    onboardingDatas,
  );

  return response;
};

export default postOnboardingDatas;