import { useMutation } from "@tanstack/react-query";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import logoutMutation from "../../lib/tanstack-query/MyProfile/AccountActions/logoutMutation";
import { useNavigate } from "react-router";

const useLogoutProfile = () => {
  const navigate = useNavigate();

  const { mutate: logoutMutate, isPending: isLogoutMutatePending } =
    useMutation(logoutMutation(navigate));
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

  return {isLogoutMutatePending , handleShowLogoutSwal}
};

export default useLogoutProfile;
