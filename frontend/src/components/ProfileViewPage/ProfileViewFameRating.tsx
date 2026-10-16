import { showPopularityRatingText } from "../../utils/constants/profileView";
import type { ProfileViewFameRatingType } from "./types";

const ProfileViewFameRating = ({ fameRating }: ProfileViewFameRatingType) => {
  const popularityText = showPopularityRatingText(fameRating);
  return (
    <div className="mt-6">
      <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
        Fame rating
      </p>
      <div className="mb-2 flex justify-between text-sm text-SecondaryColor">
        <span>{popularityText} this week</span>
        <b className="text-PrimaryColor">{fameRating}</b>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-SecondaryDarkBgColor">
        <div
          className="h-full rounded-full bg-linear-to-r from-TertiaryColor/70 to-TertiaryColor"
          style={{ width: `${fameRating}%` }}
        />
      </div>
    </div>
  );
};

export default ProfileViewFameRating;
