import { Link } from "react-router";
import { AuthLayout } from "../../layouts";
import type SentForgotPasswordType from "./types";

const SentForgotPassword = ({
  sentTo,
  onClearSentTo,
}: SentForgotPasswordType) => {
  return (
    <AuthLayout
      bannerText="Everyone loses a password. Not a match."
      title="Check your inbox"
      description={`If an account exists for ${sentTo}, we've sent a link to reset your password.`}
    >
      <Link
        className="btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2"
        to="/login"
      >
        Back to login
      </Link>
      <p className="my-2 text-SecondaryColor text-sm">
        Nothing after a few minutes? Check your spam folder, or{" "}
        <button
          type="button"
          className="text-TertiaryColor font-bold cursor-pointer"
          onClick={onClearSentTo}
        >
          try again
        </button>
        .
      </p>
    </AuthLayout>
  );
};

export default SentForgotPassword;
