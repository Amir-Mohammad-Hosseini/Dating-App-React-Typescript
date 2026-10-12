import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router";

const AccountActions = () => {
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
        <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
          Change password
        </button>
        <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
          Blocked accounts
        </button>
        <button className="text-TertiaryColor py-2 text-left text-sm transition cursor-pointer">
          Log out
        </button>
        <button className="text-SecondaryColor py-2 text-left text-sm transition hover:text-red-400 cursor-pointer">
          Delete account
        </button>
      </div>
    </section>
  );
};

export default AccountActions;
