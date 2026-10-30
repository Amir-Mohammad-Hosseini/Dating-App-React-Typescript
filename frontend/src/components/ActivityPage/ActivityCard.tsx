import { Link } from "react-router";
import { IoChatbubbleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import type { ActivityCardType } from "./types";
import whenActivityHappenedTime, {
  focusRingStyles,
} from "../../utils/activity";

const ActivityCard = ({ item, variant, onLike, liking }: ActivityCardType) => {
  const isMatch = item.connection_id !== null;
  const title = item.age ? `${item.firstname}, ${item.age}` : item.firstname;

  return (
    <div className="group relative flex items-center gap-3 rounded-2xl border border-white/5 bg-[#2E2F34] p-3 transition-colors hover:bg-[#34353B] sm:gap-4 sm:p-4">
      <Link
        to={`/users/${item.user_id}`}
        aria-label={`View ${item.firstname}'s profile`}
        className={`absolute inset-0 rounded-2xl ${focusRingStyles}`}
      />

      {/* Avatar */}
      <div className="relative shrink-0">
        {item.picture_data ? (
          <img
            src={item.picture_data}
            alt=""
            className="size-14 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-14 items-center justify-center rounded-full bg-TertiaryColor text-xl font-semibold text-white"
          >
            {item.firstname.charAt(0).toUpperCase()}
          </div>
        )}
        {item.is_online && (
          <span
            role="img"
            aria-label="Online"
            className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-[#2E2F34] bg-emerald-400"
          />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-PrimaryColor">{title}</p>
          {item.is_new && (
            <span
              role="img"
              aria-label="New"
              className="size-2 shrink-0 rounded-full bg-TertiaryColor shadow-[0_0_8px_#F5435A]"
            />
          )}
          {isMatch && (
            <span className="hidden shrink-0 rounded-full bg-TertiaryColor/15 px-2 py-0.5 text-[11px] font-medium text-TertiaryColor sm:inline">
              Match
            </span>
          )}
        </div>
        <p className="truncate text-sm text-[#A3A8B0]">
          {whenActivityHappenedTime(item, variant)}
        </p>
      </div>

      {/* Action */}
      <div className="relative z-10 shrink-0">
        {isMatch ? (
          <Link
            to={`/messages/${item.connection_id}`}
            aria-label={`Message ${item.firstname}`}
            className={`inline-flex items-center gap-1.5 rounded-full border border-PrimaryColor/30 px-3 py-2 text-sm font-medium text-PrimaryColor transition-colors hover:border-TertiaryColor hover:text-TertiaryColor ${focusRingStyles}`}
          >
            <IoChatbubbleOutline aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Message</span>
          </Link>
        ) : item.i_liked ? (
          <button
            type="button"
            disabled
            aria-label={`You liked ${item.firstname}`}
            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-[#A3A8B0]"
          >
            <IoHeart aria-hidden="true" className="size-4 text-TertiaryColor" />
            <span>Liked</span>
          </button>
        ) : variant === "likes" ? (
          <button
            type="button"
            onClick={() => onLike?.(item.user_id)}
            disabled={liking}
            aria-label={`Like ${item.firstname} back`}
            className={`inline-flex items-center gap-1.5 rounded-full bg-TertiaryColor px-3.5 py-2 text-sm font-semibold text-PrimaryDarkBgColor transition-opacity hover:opacity-90 disabled:opacity-60 ${focusRingStyles}`}
          >
            <IoHeart aria-hidden="true" className="size-4" />
            <span>Like back</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onLike?.(item.user_id)}
            disabled={liking}
            aria-label={`Like ${item.firstname}`}
            className={`inline-flex items-center gap-1.5 rounded-full border border-TertiaryColor px-3.5 py-2 text-sm font-semibold text-TertiaryColor transition-colors hover:bg-TertiaryColor hover:text-PrimaryDarkBgColor disabled:opacity-60 ${focusRingStyles}`}
          >
            <IoHeartOutline aria-hidden="true" className="size-4" />
            <span>Like</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
