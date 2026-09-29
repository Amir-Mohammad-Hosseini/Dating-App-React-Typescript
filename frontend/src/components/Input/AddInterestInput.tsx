import { useRef } from "react";

type AddInterestInputType = {
  onAddInterest: (interest: string) => void;
};
const AddInterestInput = ({ onAddInterest }: AddInterestInputType) => {
  const interestInputRef = useRef<HTMLInputElement>(null);

  const handleAddInterest = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const interestValue = interestInputRef.current!.value.trim();
    if (interestValue.length) {
      onAddInterest(interestValue);
      interestInputRef.current!.value = ""
    }
  };
  return (
    <div className="mb-20">
      <div className="flex justify-between items-center gap-x-3">
        <input
          ref={interestInputRef}
          type="text"
          placeholder="Add your own"
          className="input basis-5/6 rounded-full py-5 bg-SecondaryDarkBgColor"
        />
        <button
          type="button"
          className="py-3 px-5 bg-HoverBtnBg rounded-full cursor-pointer"
          onClick={handleAddInterest}
        >
          Add
        </button>
      </div>
      <p className="text-sm text-SecondaryColor mt-1.5">
        Shared interests decide who you see first.
      </p>
    </div>
  );
};

export default AddInterestInput;
