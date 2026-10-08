import { FaHeart, FaStar, FaTimes } from "react-icons/fa"
import type { SwipeButtonsType } from "./types"

const SwipeButtons = ({onSwipeButton} : SwipeButtonsType) => {
  return (
                <div className="justify-self-center">
              <div className="mt-6 flex items-center justify-center gap-x-4">
                <button
                  onClick={() => onSwipeButton(-1)}
                  className="flex h-13.5 w-13.5 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor text-SecondaryColor transition hover:-translate-y-1 hover:border-PrimaryColor hover:text-PrimaryColor"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSwipeButton(1)}
                  className="flex h-17 w-17 cursor-pointer items-center justify-center rounded-full bg-TertiaryColor text-SecondaryDarkBgColor shadow-lg shadow-TertiaryColor/40 transition hover:-translate-y-1 hover:border-PrimaryColor hover:bg-HoverBtnBg"
                >
                  <FaHeart className="h-6.5 w-6.5" />
                </button>
                <button
                  onClick={() => onSwipeButton(1)}
                  className="flex h-13.5 w-13.5 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor text-SecondaryColor transition hover:-translate-y-1 hover:border-TertiaryColor hover:text-TertiaryColor!"
                >
                  <FaStar className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-4 mb-10 text-center text-sm text-SecondaryColor">
                Drag the card, tap a button, or use{" "}
                <span className="badge badge-xs rounded-sm border border-SecondaryColor text-SecondaryColor">
                  ←
                </span>{" "}
                <span className="badge badge-xs rounded-sm border border-SecondaryColor text-SecondaryColor">
                  →
                </span>{" "}
                <span className="badge badge-xs rounded-sm border border-SecondaryColor text-SecondaryColor">
                  ↑
                </span>
              </p>
            </div>
  )
}

export default SwipeButtons
