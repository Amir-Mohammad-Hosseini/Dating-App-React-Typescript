import { Link } from "react-router";
import type MatchPersonType from "./types";
import usePresenceProfile from "../../hooks/Conversations/usePresenceProfile";
import LoadingOverlay from "../Loader/LoadingOverlay";

const MatchPerosn = ({ firstname, picture_data, user_id }: MatchPersonType) => {
  const { presenceProfile, isPresenceProfileQueryPending } =
    usePresenceProfile(user_id);
  if (isPresenceProfileQueryPending) {
    return <LoadingOverlay show />;
  }
  return (
    <li key={user_id} className="flex justify-center">
      <Link
        to={`/users/${user_id}`}
        className="group flex cursor-pointer flex-col items-center gap-2 text-center"
      >
        <span className="relative">
          <span className="grid size-20 place-items-center rounded-full font-TitleFont text-2xl overflow-hidden font-semibold text-white ring-2 ring-transparent transition group-hover:ring-TertiaryColor group-focus-visible:ring-TertiaryColor md:size-24 xl:size-30 xl:text-3xl">
            {picture_data ? (
              <img
                src={picture_data}
                alt={firstname}
                className="w-full h-full pointer-events-none"
              />
            ) : (
              <span>{firstname.slice(0, 1).toUpperCase()}</span>
            )}
          </span>
          {presenceProfile.is_online && (
            <span
              aria-hidden="true"
              className="absolute right-0 bottom-1 size-4 rounded-full border-[3px] border-PrimaryDarkBgColor bg-OnlineBgColor lg:bottom-2 lg:right-1 lg:size-6"
            />
          )}
        </span>
        <span>
          <span className="block font-PrimaryMediumFont">{firstname}</span>
        </span>
      </Link>
    </li>
  );
};

export default MatchPerosn;
