import { Link } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Spinner from "../../components/Loader/Spinner";
import useResetPassword from "./useResetPassword";
import { InvalidResetPasswordToken } from "../../components/ResetPasswordPage";
const ResetPassword = () => {
  const {
    token,
    register,
    handleSubmit,
    errors,
    isResetPasswordMutatePending,
    onValid,
  } = useResetPassword();

  if (!token) {
    return <InvalidResetPasswordToken />;
  }

  return (
    <AuthLayout
      bannerText="A fresh start, and right back to it."
      title="Choose a new password"
      description="Use at least 8 characters."
      onSubmit={handleSubmit(onValid)}
    >
      <div className="flex gap-3">
        <Input
          text="Password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          text="Confirm"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      <Button
        text="Reset password"
        type="submit"
        isSubmitting={isResetPasswordMutatePending}
        submittingText={<Spinner />}
      />
      <p className="my-2 text-SecondaryColor">
        Back to{" "}
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

export default ResetPassword;
