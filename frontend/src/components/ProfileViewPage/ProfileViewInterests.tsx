import type { ProfileViewInterestsType } from "./types";

const ProfileViewInterests = ({ interests }: ProfileViewInterestsType) => {
  return (
    <div className="mt-6">
      <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
        Interests
      </p>
      <div className="flex flex-wrap gap-2">
        {interests.length &&
          interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-TertiaryColor/60 bg-TertiaryColor/10 px-3.5 py-2 text-sm text-TertiaryColor"
            >
              {interest}
            </span>
          ))}
      </div>
      <p className="mt-2.5 text-xs text-SecondaryColor/50">
        3 interests in common with you
      </p>
    </div>
  );
};

export default ProfileViewInterests;
