import HeroBanner from "../../components/HeroBanner/HeroBanner"
import Logo from "../../components/Logo/Logo"
import type AuthLayoutType from "./types"

const AuthLayout = ({children , bannerText , title , description}: AuthLayoutType) => {
  return (
    <div className="flex flex-col min-h-dvh font-PrimaryFont md:flex-row">
      <HeroBanner text={bannerText} />
      <div className="p-8 bg-PrimaryDarkBgColor md:w-3/5 lg:w-7/12 md:self-center md:pl-20">
        <Logo isShowText />
        <div className="pb-4 sm:pb-6 max-w-96">
          <h1 className="font-TitleFont text-3xl pt-6 pb-2">{title}</h1>
          <p className="text-SecondaryColor text-lg">
            {description}
          </p>
        </div>
        <form className=" flex flex-col gap-y-2 max-w-96">
          {children}
        </form>
      </div>
    </div>
  )
}

export default AuthLayout
