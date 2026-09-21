import { FaHeart, FaTimes } from "react-icons/fa";

const Match = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-PrimaryDarkBgColor sm:bg-black/70 sm:backdrop-blur-sm">
      <div className="min-h-dvh sm:grid sm:place-items-center sm:p-8">
        <section
          className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-PrimaryDarkBgColor px-6 pt-16 pb-8 text-center
            sm:min-h-0 sm:w-full sm:max-w-md sm:rounded-3xl sm:border sm:border-PrimaryColor/15 sm:px-10 sm:pt-14 sm:pb-9 sm:shadow-2xl
            md:max-w-lg
            lg:min-h-120 lg:max-w-4xl lg:flex-row lg:items-stretch lg:p-0 lg:text-left
            xl:min-h-130 xl:max-w-5xl"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor text-SecondaryColor transition hover:-translate-y-0.5 hover:border-PrimaryColor hover:text-PrimaryColor"
          >
            <FaTimes className="size-4" />
          </button>

          <div className="mb-8 flex items-center justify-center lg:relative lg:mb-0 lg:flex-1 lg:overflow-hidden lg:bg-TertiaryDarkBgColor">
            <span className="pointer-events-none absolute -top-28 -left-28 size-72 rounded-full bg-TertiaryColor/35 blur-3xl" />
            <span className="pointer-events-none absolute right-[12%] -bottom-24 size-56 rounded-full bg-TertiaryColor/15 blur-3xl" />

            <div className="relative z-10 flex items-center lg:py-16">
              <div className="relative flex size-33 items-center justify-center overflow-hidden rounded-full border-4 border-PrimaryColor bg-PrimaryDarkBgColor font-ItalicFont text-6xl font-semibold text-PrimaryColor/90 italic sm:size-35 md:size-38 md:text-7xl xl:size-44">
                <span className="relative">A</span>
              </div>

              <div className="relative -ml-7 flex size-33 items-center justify-center overflow-hidden rounded-full border-4 border-TertiaryColor bg-PrimaryDarkBgColor font-ItalicFont text-6xl font-semibold text-PrimaryColor/90 italic sm:size-35 md:-ml-8 md:size-38 md:text-7xl xl:-ml-10 xl:size-44">
                <span className="absolute inset-0 bg-TertiaryColor/20" />
                <span className="relative">K</span>
              </div>

              <div className="absolute top-1/2 left-1/2 z-30 grid size-13 -translate-1/2 place-items-center rounded-full border-4 border-PrimaryDarkBgColor bg-TertiaryColor shadow-[0_0_34px_rgba(245,67,90,0.55)] lg:border-TertiaryDarkBgColor">
                <FaHeart className="size-5.5 text-PrimaryColor" />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center lg:flex-1 lg:items-start lg:justify-center lg:px-14 lg:py-16 xl:px-16 xl:py-18">
            <p className="text-xs font-semibold tracking-[0.14em] text-TertiaryColor uppercase">
              New match
            </p>
            <h2 className="mt-2.5 font-ItalicFont text-[2.5rem] leading-[1.1] font-semibold text-white italic md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem]">
              It's a match.
            </h2>
            <p className="mt-3 max-w-[32ch] text-base/relaxed text-SecondaryColor lg:max-w-[34ch]">
              You and Kian both said yes. Say hello while it's fresh.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 md:flex-row-reverse lg:flex-col">
              <button
                type="button"
                className="h-14 cursor-pointer rounded-InputRadius bg-TertiaryColor font-semibold text-PrimaryColor shadow-[0_10px_26px_rgba(245,67,90,0.32)] transition hover:brightness-110 md:flex-1 lg:flex-none"
              >
                Send a message
              </button>
              <button
                type="button"
                className="h-14 cursor-pointer rounded-InputRadius border border-PrimaryColor/15 font-semibold text-PrimaryColor transition hover:border-PrimaryColor/40 md:flex-1 lg:flex-none"
              >
                Keep swiping
              </button>
            </div>

            <p className="mt-4 text-sm text-SecondaryColor/70">
              Your match now lives in Messages.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Match;