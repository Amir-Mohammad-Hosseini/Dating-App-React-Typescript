import type { TextButtonType } from "./types";

const TextButton = ({
  text,
  onClick,
  className = "",
  isSubmitting,
  submittingText,
}: TextButtonType) => {
  return (
    <button
      disabled={isSubmitting}
      onClick={onClick}
      type="button"
      className={`hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5 cursor-pointer ${className}`}
    >
      {isSubmitting ? submittingText : text}
    </button>
  );
};

export default TextButton;
