import { Link } from "react-router";
import { IoEyeOutline, IoHeartOutline, IoAlertCircleOutline } from "react-icons/io5";
import type { ActivityVariant } from "./types";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5435A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#25262A]";

type EmptyProps = { variant: ActivityVariant };

export function ActivityEmpty({ variant }: EmptyProps) {
  const isVisitors = variant === "visitors";
  const Icon = isVisitors ? IoEyeOutline : IoHeartOutline;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#2E2F34]">
        <Icon aria-hidden="true" className="size-8 text-[#A3A8B0]" />
      </div>
      <h2 className="font-display text-2xl italic text-[#DCE0E4]">
        {isVisitors ? "No visitors yet" : "No likes yet"}
      </h2>
      <p className="mt-2 max-w-xs text-sm text-[#A3A8B0]">
        {isVisitors
          ? "When someone views your profile, they will show up here."
          : "Keep your profile fresh and your photos up to date."}
      </p>
      {!isVisitors && (
        <Link
          to="/discover"
          className={`mt-6 rounded-full bg-[#F5435A] px-5 py-2.5 text-sm font-semibold text-[#25262A] transition-opacity hover:opacity-90 ${focusRing}`}
        >
          Go to Discover
        </Link>
      )}
    </div>
  );
}

export function ActivityError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#2E2F34]">
        <IoAlertCircleOutline aria-hidden="true" className="size-8 text-[#F5435A]" />
      </div>
      <h2 className="font-display text-2xl italic text-[#DCE0E4]">
        Couldn't load this list
      </h2>
      <button
        type="button"
        onClick={onRetry}
        aria-label="Try loading the list again"
        className={`mt-6 rounded-full border border-[#F5435A] px-5 py-2.5 text-sm font-semibold text-[#F5435A] transition-colors hover:bg-[#F5435A] hover:text-[#25262A] ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}

export default ActivityEmpty;
