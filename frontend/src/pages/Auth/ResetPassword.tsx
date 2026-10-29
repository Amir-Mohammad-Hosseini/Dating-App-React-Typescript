import { Link, useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordSchema, { type ResetPasswordFormType } from "../../lib/zod/Auth/extendSchemas/resetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import resetPasswordMutation from "../../lib/tanstack-query/Auth/ResetPassword/resetPasswordMutation";
import Spinner from "../../components/Loader/Spinner";
const ResetPassword = () => {
  const {username , code : token} = useParams()
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ResetPasswordFormType>({
      resolver: zodResolver(resetPasswordSchema),
    });

    const { mutate : resetPasswordMutate, isPending : isResetPasswordMutatePending } = useMutation(resetPasswordMutation(navigate));

  const onValid = (data : ResetPasswordFormType) => {
    resetPasswordMutate({ user : username! , code : token! , ...data})
  }

  if (!token) {
    return (
      <AuthLayout
        bannerText="A fresh start, and right back to it."
        title="This link isn't valid"
        description="It may have expired or already been used. Request a new one to continue."
      >
        <Link
          className="btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2"
          to="/forgot-password"
        >
          Request a new link
        </Link>
      </AuthLayout>
    );
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
