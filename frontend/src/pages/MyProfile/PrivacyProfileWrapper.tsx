import PRIVACY_ITEMS from "../../utils/constants/myProfile";
import ToggleSwitchPrivacyProfile from "../../components/ProfilePage/ToggleSwitchPrivacyProfile";

const PrivacyProfileWrapper = () => {
  return (
    <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
      <h4 className="text-xl font-semibold">Privacy</h4>
      <p className="text-SecondaryColor mb-4 text-sm">
        Control what other people can see.
      </p>

      <div className="flex flex-col gap-4">
        {PRIVACY_ITEMS.map((item) => (
          <ToggleSwitchPrivacyProfile
            key={item.key}
            label={item.label}
            description={item.description}
            defaultChecked={item.defaultChecked}
          />
        ))}

        <div className="border-SecondaryColor/20 flex items-start justify-between gap-4 border-t pt-4">
          <div>
            <p className="flex items-center gap-1.5 text-sm">
              Incognito mode
              <span className="bg-TertiaryColor/15 text-TertiaryColor rounded px-1.5 py-0.5 text-[10px] font-semibold">
                PRO
              </span>
            </p>
            <p className="text-SecondaryColor mt-0.5 text-xs">
              Only appear to people you like first
            </p>
          </div>
          <ToggleSwitchPrivacyProfile label="" disabled />
        </div>
      </div>
    </section>
  );
};

export default PrivacyProfileWrapper;
