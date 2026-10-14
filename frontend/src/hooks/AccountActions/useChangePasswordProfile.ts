import Swal from "sweetalert2";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import changePasswordMutation from "../../lib/tanstack-query/MyProfile/AccountActions/changePasswordMutation";
import type { PasswordSchemaType } from "../../lib/zod/Auth/extendSchemas/passwordSchema";
import globalValidator from "../../lib/zod/globalValidator";
import passwordSchema from "../../lib/zod/Auth/extendSchemas/passwordSchema";
import type { ChangePasswordDatas } from "../../types/myProfile";

const useChangePasswordProfile = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: changePasswordMutate,
    isPending: isChangePasswordMutatePending,
  } = useMutation(changePasswordMutation(navigate));

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
        const newPasswordDatas: PasswordSchemaType = {
          password: newPassword,
          confirmPassword,
        };
        const validateResult = globalValidator(
          passwordSchema,
          newPasswordDatas,
        );
        if (!validateResult.success) {
          const errorMessage = validateResult.error.issues[0].message;
          Swal.showValidationMessage(errorMessage);
          return;
        } else {
          const changePasswordDatas: ChangePasswordDatas = {
            oldPassword,
            newPassword,
            confirmPassword,
          };
          try {
            await changePasswordMutate(changePasswordDatas);
          } catch (error) {
            Swal.showValidationMessage("An error occurred!");
            return;
          }
        }
      },
    });
  };

  return { isChangePasswordMutatePending, handleShowChangePasswordSwal };
};

export default useChangePasswordProfile;
