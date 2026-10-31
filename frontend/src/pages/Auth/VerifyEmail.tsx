import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { Link } from "react-router";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import useVerifyEmail from "./useVerifyEmail";

const VerifyEmail = () => {
  const { isVerifyEmailPending, isVerifyEmailError, verifyEmailError } =
    useVerifyEmail();

  if (isVerifyEmailPending) {
    return <LoadingOverlay show />;
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-PrimaryDarkBgColor px-6">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-SecondaryDarkBgColor">
          {isVerifyEmailError ? (
            <IoAlertCircleOutline
              className="size-8 text-TertiaryColor"
              aria-hidden="true"
            />
          ) : (
            <IoCheckmarkCircleOutline
              className="size-8 text-OnlineBgColor"
              aria-hidden="true"
            />
          )}
        </span>

        <div>
          <h1 className="font-ItalicFont text-3xl text-PrimaryColor">
            {isVerifyEmailError ? "Verification failed" : "Email verified"}
          </h1>
          <p className="mt-2 text-SecondaryColor">
            {isVerifyEmailError
              ? verifyEmailError?.message
              : "Your account is ready. You can log in now."}
          </p>
        </div>

        {isVerifyEmailError ? (
          <Link
            to="/signup"
            className="rounded-full border border-TertiaryColor px-6 py-2.5 font-PrimarySemiBoldFont text-TertiaryColor transition hover:bg-TertiaryColor hover:text-white"
          >
            Back to sign up
          </Link>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-TertiaryColor px-6 py-2.5 font-PrimarySemiBoldFont text-white transition hover:bg-HoverBtnBg"
          >
            Go to login
          </Link>
        )}
      </div>
    </main>
  );
};

export default VerifyEmail;
