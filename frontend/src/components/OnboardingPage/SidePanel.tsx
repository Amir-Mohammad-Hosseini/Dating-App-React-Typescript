import { GoCheck } from "react-icons/go";
import Logo from "../../components/Logo/Logo";

const STEPS = [
  { title: "About you", hint: "Gender, who you like, birthday" },
  { title: "Your story", hint: "Bio and interests" },
  { title: "Location", hint: "Where you’re based" },
  { title: "Photos", hint: "Up to five" },
];

const PREVIEW_INTERESTS = ["Hiking", "Music", "Reading"];

type SidePanelType = { step: number };

const SidePanel = ({ step }: SidePanelType) => {
  return (
    <aside className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-SecondaryColor/20 bg-SecondaryDarkBgColor p-12 lg:flex lg:w-1/2">
      {/* Decoration: two red glows + a soft grey sphere, all behind the content */}
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-TertiaryColor/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 size-80 rounded-full bg-TertiaryColor/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-36 -z-10 size-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_60%,rgba(0,0,0,0.15))] shadow-[inset_-30px_-30px_80px_rgba(0,0,0,0.35)]" />

      <div>
        <Logo isShowText />

        <h2 className="mt-6 max-w-xs font-ItalicFont text-5xl leading-[1.1]">
          Start with the small things.
        </h2>
        <p className="mt-3 max-w-xs text-SecondaryColor">
          Three questions and one photo. What you tell us decides who you see
          first.
        </p>

        <ol className="mt-8">
          {STEPS.map((item, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;

            const circle = done
              ? "border-TertiaryColor bg-TertiaryColor text-SecondaryDarkBgColor"
              : active
                ? "border-TertiaryColor bg-TertiaryColor/15 text-PrimaryColor"
                : "border-SecondaryColor/40 text-SecondaryColor";

            return (
              <li
                key={item.title}
                aria-current={active ? "step" : undefined}
                className="relative flex gap-3 pb-6 last:pb-0"
              >
                {/* connector line to the next step */}
                {i < STEPS.length - 1 && (
                  <span
                    className={`absolute top-7 bottom-0 left-3.5 w-px ${
                      done ? "bg-TertiaryColor" : "bg-DisabledBtnBg"
                    }`}
                  />
                )}

                <span
                  className={`z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs ${circle}`}
                >
                  {done ? <GoCheck /> : n}
                </span>

                <div>
                  <p
                    className={`font-PrimarySemiBoldFont text-sm ${
                      n <= step ? "text-PrimaryColor" : "text-SecondaryColor"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-SecondaryColor">{item.hint}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Live-preview card (static placeholder for now) */}
      <div>
        <p className="mb-3 text-xs text-SecondaryColor">How you’ll appear</p>
        <div className="flex gap-4 rounded-2xl border border-SecondaryColor/20 bg-white/5 p-3 backdrop-blur-sm">
          <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-[radial-gradient(circle_at_20%_90%,rgba(245,67,90,0.6),rgba(45,46,51,1)_60%)] font-TitleFont text-4xl text-white/20">
            K
          </div>
          <div className="min-w-0">
            <p className="font-TitleFont text-xl">
              Kian <span className="text-SecondaryColor">26</span>
            </p>
            <p className="text-sm text-SecondaryColor">
              Your bio will show up here.
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {PREVIEW_INTERESTS.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-SecondaryColor/30 px-2.5 py-0.5 text-xs text-SecondaryColor"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
