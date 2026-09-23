import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { HiDotsHorizontal, HiOutlineLocationMarker } from "react-icons/hi";
import { FaTimes, FaHeart, FaStar, FaRegComment } from "react-icons/fa";

const ProfileView = () => {
  return (
    <div className="min-h-dvh w-full bg-PrimaryDarkBgColor sm:mx-auto sm:max-w-140 md:mx-0 md:max-w-none md:px-8 md:pb-10 lg:px-12 xl:px-16">
      <div
        className="grid grid-cols-1 [grid-template-areas:'photo'_'info'_'moments'_'actions']
          md:grid-cols-[320px_1fr] md:gap-x-8
          md:[grid-template-areas:'top_top'_'photo_info'_'actions_info'_'moments_moments']
          lg:grid-cols-[400px_1fr] lg:gap-x-12
          xl:grid-cols-[440px_1fr_360px] xl:gap-x-14
          xl:[grid-template-areas:'top_top_top'_'photo_info_moments'_'actions_info_moments']"
      >
        {/* Topbar */}
        <div className="absolute inset-x-0 top-0 z-10 mt-4 flex items-center justify-between p-4 md:static md:z-auto md:[grid-area:top] md:p-0 md:pb-5">
          <button
            aria-label="Back"
            className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none"
          >
            <GoChevronLeft className="size-5" />
          </button>
          <span className="hidden text-base font-semibold text-PrimaryColor md:block">Profile</span>
          <button
            aria-label="More options"
            className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none"
          >
            <HiDotsHorizontal className="size-5" />
          </button>
        </div>

        {/* Photo */}
        <div className="relative [grid-area:photo]">
          <div className="relative h-115 overflow-hidden bg-SecondaryDarkBgColor md:aspect-4/5 md:h-auto md:rounded-[28px]">
            <span className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-TertiaryColor/35 blur-3xl" />
            <span className="pointer-events-none absolute right-[12%] -bottom-20 size-56 rounded-full bg-TertiaryColor/15 blur-3xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-TitleFont text-[190px] font-semibold text-PrimaryColor/10 md:text-[150px] lg:text-[190px]">
                K
              </span>
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-PrimaryDarkBgColor/90 to-transparent to-48% md:hidden" />

            {/* segments */}
            <div className="absolute inset-x-4 top-3.5 z-10 flex gap-1.5">
              <span className="h-0.75 flex-1 rounded-full bg-white" />
              <span className="h-0.75 flex-1 rounded-full bg-white/30" />
              <span className="h-0.75 flex-1 rounded-full bg-white/30" />
              <span className="h-0.75 flex-1 rounded-full bg-white/30" />
            </div>

            {/* nav arrows */}
            <button
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:flex"
            >
              <GoChevronLeft className="size-5" />
            </button>
            <button
              aria-label="Next photo"
              className="absolute top-1/2 right-3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:flex"
            >
              <GoChevronRight className="size-5" />
            </button>

            {/* name overlay — mobile only */}
            <div className="absolute inset-x-5 bottom-12 z-10 md:hidden">
              <div className="flex items-end gap-3">
                <h1 className="font-ItalicFont text-4xl font-bold text-white">Kian</h1>
                <span className="font-TitleFont text-2xl text-white/70">26</span>
              </div>
              <p className="mt-1.5 text-sm text-white/75">Grad student · 3 km away · Active today</p>
            </div>
          </div>

          {/* thumbnails */}
          <div className="mt-2.5 hidden grid-cols-4 gap-2.5 lg:grid">
            <span className="aspect-square rounded-InputRadius border-2 border-TertiaryColor bg-SecondaryDarkBgColor" />
            <span className="aspect-square rounded-InputRadius border-2 border-transparent bg-SecondaryDarkBgColor" />
            <span className="aspect-square rounded-InputRadius border-2 border-transparent bg-SecondaryDarkBgColor" />
            <span className="aspect-square rounded-InputRadius border-2 border-transparent bg-SecondaryDarkBgColor" />
          </div>
        </div>

        {/* Info */}
        <div className="-mt-7 rounded-t-[28px] bg-PrimaryDarkBgColor px-5 pt-7 pb-2 [grid-area:info] md:mt-0 md:rounded-none md:bg-transparent md:px-0 md:pt-0">
          {/* head — md+ */}
          <div className="hidden md:block">
            <div className="flex items-end gap-3">
              <h1 className="font-ItalicFont text-[40px] font-bold text-PrimaryColor lg:text-[44px]">Kian</h1>
              <span className="font-TitleFont text-3xl text-SecondaryColor">26</span>
            </div>
            <p className="mt-1.5 text-SecondaryColor">Grad student</p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor px-3 py-1.5 text-sm text-SecondaryColor">
                <HiOutlineLocationMarker className="size-3.5" />
                3 km away
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor px-3 py-1.5 text-sm text-SecondaryColor">
                <span className="size-2 rounded-full bg-emerald-400" />
                Active today
              </span>
            </div>
          </div>

          {/* about */}
          <div className="mt-6">
            <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
              About
            </p>
            <p className="text-base leading-relaxed text-PrimaryColor">
              Half through a thesis, fully through my patience. Good listener, better cook.
            </p>
          </div>

          {/* interests */}
          <div className="mt-6">
            <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-TertiaryColor/60 bg-TertiaryColor/10 px-3.5 py-2 text-sm text-TertiaryColor">
                Cooking
              </span>
              <span className="rounded-full border border-TertiaryColor/60 bg-TertiaryColor/10 px-3.5 py-2 text-sm text-TertiaryColor">
                Reading
              </span>
              <span className="rounded-full border border-TertiaryColor/60 bg-TertiaryColor/10 px-3.5 py-2 text-sm text-TertiaryColor">
                Hiking
              </span>
              <span className="rounded-full border border-SecondaryColor/20 px-3.5 py-2 text-sm text-SecondaryColor">
                Photography
              </span>
              <span className="rounded-full border border-SecondaryColor/20 px-3.5 py-2 text-sm text-SecondaryColor">
                Jazz
              </span>
              <span className="rounded-full border border-SecondaryColor/20 px-3.5 py-2 text-sm text-SecondaryColor">
                Cats
              </span>
            </div>
            <p className="mt-2.5 text-xs text-SecondaryColor/50">3 interests in common with you</p>
          </div>

          {/* basics */}
          <div className="mt-6">
            <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
              Basics
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-InputRadius border border-SecondaryColor/15 bg-SecondaryDarkBgColor px-3.5 py-3">
                <small className="block text-xs text-SecondaryColor/50">Gender</small>
                <b className="text-[15px] font-medium text-PrimaryColor">Man</b>
              </div>
              <div className="rounded-InputRadius border border-SecondaryColor/15 bg-SecondaryDarkBgColor px-3.5 py-3">
                <small className="block text-xs text-SecondaryColor/50">Interested in</small>
                <b className="text-[15px] font-medium text-PrimaryColor">Women</b>
              </div>
            </div>
          </div>

          {/* fame */}
          <div className="mt-6">
            <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
              Fame rating
            </p>
            <div className="mb-2 flex justify-between text-sm text-SecondaryColor">
              <span>Popular this week</span>
              <b className="text-PrimaryColor">72</b>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-SecondaryDarkBgColor">
              <div className="h-full w-[72%] rounded-full bg-linear-to-r from-TertiaryColor/70 to-TertiaryColor" />
            </div>
          </div>
        </div>

        {/* Moments */}
        <div className="mt-6 [grid-area:moments] md:mt-9 xl:mt-0">
          <p className="mb-2.5 font-TitleFont text-xs font-semibold tracking-[0.14em] text-SecondaryColor/60 uppercase">
            Moments
          </p>
          <article className="rounded-[20px] border border-SecondaryColor/15 bg-SecondaryDarkBgColor p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9.5 items-center justify-center rounded-full border-2 border-TertiaryColor bg-linear-to-br from-[#5b2a36] to-[#33242a] font-ItalicFont text-base text-[#f0cdd3]">
                K
              </div>
              <div>
                <b className="block text-sm font-semibold text-PrimaryColor">Kian</b>
                <small className="text-xs text-SecondaryColor/50">Bali, Indonesia · 3 min ago</small>
              </div>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-PrimaryColor">
              Today I'm walking on the beach with friends.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <span className="aspect-4/5 rounded-InputRadius bg-linear-to-br from-[#3a3b42] to-[#2a2b30]" />
              <span className="aspect-4/5 rounded-InputRadius bg-linear-to-br from-[#4a3a40] to-[#2a2b30]" />
            </div>
            <div className="mt-3 flex items-center gap-4.5 text-sm text-SecondaryColor">
              <span className="flex items-center gap-1.5">
                <FaHeart className="size-4.5 text-TertiaryColor" />
                953
              </span>
              <span className="flex items-center gap-1.5">
                <FaRegComment className="size-4.5" />
                78
              </span>
            </div>
          </article>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 z-10 -mx-4 flex items-center justify-center gap-5 bg-linear-to-t from-PrimaryDarkBgColor px-4 pt-3.5 pb-5 [grid-area:actions] md:static md:mx-0 md:bg-none md:px-0 md:pt-0 md:pb-0 lg:mt-6">
          <button
            aria-label="Pass"
            className="flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-PrimaryColor"
          >
            <FaTimes className="size-5" />
          </button>
          <button
            aria-label="Like"
            className="flex size-21 items-center justify-center rounded-full bg-TertiaryColor text-white shadow-[0_12px_34px_rgba(245,67,90,0.45)]"
          >
            <FaHeart className="size-8.5" />
          </button>
          <button
            aria-label="Super like"
            className="flex size-15 items-center justify-center rounded-full border border-SecondaryColor/20 bg-SecondaryDarkBgColor text-TertiaryColor"
          >
            <FaStar className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;