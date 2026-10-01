import customFetch from "../../../lib/axios/customFetch"
import type { OnboardingData } from "../../../lib/zustand/slices/createOnboardingSlice"

const postOnboardingDatas = async (onboardingDatas : OnboardingData) => {
    const response = await customFetch.post("profile/setup" , onboardingDatas)
    return response
}

export default postOnboardingDatas