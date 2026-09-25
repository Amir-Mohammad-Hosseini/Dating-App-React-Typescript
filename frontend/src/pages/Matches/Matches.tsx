import { IoFilter } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Navbar from "../../components/Navbar/Navbar";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router";

type MatchItem = { name: string; status: "Active now" | "Matched" };

// Placeholder data until the real matches come from the backend
const MATCHES: MatchItem[] = [
  { name: "Sara K.", status: "Active now" },
  { name: "Milad R.", status: "Active now" },
  { name: "Nika", status: "Matched" },
  { name: "Ava", status: "Matched" },
  { name: "Darius", status: "Matched" },
  { name: "Leyla", status: "Active now" },
  { name: "Kian", status: "Active now" },
  { name: "Parisa", status: "Active now" },
  { name: "Yuki", status: "Active now" },
  { name: "Noor", status: "Matched" },
  { name: "Omid", status: "Matched" },
  { name: "Elena", status: "Active now" },
  { name: "Tara", status: "Matched" },
  { name: "Jonas", status: "Active now" },
  { name: "Mina", status: "Matched" },
  { name: "Reza", status: "Matched" },
  { name: "Sofia", status: "Matched" },
  { name: "Ali", status: "Matched" },
];

// Avatars alternate between a red and a grey gradient
const AVATAR_TONES = [
  "bg-linear-to-br from-[#ea4a61] to-[#7d2b3a]",
  "bg-linear-to-br from-[#c9cdd3] to-[#54575d]",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Matches = () => {
  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 px-6 pt-6 pb-28 sm:px-8 md:px-10 md:py-8 lg:px-12">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-TitleFont text-3xl md:text-4xl">Matches</h1>
            <p className="mt-1 text-sm text-SecondaryColor md:text-base">
              {MATCHES.length} matches · 3 new since your last visit
            </p>
          </div>
          {/* TODO: there is no #filter-modal on this page yet */}
          <div className="flex items-center justify-center gap-x-2">
            <Link
            to="/notifications"
              type="button"
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
            >
              <IoIosNotifications className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              popoverTarget="filter-modal"
              aria-label="Filter matches"
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-SecondaryColor/40 bg-PrimaryDarkBgColor text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor"
            >
              <IoFilter className="size-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Likes you (locked) */}
        <section className="mt-8" aria-labelledby="likes-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="likes-heading" className="font-PrimarySemiBoldFont text-lg">
              Likes you
              <span className="text-SecondaryColor"> · 23</span>
            </h2>
            <button
              type="button"
              className="cursor-pointer font-PrimarySemiBoldFont text-sm text-TertiaryColor transition hover:text-HoverBtnBg"
            >
              See all
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-SecondaryColor/30">
            {/* Blurred fake avatars behind the overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center gap-5 px-6"
            >
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  key={index}
                  className="size-20 shrink-0 animate-pulse rounded-full bg-TertiaryColor/35 blur-[6px] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>

            <div className="relative flex flex-col items-center gap-2 px-4 py-4 text-center">
              <CiLock
                className="text-TertiaryColor"
                size={18}
                aria-hidden="true"
              />
              <p className="font-PrimaryMediumFont">
                23 people already liked you
              </p>
              <button
                type="button"
                className="cursor-pointer rounded-full bg-TertiaryColor px-6 py-2.5 font-PrimarySemiBoldFont text-white transition hover:bg-HoverBtnBg"
              >
                Upgrade to see who
              </button>
            </div>
          </div>
        </section>

        {/* Your matches */}
        <section className="mt-10" aria-labelledby="matches-heading">
          <h2
            id="matches-heading"
            className="mb-4 font-PrimarySemiBoldFont text-lg"
          >
            Your matches
          </h2>

          {/* Columns follow the design: 3 → 4 → 3 (sidebar appears) → 4 → 5 */}
          <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {MATCHES.map((match, index) => (
              <li key={match.name} className="flex justify-center">
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-2 text-center"
                >
                  <span className="relative">
                    <span
                      className={`grid size-20 place-items-center rounded-full font-TitleFont text-2xl font-semibold text-white ring-2 ring-transparent transition group-hover:ring-TertiaryColor group-focus-visible:ring-TertiaryColor md:size-24 xl:size-30 xl:text-3xl ${
                        AVATAR_TONES[index % AVATAR_TONES.length]
                      }`}
                    >
                      {initials(match.name)}
                    </span>
                    {match.status === "Active now" && (
                      <span
                        aria-hidden="true"
                        className="absolute right-0 bottom-1 size-4 rounded-full border-[3px] border-PrimaryDarkBgColor bg-OnlineBgColor lg:bottom-2 lg:right-1 lg:size-6"
                      />
                    )}
                  </span>
                  <span>
                    <span className="block font-PrimaryMediumFont">
                      {match.name}
                    </span>
                    <span className="block text-xs text-SecondaryColor">
                      {match.status}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Matches;
