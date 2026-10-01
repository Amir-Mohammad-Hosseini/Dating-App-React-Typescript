import { GoCheck } from "react-icons/go";
import useAppStore from "../../lib/zustand/store";
import Button from "../../components/Button/Button";
const YouAreDone = () => {
  const userFirstname = useAppStore((state) => state.user)?.firstname
  const step = useAppStore((state) => state.step)
  const setStep = useAppStore((state) => state.setStep)



const handleGoPrevPage = () => {
  setStep(step -1)
}
  const handlegoNextPage = () => {
    // setStep(step -1)
  }
  return (
    <div>
      <div className="mx-auto mt-12 relative flex items-center justify-center">
        <span className="w-30 h-30 rounded-full absolute bg-TertiaryColor/10"></span>
        <span className="w-26 h-26 rounded-full absolute bg-TertiaryColor/30"></span>
        <span className="relative flex items-center justify-center w-22 h-22 bg-TertiaryColor rounded-full">
          <GoCheck size={26} className="-mb-1" />
        </span>
      </div>
      <div className="my-8 text-center">
        <h1 className="mb-1.5 font-ItalicFont text-3xl">You’re in, {userFirstname}.</h1>
        <p className="text-lg text-SecondaryColor">
          Your profile is live and matching starts now. You can change anything
          later from your profile.
        </p>
      </div>

            <div className="mx-auto flex w-full gap-3 lg:max-w-100">
        <button
          type="button"
          onClick={handleGoPrevPage}
          className="hidden rounded-xl border border-SecondaryColor/30 px-6 font-bold transition hover:border-PrimaryColor md:block"
        >
          Back
        </button>

        <div className="flex-1">
          <Button
          onClick={handlegoNextPage}
            text="Continue"
            type="submit"
            className="my-0! rounded-xl font-bold shadow-lg shadow-TertiaryColor/30"
            submittingText="Submitting..."
            isSubmitting={false}
          />
        </div>
      </div>
    </div>
  );
};

export default YouAreDone;
