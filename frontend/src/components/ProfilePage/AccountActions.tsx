import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import { useMutation } from "@tanstack/react-query";
import logoutMutation from "../../lib/tanstack-query/MyProfile/AccountActions/logoutMutation";
import TextButton from "../Button/TextButton";
import Swal from "sweetalert2";
import deleteAccountMutation from "../../lib/tanstack-query/MyProfile/AccountActions/deleteAccountMutation";
import globalValidator from "../../lib/zod/globalValidator";
import passwordSchema, { type PasswordSchemaType } from "../../lib/zod/Auth/extendSchemas/passwordSchema";
import changePasswordMutation from "../../lib/tanstack-query/MyProfile/AccountActions/changePasswordMutation";
import type { ChangePasswordDatas } from "../../types/myProfile";

const AccountActions = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: changePasswordMutate,
    isPending: isChangePasswordMutatePending,
  } = useMutation(changePasswordMutation(navigate));
  const { mutate: logoutMutate, isPending: isLogoutMutatePending } =
    useMutation(logoutMutation(navigate));
  const {
    mutateAsync: deleteAccountMutate,
    isPending: isDeleteAccountMutatePending,
  } = useMutation(deleteAccountMutation(navigate));

  const handleShowChangePasswordSwal = async () => {
    await confirmAction({
      title: "Change Password?",
      text: "You will need to use new password after this.",
      confirmButtonText: "Change Password",
      confirmButtonColor: "#dc2626",
      icon: "question",
      html: `
        <input id="old-password" type="password" class="swal2-input" placeholder="Current password" autocomplete="current-password" />
        <input id="new-password" type="password" class="swal2-input" placeholder="New password" autocomplete="new-password" />
        <input id="confirm-password" type="password" class="swal2-input" placeholder="Repeat new password" autocomplete="new-password" />
      `,
      didOpen: () => {
        Swal.getPopup()
          ?.querySelector<HTMLInputElement>("#old-password")
          ?.focus();
      },
      preConfirm: async () => {
        const popup = Swal.getPopup()!;
        const oldPassword =
          popup.querySelector<HTMLInputElement>("#old-password")!.value;
        const newPassword =
          popup.querySelector<HTMLInputElement>("#new-password")!.value;
        const confirmPassword =
          popup.querySelector<HTMLInputElement>("#confirm-password")!.value;

        if (!oldPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage("All fields are required");
          return;
        }
        if (newPassword === oldPassword) {
          Swal.showValidationMessage(
            "New password must be different from the current one",
          );
          return;
        }
        const newPasswordDatas : PasswordSchemaType = {
          password : newPassword ,
          confirmPassword
        }
        const validateResult = globalValidator(passwordSchema , newPasswordDatas)
        if(!validateResult.success){
          const errorMessage = validateResult.error.issues[0].message
          Swal.showValidationMessage(
            errorMessage
          );
          return;
        }else{
          const changePasswordDatas : ChangePasswordDatas = {
            oldPassword,
            newPassword,
            confirmPassword
          }
          try {
            await changePasswordMutate(changePasswordDatas)
          } catch (error) {
            Swal.showValidationMessage(
              "An error occurred!"
            );
            return;
            
          }
        }
      },
    });
  };

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
    await confirmAction({
      title: "Delete account?",
      text: "You will need to create a new account later.",
      confirmButtonText: "Delete account",
      confirmButtonColor: "#dc2626",
      icon: "warning",
      input: "password",
      inputPlaceholder: "Your password",
      preConfirm: async (passwordValue: string) => {
        if (!passwordValue) {
          Swal.showValidationMessage("Password is invalid");
          return;
        }
        try {
          await deleteAccountMutate(passwordValue);
        } catch (error) {
          Swal.showValidationMessage("Something went wrong, try again");
          return;
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
          isSubmitting={isChangePasswordMutatePending}
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
          isSubmitting={isDeleteAccountMutatePending}
          submittingText="Submitting..."
          onClick={handleShowDeleteAccountSwal}
          className="hover:text-red-400"
        />
      </div>
    </section>
  );
};

export default AccountActions;
