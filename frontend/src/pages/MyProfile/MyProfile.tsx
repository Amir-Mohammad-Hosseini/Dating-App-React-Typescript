import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Navbar from "../../components/Navbar/Navbar";
import Input from "../../components/Input/Input";
import BirthdayInput from "../../components/Input/BirthdayInput";
import { Link } from "react-router";

const DUMMY_PROFILE_PHOTOS = [
  "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://i.pinimg.com/1200x/97/31/97/973197bf06215263fc7fc59e8bd6e89e.jpg",
  "https://i.pinimg.com/1200x/bf/4a/fc/bf4afcde4a204a11b6bbff613b6aacb2.jpg",
  null,
  null,
  null,
];

const GENDER_OPTIONS = ["Woman", "Man", "Non-binary"];

const INTEREST_OPTIONS = [
  "Hiking",
  "Coffee",
  "Photography",
  "Dogs",
  "Cooking",
  "Travel",
  "Live music",
  "Yoga",
];

const PRIVACY_ITEMS = [
  {
    key: "showOnDiscover",
    label: "Show me on Discover",
    description: "Turn off to pause matching",
    defaultChecked: true,
  },
  {
    key: "showDistance",
    label: "Show distance",
    description: "Instead of exact location",
    defaultChecked: true,
  },
  {
    key: "showAge",
    label: "Show age",
    description: "Visible on your profile card",
    defaultChecked: true,
  },
  {
    key: "readReceipts",
    label: "Read receipts",
    description: "Let matches see when you've read their message",
    defaultChecked: false,
  },
] as const;

// ---- small local helpers (mirror Input/BirthdayInput conventions; split into
// their own files under components/ the same way BirthdayInput was, if you want) ----

const Select = ({
  text,
  name,
  options,
}: {
  text: string;
  name: string;
  options: string[];
}) => (
  <fieldset className="fieldset text-PrimaryColor">
    <label className="label" htmlFor={name}>
      {text}
    </label>
    <select id={name} name={name} className="select bg-InputBg w-full">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </fieldset>
);

const Textarea = ({
  value,
  onChange,
  maxLength,
  rows,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  rows: number;
}) => (
  <textarea
    value={value}
    maxLength={maxLength}
    rows={rows}
    onChange={(e) => onChange(e.target.value)}
    className="textarea bg-InputBg text-PrimaryColor w-full resize-none"
  />
);

const ToggleSwitch = ({
  label,
  description,
  defaultChecked,
  disabled,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-PrimaryColor text-sm">{label}</p>
      {description && (
        <p className="text-SecondaryColor mt-0.5 text-xs">{description}</p>
      )}
    </div>
    <label
      className={`relative inline-flex shrink-0 cursor-pointer items-center ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="bg-SecondaryColor/30 peer-checked:bg-TertiaryColor h-6 w-10 rounded-full transition-colors" />
      <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
    </label>
  </div>
);

const Chip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
      selected
        ? "bg-TertiaryColor border-TertiaryColor text-PrimaryColor"
        : "border-SecondaryColor/30 text-SecondaryColor hover:border-SecondaryColor"
    }`}
  >
    {label}
  </button>
);

const MyProfile = () => {
  const [bio, setBio] = useState(
    "Coffee before conversation. Always up for a hike, bad puns welcome, dog tax mandatory.",
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Hiking",
    "Coffee",
    "Dogs",
  ]);

  const toggleInterest = (interest: string) =>
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );

  return (
    <div className="relative md:flex">
      <Navbar />

      <div className="w-full pb-24 md:pb-10">
        <div className="m-6 h-12">
          <div className="flex items-center justify-between">
            <h1 className="font-TitleFont text-3xl">Edit profile</h1>
            <button className="bg-TertiaryColor rounded-full px-4 py-1">
              Save changes
            </button>
          </div>
        </div>
        <div className="bg-SecondaryColor/40 absolute h-px w-dvw"></div>

        {/* Photos — same as before, just with a key added to fix the map warning */}
        <section className="mx-6 my-10">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">Photos</h5>
            <p className="text-SecondaryColor">4 of 6 added</p>
          </div>
          <div className="my-4 grid w-full grid-cols-3 gap-6">
            {DUMMY_PROFILE_PHOTOS.map((photo, index) =>
              photo ? (
                <div
                  key={photo}
                  className="relative aspect-square justify-self-center overflow-hidden rounded-2xl"
                >
                  <button className="bg-PrimaryDarkBgColor/70 absolute top-1 right-1 flex size-6 items-center justify-center rounded-full">
                    <FaTimes className="size-3" />
                  </button>
                  <img
                    className="h-full w-full object-cover object-top"
                    src={photo}
                    alt=""
                  />
                  {index === 0 && (
                    <span className="bg-TertiaryColor text-PrimaryColor absolute bottom-1.5 left-1 rounded-full px-1 text-xs">
                      Main
                    </span>
                  )}
                </div>
              ) : (
                <div
                  key={`empty-${index}`}
                  className="border-SecondaryColor hover:border-PrimaryColor aspect-square w-full justify-self-center rounded-2xl border border-dashed transition flex items-center justify-center"
                >
                  <FaPlus className="text-SecondaryColor size-5" />
                </div>
              ),
            )}
          </div>
          <p className="text-SecondaryColor text-xs">
            Drag to reorder. Your first photo is the one people see before they
            open your profile.
          </p>
        </section>

        {/* Basic info */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <h4 className="mb-4 text-xl font-semibold">Basic info</h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              text="First name"
              name="firstName"
              type="text"
              isForgotPassword={false}
              placeholder=""
            />
            <Select text="Gender" name="gender" options={GENDER_OPTIONS} />
          </div>

          <div className="mt-4">
            <BirthdayInput
              value={{ day: "06", month: "09", year: "2005" }}
              onChange={() => {}}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              text="Location"
              name="location"
              type="text"
              isForgotPassword={false}
              placeholder="Warsaw, Poland"
            />
            <Input
              text="Work / study"
              name="work"
              type="text"
              isForgotPassword={false}
              placeholder="Product Designer · MTU"
            />
          </div>
        </section>

        {/* About you */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-xl font-semibold">About you</h4>
            <span className="text-SecondaryColor text-xs">
              {bio.length}/300
            </span>
          </div>
          <Textarea value={bio} onChange={setBio} maxLength={300} rows={4} />
        </section>

        {/* Interests */}
        <section className="mx-6 mt-6">
          <h4 className="mb-3 text-xl font-semibold">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onClick={() => toggleInterest(interest)}
              />
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <h4 className="text-xl font-semibold">Privacy</h4>
          <p className="text-SecondaryColor mb-4 text-sm">
            Control what other people can see.
          </p>

          <div className="flex flex-col gap-4">
            {PRIVACY_ITEMS.map((item) => (
              <ToggleSwitch
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
              <ToggleSwitch label="" disabled />
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="bg-SecondaryDarkBgColor/80 mx-6 mt-6 rounded-2xl p-6">
          <h4 className="mb-3 text-xl font-semibold">Account</h4>
          <div className="flex flex-col">
            <Link to="/settings" className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
              <IoMdSettings />
              Settings
            </Link>
            <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
              Change password
            </button>
            <button className="hover:text-PrimaryColor text-SecondaryColor py-2 text-left text-sm transition flex items-center justify-start gap-x-1.5">
              Blocked accounts
            </button>
            <button className="text-TertiaryColor py-2 text-left text-sm transition">
              Log out
            </button>
            <button className="text-SecondaryColor py-2 text-left text-sm transition hover:text-red-400">
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
