import type ButtonType from "./types";

const Button = ({ text, type = "button" , className = "" , ...props }: ButtonType) => {
  return (
    <button
      className={`btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2 disabled:bg-DisabledBtnBg ${className}`}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
