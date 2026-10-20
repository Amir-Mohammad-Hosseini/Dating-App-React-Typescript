import { GoChevronLeft } from "react-icons/go";
import { MdOutlineBlock } from "react-icons/md";
import { useNavigate } from "react-router";
import type { ProfileViewTopbarType } from "./types";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import { useMutation } from "@tanstack/react-query";
import blockProfileMutation from "../../lib/tanstack-query/BlockProfile/blockProfileMutation";
import Spinner from "../Loader/Spinner";

const ProfileViewTopbar = ({ id }: ProfileViewTopbarType) => {
  const navigate = useNavigate();
  const { mutate: blockProfileMutate, isPending: isBlockProfileMutatePending } =
    useMutation(blockProfileMutation(navigate));

  const handleGoToPrevPage = () => {
    navigate(-1);
  };

  const handleShowBlockSwal = async () => {
    const isBlockConfirm = await confirmAction({
      title: "Are you sure?",
      text: "Do you want to block this user?",
      confirmButtonText: "Yes, confirm",
      icon: "warning",
      confirmButtonColor: "#1e40af",
    });

    if (isBlockConfirm) {
      blockProfileMutate(id);
    }
  };

  return (
    <div className="absolute inset-x-0 top-0 z-10 mt-4 flex items-center justify-between p-4 md:static md:z-auto md:[grid-area:top] md:p-0 md:pb-5">
      <button
        onClick={handleGoToPrevPage}
        aria-label="Back"
        className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none cursor-pointer"
      >
        <GoChevronLeft className="size-5" />
      </button>
      <span className="hidden text-base font-semibold text-PrimaryColor md:block">
        Profile
      </span>
      <button
        disabled={isBlockProfileMutatePending}
        onClick={handleShowBlockSwal}
        aria-label="More options"
        className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md md:border-SecondaryColor/20 md:bg-SecondaryDarkBgColor md:backdrop-blur-none cursor-pointer"
      >
        {isBlockProfileMutatePending ? (
          <Spinner className="size-5" />
        ) : (
          <MdOutlineBlock className="size-5" />
        )}
      </button>
    </div>
  );
};

export default ProfileViewTopbar;
