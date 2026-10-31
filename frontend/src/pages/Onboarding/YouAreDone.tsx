import { GoCheck } from "react-icons/go";
import useYouAreDone from "./useYouAreDone";
import { OnboardingLayoutHeader } from "../../components/Onboarding";

const YouAreDone = () => {
  const { userFirstname, handleSubmitOnboardingDatas } = useYouAreDone();

  return (
    <form id="onboarding-form" onSubmit={handleSubmitOnboardingDatas}>
      <div className="mx-auto mt-12 relative flex items-center justify-center">
        <span className="w-30 h-30 rounded-full absolute bg-TertiaryColor/10"></span>
        <span className="w-26 h-26 rounded-full absolute bg-TertiaryColor/30"></span>
        <span className="relative flex items-center justify-center w-22 h-22 bg-TertiaryColor rounded-full">
          <GoCheck size={26} className="-mb-1" />
        </span>
      </div>
      <OnboardingLayoutHeader
        title={`You’re in, ${userFirstname}.`}
        text="Your profile is live and matching starts now. You can change anything
          later from your profile."
      />
    </form>
  );
};

export default YouAreDone;
