import type OnboardingLayoutHeaderType from "./types"

const OnboardingLayoutHeader = ({title , text}: OnboardingLayoutHeaderType) => {
  return (
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">{title}</h1>
        <p className="text-lg text-SecondaryColor">
          {text}
        </p>
      </div>
  )
}

export default OnboardingLayoutHeader
