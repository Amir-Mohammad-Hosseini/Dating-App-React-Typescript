const AddInterestInput = () => {
  return (
    <div className="mb-20">
      <div className="flex justify-between items-center gap-x-3">
        <input
          type="text"
          placeholder="Add your own"
          className="input basis-5/6 rounded-full py-5 bg-SecondaryDarkBgColor"
        />
        <button type="button" className="py-3 px-5 bg-HoverBtnBg rounded-full">
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
