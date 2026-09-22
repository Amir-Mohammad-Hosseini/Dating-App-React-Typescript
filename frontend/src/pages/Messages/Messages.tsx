import { IoFilter } from "react-icons/io5";
import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import SearchInput from "../../components/Input/SearchInput";

const Messages = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        {/* top of page */}
        <div className="flex items-center justify-between w-full">
          <Logo isShowText={false} />
          <button
            popoverTarget="filter-modal"
            className="w-10 h-10 rounded-full bg-PrimaryDarkBgColor border border-SecondaryColor flex items-center justify-center cursor-pointer"
          >
            <IoFilter className="text-SecondaryColor w-3.5 h-3.5" />
          </button>
        </div>
        <main>
          <section className="py-4">
            <div>
              <h1 className="font-ItalicFont text-3xl">Messages</h1>
              <SearchInput />
            </div>
            <div>
              <p className="text-xs text-SecondaryColor">New matches</p>
              <div className="carousel carousel-center max-w-md space-x-4 my-4">
                <div className="carousel-item flex flex-col gap-y-1">
                  <div className="rounded-full border-2 border-TertiaryColor size-15 bg-linear-to-br from-[#ea4a61] to-[#7d2b3a] flex items-center justify-center">
                    <p className="font-TitleFont text-PrimaryColor/90 text-2xl">
                      S
                    </p>
                  </div>
                  <span className="text-center text-SecondaryColor">Amir</span>
                </div>
                <div className="carousel-item flex flex-col gap-y-1">
                  <div className="rounded-full border-2 border-TertiaryColor size-15 bg-linear-to-br from-[#c9cdd3] to-[#54575d] flex items-center justify-center">
                    <p className="font-TitleFont text-PrimaryColor/90 text-2xl">
                      S
                    </p>
                  </div>
                  <span className="text-center text-SecondaryColor">Amir</span>
                </div>
              </div>
            </div>
            {/* Wrapper of chates list */}
            <div className="flex flex-col mt-4">
              {/* Item */}
              <div className="flex items-start justify-between rounded-2xl transition hover:bg-SecondaryDarkBgColor/40 w-full cursor-pointer py-4 pr-4">
                <div className="flex items-center justify-start gap-x-3">
                  <div className="rounded-full border-2 border-TertiaryColor size-15 bg-linear-to-br from-[#ea4a61] to-[#7d2b3a] flex items-center justify-center">
                    <p className="font-TitleFont text-PrimaryColor/90 text-2xl">
                      S
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h5>Amir</h5>
                    <p className="truncate max-w-15/16">
                      Sent you the gallery thing
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-1">
                  <p>2m</p>
                  <div className="flex items-center justify-center text-SecondaryDarkBgColor size-5 bg-TertiaryColor rounded-full">
                    2
                  </div>
                </div>
              </div>
              {/* Item */}
              <div className="flex items-start justify-between rounded-2xl transition hover:bg-SecondaryDarkBgColor/40 w-full cursor-pointer py-4 pr-4">
                <div className="flex items-center justify-start gap-x-3">
                  <div className="rounded-full border-2 border-TertiaryColor size-15 bg-linear-to-br from-[#ea4a61] to-[#7d2b3a] flex items-center justify-center">
                    <p className="font-TitleFont text-PrimaryColor/90 text-2xl">
                      S
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h5>Amir</h5>
                    <p className="truncate max-w-15/16">
                      Sent you the gallery thing
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-1">
                  <p>2m</p>
                  <div className="flex items-center justify-center text-SecondaryDarkBgColor size-5 bg-TertiaryColor rounded-full">
                    2
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="hidden lg:block"></section>
        </main>
      </div>
    </div>
  );
};

export default Messages;
