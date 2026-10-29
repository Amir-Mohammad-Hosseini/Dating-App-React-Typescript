import { Link } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
const ResetPassword = () => {
  //   const navigate = useNavigate();
  //   // TODO: adjust to the real link shape (useParams if it's /reset-password/:username/:code)
  //   const [searchParams] = useSearchParams();
  //   const token = searchParams.get("token");

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<ResetPasswordFormType>({
  //     resolver: zodResolver(resetPasswordSchema),
  //   });

  //   const { mutate, isPending } = useMutation(resetPasswordMutation(navigate));

  //   const onValid = (data: ResetPasswordFormType) => {
  //     mutate({ ...data, token: token! });
  //   };

  const token = null;

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
      //   onSubmit={handleSubmit(onValid)}
    >
      <div className="flex gap-3">
        {/* <Input
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
        /> */}
      </div>
      <Button
        text="Reset password"
        type="submit"
        // isSubmitting={isPending}
        isSubmitting={false}
        submittingText="Saving..."
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
