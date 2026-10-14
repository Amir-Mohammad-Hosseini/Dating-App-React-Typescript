import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import { useMutation } from "@tanstack/react-query";
import logoutMutation from "../../lib/tanstack-query/MyProfile/AccountActions/logoutMutation";
import TextButton from "../Button/TextButton";
import { toast } from "sonner";
import Swal from "sweetalert2";
import deleteAccountMutation from "../../lib/tanstack-query/MyProfile/AccountActions/deleteAccountMutation";

const AccountActions = () => {
  const navigate = useNavigate();

  const { mutate: logoutMutate, isPending: isLogoutMutatePending } =
    useMutation(logoutMutation(navigate));
  const {
    mutateAsync: deleteAccountMutate,
    isPending: isDeleteAccountMutatePending,
  } = useMutation(deleteAccountMutation(navigate));

  const handleShowChangePasswordSwal = () => {};

  const handleShowLogoutSwal = async () => {
    const isConfirmed = await confirmAction({
      title: "Log out?",
      text: "You will need to sign in again to access your account.",
      confirmButtonText: "Log Out",
      icon: "warning",
    });

    if (isConfirmed) {
      logoutMutate();
    }
  };

  const handleShowDeleteAccountSwal = async () => {
    const isConfirmed = await confirmAction({
      title: "Delete account?",
      text: "You will need to create a new account later.",
      confirmButtonText: "Delete account",
      confirmButtonColor: "#dc2626",
      icon: "warning",
      input: "password",
      inputPlaceholder: "Your password",
      preConfirm: async (passwordValue: string) => {
        if (!passwordValue.trim().length) {
          return toast.error("Password is invalid");
        }
        try {
          await deleteAccountMutate(passwordValue);
        } catch (error) {
          return Swal.showValidationMessage("Wrong password");
        }
      },
    });
  };

  return (
    <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
      <h4 className="mb-3 text-xl font-semibold">Account</h4>
      <div className="flex flex-col">
        <Link
          to="/settings"
          className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5"
        >
          <IoMdSettings />
          Settings
        </Link>
        <TextButton
          text="Change password"
          isSubmitting={false}
          submittingText="Submitting..."
          onClick={handleShowChangePasswordSwal}
        />
        <Link
          to="/settings/blocked"
          className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5"
        >
          Blocked accounts
        </Link>
        <TextButton
          text="Log out"
          isSubmitting={isLogoutMutatePending}
          submittingText="Submitting..."
          onClick={handleShowLogoutSwal}
          className="text-TertiaryColor"
        />
        <TextButton
          text="Delete account"
          isSubmitting={false}
          submittingText="Submitting..."
          onClick={handleShowDeleteAccountSwal}
          className="hover:text-red-400"
        />
      </div>
    </section>
  );
};

export default AccountActions;
