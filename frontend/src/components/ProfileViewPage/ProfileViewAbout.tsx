import type { ProfileViewAboutType } from "./types";

const ProfileViewAbout = ({ about }: ProfileViewAboutType) => {
  return (
    <>
      {about.length ? (
        <div className="mt-6">
          <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
            About
          </p>
          <p className="text-base leading-relaxed text-PrimaryColor">{about}</p>
        </div>
      ) : null}
    </>
  );
};

export default ProfileViewAbout;
