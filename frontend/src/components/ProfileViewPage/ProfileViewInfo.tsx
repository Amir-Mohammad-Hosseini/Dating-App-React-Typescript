import { HiOutlineLocationMarker } from "react-icons/hi";
import type { ProfileViewInfoType } from "./types";

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor px-3 py-1.5 text-sm text-SecondaryColor";

const ProfileViewInfo = ({
  firstname,
  username,
  age,
  isActive,
  distanceKm,
}: ProfileViewInfoType) => {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h1 className="font-ItalicFont text-4xl font-bold text-PrimaryColor md:text-[40px] lg:text-[44px]">
          {firstname}
        </h1>
        <span className="font-TitleFont text-2xl text-SecondaryColor md:text-3xl">
          {age}
        </span>
      </div>
      <p className="mt-1.5 text-SecondaryColor">@{username}</p>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {distanceKm !== null && (
          <span className={chipClass}>
            <HiOutlineLocationMarker className="size-3.5" />
            {distanceKm < 1
              ? "Less than 1 km away"
              : `${Math.round(distanceKm)} km away`}
          </span>
        )}

        {isActive ? (
          <span className={chipClass}>
            <span className="size-2 rounded-full bg-emerald-400" />
            Active today
          </span>
        ) : (
          <span className={chipClass}>
            <span className="size-2 rounded-full bg-red-600" />
            Not active
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileViewInfo;