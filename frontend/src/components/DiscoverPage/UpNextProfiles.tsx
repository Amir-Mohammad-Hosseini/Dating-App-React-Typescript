import type { UpNextProfilesType } from "./types";

const UpNextProfiles = ({ people, currentIndex }: UpNextProfilesType) => {
  const upThreeNextProfiles = people.slice(currentIndex + 1, currentIndex + 4);
  return (
    <div className="hidden justify-self-end lg:block">
      <p className="mb-4 text-right text-SecondaryColor">Up next</p>
      <ul className="space-y-4">
        {upThreeNextProfiles.map((person) => (
          <li className="flex items-center justify-center justify-self-end gap-x-2 text-PrimaryColor">
            <p>{person.firstname}</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-full object-center object-cover overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#69343f_0%,#4a2a34_45%,#25262a_100%)]">
              {person.profile_pic ? (
                <img
                  src={person.profile_pic}
                  alt={person.firstname}
                  className="w-full h-full"
                />
              ) : (
                person.firstname.slice(0, 1).toUpperCase()
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpNextProfiles;
