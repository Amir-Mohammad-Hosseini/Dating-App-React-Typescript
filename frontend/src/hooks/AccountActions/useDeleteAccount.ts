import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import deleteAccountMutation from "../../lib/tanstack-query/MyProfile/AccountActions/deleteAccountMutation";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import Swal from "sweetalert2";

const useDeleteAccount = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: deleteAccountMutate,
    isPending: isDeleteAccountMutatePending,
  } = useMutation(deleteAccountMutation(navigate));

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

  return { isDeleteAccountMutatePending, handleShowDeleteAccountSwal };
};

export default useDeleteAccount;
