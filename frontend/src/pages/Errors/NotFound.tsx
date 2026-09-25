import { Link } from "react-router";
import { HiOutlineHome } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-PrimaryDarkBgColor px-6 text-center">
      <span className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-TertiaryColor/35 blur-3xl" />
      <span className="pointer-events-none absolute right-[12%] -bottom-24 size-56 rounded-full bg-TertiaryColor/15 blur-3xl" />

      <p className="relative font-TitleFont text-[120px] leading-none font-semibold text-SecondaryColor/15 sm:text-[160px] mb-4">
        404
      </p>

      <h1 className="relative -mt-4 font-ItalicFont text-4xl font-bold text-PrimaryColor sm:text-5xl">
        Nobody swiped this way.
      </h1>

      <p className="relative mt-3 max-w-[32ch] text-base text-SecondaryColor">
        The page you're looking for doesn't exist or may have moved.
      </p>

      <Link
        to="/"
        className="relative mt-8 flex h-14 items-center justify-center gap-2 rounded-[14px] bg-TertiaryColor px-8 font-semibold text-white shadow-[0_10px_26px_rgba(245,67,90,0.32)]"
      >
        <HiOutlineHome className="size-5" />
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;