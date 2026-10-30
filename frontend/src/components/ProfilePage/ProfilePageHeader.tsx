import { Button } from "../Button";
import { Spinner } from "../Loader";
import type { ProfilePageHeaderType } from "./types";

const ProfilePageHeader = ({ isSubmitting }: ProfilePageHeaderType) => {
  return (
    <>
      <div className="m-6 h-12">
        <div className="flex items-center justify-between">
          <h1 className="font-TitleFont text-3xl">Edit profile</h1>
          <Button
            text="Save changes"
            type="submit"
            className="bg-TertiaryColor rounded-full px-4 py-1 cursor-pointer shadow-xl w-fit"
            isSubmitting={isSubmitting}
            submittingText={<Spinner />}
          />
        </div>
      </div>
      <div className="bg-SecondaryColor/40 absolute h-px w-dvw"></div>
    </>
  );
};

export default ProfilePageHeader;
