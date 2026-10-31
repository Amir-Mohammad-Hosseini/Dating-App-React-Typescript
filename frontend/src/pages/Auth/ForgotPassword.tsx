import { Link } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Spinner from "../../components/Loader/Spinner";
import { SentForgotPassword } from "../../components/ForgotPasswordPage";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const {
    sentTo,
    setSentTo,
    register,
    handleSubmit,
    errors,
    isForgotPasswordMutatePending,
    onValid,
  } = useForgotPassword();

  if (sentTo) {
    return (
      <SentForgotPassword
        sentTo={sentTo}
        onClearSentTo={() => setSentTo(null)}
      />
    );
  }

  return (
    <AuthLayout
      bannerText="Everyone loses a password. Not a match."
      title="Forgot your password?"
      description="Enter your email and we'll send you a link to reset it."
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        text="Email"
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Button
        text="Send reset link"
        type="submit"
        isSubmitting={isForgotPasswordMutatePending}
        submittingText={<Spinner />}
      />
      <p className="my-2 text-SecondaryColor">
        Remembered it?{" "}
        <Link
          className="text-TertiaryColor font-bold cursor-pointer"
          to="/login"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
