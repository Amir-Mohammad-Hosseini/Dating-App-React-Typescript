import { useMutation } from "@tanstack/react-query";
import blockProfileMutation from "../../lib/tanstack-query/BlockProfile/blockProfileMutation";
import { useNavigate } from "react-router";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";

const useBlockProfile = () => {
  const navigate = useNavigate();
  const { mutate: blockProfileMutate, isPending: isBlockProfileMutatePending } =
    useMutation(blockProfileMutation(navigate));

  const handleShowBlockSwal = async (profileId : number | string) => {
    const isBlockConfirm = await confirmAction({
      title: "Are you sure?",
      text: "Do you want to block this user?",
      confirmButtonText: "Yes, confirm",
      icon: "warning",
      confirmButtonColor: "#1e40af",
    });

    if (isBlockConfirm) {
      blockProfileMutate(profileId);
    }
  };

  return { handleShowBlockSwal, isBlockProfileMutatePending };
};

export default useBlockProfile;
