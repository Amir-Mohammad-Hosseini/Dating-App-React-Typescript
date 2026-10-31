import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Link } from "react-router";
import useLogin from "./useLogin";

const Login = () => {
  const { register, handleSubmit, errors, isLoginMutationPending, onValid } =
    useLogin();

  return (
    <AuthLayout
      bannerText="Good things rarely start with a swipe left."
      title="Welcome back"
      description="Log in to pick up where you left off."
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        text="Email"
        type="text"
        placeholder="you@example.com"
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        text="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        isForgotPassword
        placeholder="••••••••"
      />
      <Button
        text="Login"
        type="submit"
        isSubmitting={isLoginMutationPending}
        submittingText="Submitting..."
      />
      <p className="my-2 text-SecondaryColor">
        New here?{" "}
        <Link
          className="text-TertiaryColor font-bold cursor-pointer"
          to="/signup"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
