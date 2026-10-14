import {
  LuLock,
  LuMail,
  LuPencil,
} from "react-icons/lu";
import {
  groupClass,
} from "../../utils/constants/settings";
import SettingClickableButton from "./SettingClickableButton";
import useChangePasswordProfile from "../../hooks/AccountActions/useChangePasswordProfile";

const SettingAccountPanel = () => {
    const  { isChangePasswordMutatePending, handleShowChangePasswordSwal } = useChangePasswordProfile()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3.5 rounded-2xl border border-SecondaryColor/10 bg-SecondaryDarkBgColor/60 p-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-PrimaryColor/50 to-SecondaryDarkBgColor text-lg font-semibold">
          A
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold">Amir Hosseini</p>
          <p className="truncate text-xs text-SecondaryColor/70">
            amir.dev@example.com
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full border border-SecondaryColor/15 bg-SecondaryDarkBgColor px-4 py-2 text-xs font-semibold text-SecondaryColor hover:text-white"
        >
          Edit
        </button>
      </div>

      <div>
        <h2 className="font-serif text-xl">Account</h2>
        <p className="mt-1 mb-4 text-sm text-SecondaryColor/70">
          Manage your login details and how people identify you.
        </p>

        <div className={groupClass}>
          <SettingClickableButton text="Edit profile" onClick={() => {}} Icon={LuPencil} children={null} />
          <SettingClickableButton text="Email address" onClick={() => {}} Icon={LuMail} >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">Email address</span>
              <span className="mt-0.5 block text-xs text-SecondaryColor/70">
                amir.dev@example.com
              </span>
            </span>
          </SettingClickableButton>
          <SettingClickableButton text="Change password" onClick={handleShowChangePasswordSwal} isSubmitting={isChangePasswordMutatePending} Icon={LuLock} children={null} />
        </div>
      </div>
    </div>
  );
};

export default SettingAccountPanel;
