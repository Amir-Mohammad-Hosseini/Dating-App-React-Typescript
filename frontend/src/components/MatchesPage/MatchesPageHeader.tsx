import { NotificationLogo } from "../NotificationLogo"
import type { MatchesPageHeaderType } from "./types"

const MatchesPageHeader = ({matchesCount} : MatchesPageHeaderType) => {
  return (
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-TitleFont text-3xl md:text-4xl">Matches</h1>
            <p className="mt-1 text-sm text-SecondaryColor md:text-base">
              {matchesCount} matches
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <NotificationLogo />
          </div>
        </header>
  )
}

export default MatchesPageHeader
