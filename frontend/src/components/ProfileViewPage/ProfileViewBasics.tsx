import { GENDERS, INTERESTED_IN } from "../../utils/constants/onboarding"
import type { ProfileViewBasicsType } from "./types"

const ProfileViewBasics = ({gender , interestedIn} : ProfileViewBasicsType) => {

    const genderLabel = GENDERS.find(item => item.value === gender)?.label
    const interestedInLabel = INTERESTED_IN.find(item => item.value === interestedIn)?.label
  return (
          <div className="mt-6">
            <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
              Basics
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-InputRadius border border-SecondaryColor/15 bg-SecondaryDarkBgColor px-3.5 py-3">
                <small className="block text-xs text-SecondaryColor/50">
                  Gender
                </small>
                <b className="text-[15px] font-medium text-PrimaryColor">{genderLabel}</b>
              </div>
              <div className="rounded-InputRadius border border-SecondaryColor/15 bg-SecondaryDarkBgColor px-3.5 py-3">
                <small className="block text-xs text-SecondaryColor/50">
                  Interested in
                </small>
                <b className="text-[15px] font-medium text-PrimaryColor">
                  {interestedInLabel}
                </b>
              </div>
            </div>
          </div>
  )
}

export default ProfileViewBasics
