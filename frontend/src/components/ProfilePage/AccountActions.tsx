import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router";
import TextButton from "../Button/TextButton";
import useLogoutProfile from "../../hooks/AccountActions/useLogoutProfile";
import useDeleteAccount from "../../hooks/AccountActions/useDeleteAccount";
import useChangePasswordProfile from "../../hooks/AccountActions/useChangePasswordProfile";

const AccountActions = () => {
  const { isChangePasswordMutatePending, handleShowChangePasswordSwal } =
    useChangePasswordProfile();

  const { isLogoutMutatePending, handleShowLogoutSwal } = useLogoutProfile();
  const { isDeleteAccountMutatePending, handleShowDeleteAccountSwal } =
    useDeleteAccount();

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
