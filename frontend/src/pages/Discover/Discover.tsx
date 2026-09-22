import CardStack from "../../components/CardStack/CardStack";
import Logo from "../../components/Logo/Logo";
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import RadioInput from "../../components/Input/RadioInput";
import FilterPanel from "../../components/DiscoverPage/FilterPanel";
import Navbar from "../../components/Navbar/Navbar";

const Discover = () => {
  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      {/* Content column: takes whatever width is left beside the Navbar */}
      <div className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[90%] sm:max-w-[85%]">
          <div className="flex items-center justify-between py-6">
            <Logo isShowText />
            <button
              popoverTarget="filter-modal"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor lg:hidden"
            >
              <IoFilter className="h-3.5 w-3.5 text-SecondaryColor" />
            </button>
          </div>

          <div className="flex lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start">
            <h3 className="hidden justify-self-center font-TitleFont text-2xl whitespace-nowrap text-SecondaryColor [writing-mode:vertical-rl] lg:block">
              Find someone worth the notification
            </h3>
            <CardStack />
            <div className="hidden justify-self-end lg:block">
              <p className="mb-4 text-right text-SecondaryColor">Up next</p>
              <ul className="space-y-4">
                <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
                  <p>Kevin</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                    K
                  </div>
                </li>
                <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
                  <p>Kevin</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                    K
                  </div>
                </li>
                <li className="flex items-center justify-center gap-x-2 text-PrimaryColor">
                  <p>Kevin</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
                    K
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center lg:grid lg:grid-cols-[1fr_23.75rem_1fr] lg:items-start">
            <div className="hidden w-50 justify-self-start lg:block">
              <RadioInput
                text="Quick filters"
                options={["Nearby", "22–29", "Active today"]}
                className="mt-2 flex-col"
              />
            </div>

            <div className="justify-self-center">
              <div className="mt-6 flex items-center justify-center gap-x-4">
                <div className="flex h-13.5 w-13.5 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor text-SecondaryColor transition hover:-translate-y-1 hover:border-PrimaryColor hover:text-PrimaryColor">
                  <FaTimes className="h-5 w-5" />
                </div>
                <div className="flex h-17 w-17 cursor-pointer items-center justify-center rounded-full bg-TertiaryColor text-SecondaryDarkBgColor shadow-lg shadow-TertiaryColor/40 transition hover:-translate-y-1 hover:border-PrimaryColor hover:bg-HoverBtnBg">
                  <FaHeart className="h-6.5 w-6.5" />
                </div>
                <div className="flex h-13.5 w-13.5 cursor-pointer items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor text-SecondaryColor transition hover:-translate-y-1 hover:border-TertiaryColor hover:text-TertiaryColor!">
                  <FaStar className="h-5 w-5" />
                </div>
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
          </div>

          <section className="mt-10 hidden rounded-t-2xl border border-SecondaryColor/30 bg-SecondaryDarkBgColor px-8 py-6 lg:block">
            <FilterPanel fieldsClassName="lg:grid lg:grid-cols-1 lg:items-end lg:gap-4" />
          </section>

          <div className="modal lg:hidden" id="filter-modal" popover="auto">
            <div className="modal-box absolute bottom-0 mx-auto w-dvw space-y-4 rounded-t-2xl bg-PrimaryDarkBgColor">
              <FilterPanel />
            </div>
            <div className="modal-backdrop">
              <button popoverTarget="filter-modal" popoverTargetAction="hide">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
