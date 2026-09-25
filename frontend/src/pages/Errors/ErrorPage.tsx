import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { HiOutlineHome, HiOutlineRefresh } from "react-icons/hi";

const ErrorPage = () => {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : undefined;

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-PrimaryDarkBgColor px-6 text-center">
      <span className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-TertiaryColor/35 blur-3xl" />
      <span className="pointer-events-none absolute right-[12%] -bottom-24 size-56 rounded-full bg-TertiaryColor/15 blur-3xl" />

      <p className="relative font-TitleFont text-[120px] leading-none font-semibold text-SecondaryColor/15 sm:text-[160px]">
        {status ?? "!"}
      </p>

      <h1 className="relative -mt-4 font-ItalicFont text-4xl font-bold text-PrimaryColor sm:text-5xl">
        Something went off script.
      </h1>

      <p className="relative mt-3 max-w-[34ch] text-base text-SecondaryColor">
        An unexpected error happened. Try again, or head back home.
      </p>

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex h-14 items-center justify-center gap-2 rounded-[14px] border border-SecondaryColor/15 px-8 font-semibold text-PrimaryColor"
        >
          <HiOutlineRefresh className="size-5" />
          Try again
        </button>
        <Link
          to="/"
          className="flex h-14 items-center justify-center gap-2 rounded-[14px] bg-TertiaryColor px-8 font-semibold text-white shadow-[0_10px_26px_rgba(245,67,90,0.32)]"
        >
          <HiOutlineHome className="size-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;