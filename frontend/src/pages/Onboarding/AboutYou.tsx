import { useState } from "react";
import AboutRadioInput from "../../components/Input/AboutRadioInput";
import BirthdayInput, {
} from "../../components/Input/BirthdayInput";
import type { Birthday } from "../../components/Input/types";

const GENDERS = [
  { label: "Man", value: "man" },
  { label: "Woman", value: "woman" },
  { label: "Other", value: "other" },
];

const INTERESTED_IN = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Everyone", value: "everyone" },
];

const AboutYou = () => {
  const [gender, setGender] = useState("man");
  const [interestedIn, setInterestedIn] = useState("men");
  const [birthday, setBirthday] = useState<Birthday>({
    day: "",
    month: "",
    year: "",
  });

  return (
    <div>
      <div className="my-8">
        <h1 className="mb-1 font-ItalicFont text-3xl">Let’s start with you.</h1>
        <p className="text-lg text-SecondaryColor">
          Just the basics, so we know who to show you.
        </p>
      </div>

      <div className="w-full space-y-6">
        <AboutRadioInput
          text="I am"
          name="gender"
          options={GENDERS}
          value={gender}
          onChange={setGender}
        />
        <AboutRadioInput
          text="Interested in"
          name="interestedIn"
          options={INTERESTED_IN}
          value={interestedIn}
          onChange={setInterestedIn}
        />
        <BirthdayInput value={birthday} onChange={setBirthday} />
      </div>
    </div>
  );
};

export default AboutYou;
