import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router";
import type ConversationOtherProfileType from "./types";

const ConversationOtherProfile = ({
  userId,
  profilePic,
  firstname,
  isOnline,
}: ConversationOtherProfileType) => {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link
        to="/messages"
        aria-label="Back to messages"
        className="grid size-9 shrink-0 place-items-center rounded-full text-SecondaryColor transition hover:text-PrimaryColor lg:hidden"
      >
        <GoChevronLeft className="size-5" aria-hidden="true" />
      </Link>

      <Link
        to={`/users/${userId}`}
        className="-mx-2 flex min-w-0 items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-SecondaryDarkBgColor/60"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt={firstname}
            className="size-11 rounded-full"
          />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full font-TitleFont text-lg text-PrimaryColor/90 bg-TertiaryColor">
            {firstname[0]}
          </span>
        )}

        <div className="min-w-0">
          <p className="font-PrimarySemiBoldFont">{firstname}</p>
          <p
            className={`text-sm ${isOnline ? "text-OnlineBgColor" : "text-SecondaryColor"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ConversationOtherProfile;
