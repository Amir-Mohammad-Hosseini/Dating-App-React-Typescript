import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const Register = () => {
  return (
    <AuthLayout
      bannerText="Less scrolling. More meeting."
      title="Let's set you up"
      description="Takes less than a minute."
    >
      <Input
        text="Full name"
        name="fullName"
        type="text"
        placeholder="Jordan Lee"
      />
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
        placeholder="••••••••"
      />
      <div className="flex gap-3">
        <Input
          text="Password"
          name="password"
          type="password"
          placeholder="••••••••"
        />
        <Input
          text="Confirm"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
        />
      </div>
      <Button text="Create account" type="submit" />
      <p className="my-2 text-SecondaryColor">
        Already on Ember?{" "}
        <span className="text-TertiaryColor font-bold cursor-pointer">
          Log in
        </span>
      </p>
    </AuthLayout>
  );
};

export default Register;
