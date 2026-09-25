import type ButtonType from "./types";

const Button = ({ text, type = "button" , className = "" , isSubmitting , submittingText , ...props }: ButtonType) => {
  return (
    <button
    disabled={isSubmitting}
      className={`btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2 disabled:bg-DisabledBtnBg ${className}`}
      type={type}
      {...props}
    >
      {isSubmitting ? submittingText :text}
    </button>
  );
};

export default Button;
