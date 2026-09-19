import type HeroBannerType from "./types";

const HeroBanner = ({text} :HeroBannerType) => {
  return (
    <div className="w-full h-48 flex items-center justify-center bg-SecondaryDarkBgColor relative overflow-hidden sm:h-64 md:w-2/5 md:px-6 md:h-auto lg:w-5/12">
      <h2 className="font-ItalicFont text-2xl w-[85%] text-center z-20">
        {text}
      </h2>
      <div className="absolute w-45 h-45 blur-xl rounded-full z-10 opacity-80 bg-TertiaryColor -right-8 md:top-2"></div>
      <div className="hidden absolute w-45 h-45 blur-xl rounded-full z-10 opacity-80 bg-PrimaryColor -left-8 md:block md:bottom-2"></div>
    </div>
  );
};

export default HeroBanner;
