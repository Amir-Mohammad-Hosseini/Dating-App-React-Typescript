import CardStack from "../../components/CardStack/CardStack";
import Logo from "../../components/Logo/Logo";
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useRef } from "react";
import RangeInput from "../../components/Input/RangeInput";
import RadioInput from "../../components/Input/RadioInput";
import Button from "../../components/Button/Button";
const Discover = () => {
  return (
    <div className="max-w-[90%] mx-auto overflow-hidden sm:max-w-[85%]">
      <div className="flex items-center justify-between py-6">
        <Logo isShowText />
        <button
          popoverTarget="filter-modal"
          className="w-10 h-10 rounded-full bg-PrimaryDarkBgColor border border-SecondaryColor flex items-center justify-center cursor-pointer lg:hidden"
        >
          <IoFilter className="text-SecondaryColor w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex lg:items-start lg:grid lg:grid-cols-[1fr_23.75rem_1fr]">
        <h3 className="hidden lg:block font-TitleFont text-SecondaryColor text-2xl rotate-90 translate-y-55">
          Find someone worth the notification
        </h3>
        <CardStack />
        <div className="justify-self-end">
          <p className="text-right text-SecondaryColor mb-4">Up next</p>
          <ul className="space-y-4">
            <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
              <p>Kevin</p>
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                K
              </div>
            </li>
            <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
              <p>Kevin</p>
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                K
              </div>
            </li>
            <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
              <p>Kevin</p>
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                K
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-4 mt-6">
        <div className="w-13.5 h-13.5 rounded-full text-SecondaryColor bg-PrimaryDarkBgColor border border-SecondaryColor flex items-center justify-center cursor-pointer hover:-translate-y-1 hover:border-PrimaryColor hover:text-PrimaryColor transition">
          <FaTimes className="w-5 h-5" />
        </div>
        <div className="w-17 h-17 rounded-full bg-TertiaryColor text-SecondaryDarkBgColor flex items-center justify-center cursor-pointer hover:-translate-y-1 hover:border-PrimaryColor transition shadow-lg shadow-TertiaryColor/40 hover:bg-HoverBtnBg">
          <FaHeart className="w-6.5 h-6.5" />
        </div>
        <div className="w-13.5 h-13.5 rounded-full text-SecondaryColor bg-PrimaryDarkBgColor border border-SecondaryColor flex items-center justify-center cursor-pointer hover:-translate-y-1 hover:border-TertiaryColor hover:text-TertiaryColor! transition">
          <FaStar className="w-5 h-5" />
        </div>
      </div>
      <p className="text-center text-SecondaryColor text-sm mt-4 mb-10">
        Drag the card, tap a button, or use{" "}
        <span className="badge badge-xs text-SecondaryColor border border-SecondaryColor rounded-sm">
          ←
        </span>{" "}
        <span className="badge badge-xs text-SecondaryColor border border-SecondaryColor rounded-sm">
          →
        </span>{" "}
        <span className="badge badge-xs text-SecondaryColor border border-SecondaryColor rounded-sm">
          ↑
        </span>
      </p>

      <div className="modal" id="filter-modal" popover="auto">
        <div className="modal-box absolute bottom-0 w-dvw mx-auto rounded-t-2xl bg-PrimaryDarkBgColor space-y-4">
          <h3 className="font-bold font-TitleFont text-lg">
            Refine your stack
          </h3>
          <RangeInput
            text="Distance"
            name="distance"
            min={1}
            max={50}
            defaultValue="25"
            extraDescription="Up to 12 km"
          />
          <RangeInput
            text="Age range"
            name="ageRange"
            min={22}
            max={90}
            defaultValue="25"
            extraDescription="22–31"
          />
          <RadioInput />
          <Button text="Apply filters" className="text-SecondaryDarkBgColor" />
        </div>
        <div className="modal-backdrop">
          <button popoverTarget="filter-modal" popoverTargetAction="hide">
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
