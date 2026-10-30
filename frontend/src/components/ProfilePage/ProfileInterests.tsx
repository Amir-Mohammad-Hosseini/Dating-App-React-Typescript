import { AddInterestInput } from "../Input"
import InterestChip from "./InterestChip"
import type { ProfileInterestsType } from "./types"

const ProfileInterests = ({interests , onAddInterest , onDeleteInterest} : ProfileInterestsType) => {
  return (
        <section className="mx-6 mt-6">
          <h4 className="mb-3 text-xl font-semibold">Interests</h4>
          <div className="grid grid-cols-none gap-y-12 lg:grid-cols-2 items-start">
            {interests.length ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest: any) => (
                  <InterestChip
                    key={interest}
                    label={interest}
                    onDeleteInterest={onDeleteInterest}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-SecondaryColor">There is no interest</p>
            )}
            <AddInterestInput onAddInterest={onAddInterest} />
          </div>
        </section>
  )
}

export default ProfileInterests
