import { Link } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema, { type ForgotPasswordFormType } from "../../lib/zod/Auth/extendSchemas/forgotPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import forgotPasswordMutation from "../../lib/tanstack-query/Auth/ForgotPassword/forgotPasswordMutation";
import { useState } from "react";
import Spinner from "../../components/Loader/Spinner";

const ForgotPassword = () => {
  const [sentTo , setSentTo] =useState<string | null>(null)

  const {register , handleSubmit , formState : {errors}}=useForm<ForgotPasswordFormType>({
    resolver : zodResolver(forgotPasswordSchema)
  })

  const {mutate : forgotPasswordMutate , isPending : isForgotPasswordMutatePending} = useMutation(forgotPasswordMutation(setSentTo))


const onValid = (data : ForgotPasswordFormType) => {
  forgotPasswordMutate(data.email)
}

  if (sentTo) {
    return (
      <AuthLayout
        bannerText="Everyone loses a password. Not a match."
        title="Check your inbox"
        description={`If an account exists for ${sentTo}, we've sent a link to reset your password.`}
      >
        <Link
          className="btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2"
          to="/login"
        >
          Back to login
        </Link>
        <p className="my-2 text-SecondaryColor text-sm">
          Nothing after a few minutes? Check your spam folder, or{" "}
          <button
            type="button"
            className="text-TertiaryColor font-bold cursor-pointer"
            onClick={() => setSentTo(null)}
          >
            try again
          </button>
          .
        </p>
      </AuthLayout>
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
        <Link className="text-TertiaryColor font-bold cursor-pointer" to="/login">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;