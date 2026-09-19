import type ButtonType from "./types";

const Button = ({ text, type = "button" , className = "" }: ButtonType) => {
  return (
    <button
      className={`btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2 disabled:bg-DisabledBtnBg ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
