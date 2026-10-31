import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Link } from "react-router";
import useRegister from "./useRegister";

const Register = () => {
  const { register, handleSubmit, errors, isSignupPending, onValid } =
    useRegister();

  return (
    <AuthLayout
      bannerText="Less scrolling. More meeting."
      title="Let's set you up"
      description="Takes less than a minute."
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        text="First name"
        type="text"
        placeholder="Jordan"
        {...register("firstname")}
        error={errors.firstname?.message}
      />
      <Input
        text="Last name"
        type="text"
        placeholder="Lee"
        {...register("lastname")}
        error={errors.lastname?.message}
      />
      <Input
        text="User name"
        type="text"
        placeholder="jordanLee2005"
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        text="Email"
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
      />
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
        text="Create account"
        type="submit"
        isSubmitting={isSignupPending}
        submittingText="Submitting..."
      />
      <p className="my-2 text-SecondaryColor">
        Already on Ember?{" "}
        <Link
          to="/login"
          className="text-TertiaryColor font-bold cursor-pointer"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
