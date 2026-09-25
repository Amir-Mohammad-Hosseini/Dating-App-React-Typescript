import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import type { LoginFormType } from "../../lib/zod/Auth/loginSchema";
import loginSchema from "../../lib/zod/Auth/loginSchema";
import loginMutation from "../../lib/tanstack-query/Auth/Login/loginMutation";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onValid = (data: LoginFormType) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation(loginMutation(navigate));
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
      <Button text="Login" type="submit" isSubmitting={isPending} submittingText="Submitting" />
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
