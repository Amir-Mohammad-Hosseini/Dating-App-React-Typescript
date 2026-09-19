import Button from "../../components/Button/Button";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      bannerText="Good things rarely start with a swipe left."
      title="Welcome back"
      description="Log in to pick up where you left off."
    >
      <Input
        text="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
      />
      <Input
        text="Password"
        name="password"
        type="password"
        isForgotPassword
        placeholder="••••••••"
      />
      <Button text="Login" type="submit" />
      <p className="my-2 text-SecondaryColor">
        New here?{" "}
        <span className="text-TertiaryColor font-bold cursor-pointer">
          Create an account
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;
