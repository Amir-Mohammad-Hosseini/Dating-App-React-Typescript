import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";

const BlockedAccounts = () => {
  return (
    <main className="min-h-screen bg-PrimaryDarkBgColor px-4 py-6 text-PrimaryColor sm:px-6 md:py-10">
      <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
        <header className="mb-6 flex items-center gap-3">
          <Link
            to="/settings"
            aria-label="Back to settings"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-SecondaryDarkBgColor text-PrimaryColor transition hover:bg-TertiaryDarkBgColor"
          >
            <FaChevronLeft className="size-3" />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Blocked accounts
            </h1>
            <p className="text-sm text-PrimaryColor/60">
              People you block can't see your profile or message you.
            </p>
          </div>
        </header>

        {/* List */}
        <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-PrimaryDarkBgColor/30">
          <li className="flex items-center gap-3 p-4 sm:gap-4">
            <img
              src="https://i.pravatar.cc/120?img=12"
              alt="Alex"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10 sm:h-14 sm:w-14"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">Alex Johnson</p>
              <p className="truncate text-sm text-PrimaryColor/60">@alex_j</p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full border border-TertiaryColor/60 px-4 py-1.5 text-sm font-medium text-terborder-TertiaryColor transition hover:bg-TertiaryColor hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5435A]/60 disabled:opacity-50"
            >
              Unblock
            </button>
          </li>

          <li className="flex items-center gap-3 p-4 sm:gap-4">
            <img
              src="https://i.pravatar.cc/120?img=32"
              alt="Sara"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10 sm:h-14 sm:w-14"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">Sara Miller</p>
              <p className="truncate text-sm text-PrimaryColor">@sara_m</p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full border border-TertiaryColor/60 px-4 py-1.5 text-sm font-medium text-TertiaryColor transition hover:bg-tertext-TertiaryColor hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-tertext-TertiaryColor/60 disabled:opacity-50"
            >
              Unblock
            </button>
          </li>
        </ul>

        {/* Empty state (show instead of the list when nobody is blocked) */}
        <div className="mt-6 hidden flex-col items-center rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tertext-TertiaryColor/10 text-TertiaryColor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M5.6 5.6l12.8 12.8" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">No blocked accounts</h2>
          <p className="mt-1 max-w-xs text-sm text-SecondaryColor">
            When you block someone, they'll show up here so you can unblock them later.
          </p>
        </div>
      </div>
    </main>
  );
}
export default BlockedAccounts