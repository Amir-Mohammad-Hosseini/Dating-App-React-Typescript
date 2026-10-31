import { CiLock } from "react-icons/ci"
import { Link } from "react-router"
import type { LockedLikedYouType } from "./types"

const LockedLikedYou = ({likersCount} : LockedLikedYouType) => {
  return (
        <section className="mt-8" aria-labelledby="likes-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="likes-heading" className="font-PrimarySemiBoldFont text-lg">
              Likes you
              <span className="text-SecondaryColor"> · {likersCount}</span>
            </h2>
            <Link
              to="/pro"
              className="cursor-pointer font-PrimarySemiBoldFont text-sm text-TertiaryColor transition hover:text-HoverBtnBg"
            >
              See all
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-SecondaryColor/30">
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
                {likersCount} people already liked you
              </p>
              <Link
                to="/pro"
                type="button"
                className="cursor-pointer rounded-full bg-TertiaryColor px-6 py-2.5 font-PrimarySemiBoldFont text-white transition hover:bg-HoverBtnBg"
              >
                Upgrade to see who
              </Link>
            </div>
          </div>
        </section>
  )
}

export default LockedLikedYou
