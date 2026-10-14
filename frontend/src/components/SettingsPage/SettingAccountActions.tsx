import { LuLogOut, LuTrash2 } from "react-icons/lu";
import SettingAccountActionButton from "./SettingAccountActionButton";
import useLogoutProfile from "../../hooks/AccountActions/useLogoutProfile";
import Spinner from "../Loader/Spinner";
import useDeleteAccount from "../../hooks/AccountActions/useDeleteAccount";

const SettingAccountActions = () => {
  const { isLogoutMutatePending, handleShowLogoutSwal } = useLogoutProfile();
  const { isDeleteAccountMutatePending, handleShowDeleteAccountSwal } =
    useDeleteAccount();
  return (
    <div>
      <h2 className="mb-3 font-serif text-xl">Account actions</h2>

      <div className="overflow-hidden rounded-2xl border border-PrimaryColor/30">
        <SettingAccountActionButton
          Icon={LuLogOut}
          className="cursor-pointer hover:text-TertiaryColor transition"
          onClickAccountAction={handleShowLogoutSwal}
          isSubmitting={isLogoutMutatePending}
          submittingContent={<Spinner />}
        >
          <span className="flex-1 text-sm font-medium">Log out</span>
        </SettingAccountActionButton>
        <SettingAccountActionButton
          Icon={LuTrash2}
          className="cursor-pointer hover:text-TertiaryColor transition"
          onClickAccountAction={handleShowDeleteAccountSwal}
          isSubmitting={isDeleteAccountMutatePending}
          submittingContent={<Spinner />}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">Delete account</span>
            <span className="mt-0.5 block text-xs text-SecondaryColor/70">
              This can't be undone
            </span>
          </span>
        </SettingAccountActionButton>
      </div>
    </div>
  );
};

export default SettingAccountActions;
