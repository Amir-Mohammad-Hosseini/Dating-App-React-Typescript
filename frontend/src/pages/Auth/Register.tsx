import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import type { SignupFormType } from "../../lib/zod/Auth/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "../../lib/zod/Auth/signupSchema";
import { useMutation } from "@tanstack/react-query";
import signupMutation from "../../lib/tanstack-query/Auth/Register/signupMutation";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate()
  const {mutate , isPending } = useMutation(signupMutation(navigate))

  const onValid = (data: SignupFormType) => {
    mutate(data)
  };
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
        isSubmitting={isPending}
        submittingText="Submitting..."
      />
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
