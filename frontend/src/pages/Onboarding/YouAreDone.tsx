import { GoCheck } from "react-icons/go";
const YouAreDone = () => {
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
        <h1 className="mb-1.5 font-ItalicFont text-3xl">You’re in, Kian.</h1>
        <p className="text-lg text-SecondaryColor">
          Your profile is live and matching starts now. You can change anything
          later from your profile.
        </p>
      </div>
    </div>
  );
};

export default YouAreDone;
