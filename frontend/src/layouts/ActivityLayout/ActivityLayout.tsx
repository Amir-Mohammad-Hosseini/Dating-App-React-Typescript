import { NavLink, Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import type ActivityLayoutType from "./types";
import NotificationLogo from "../../components/NotificationLogo/NotificationLogo";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terbg-TertiaryColor focus-visible:ring-offset-2 focus-visible:ring-offset-primartext-PrimaryDarkBgColor";


const tabClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
    isActive
      ? "bg-TertiaryColor text-PrimaryDarkBgColor"
      : "border border-white/10 text-[#A3A8B0] hover:text-PrimaryColor"
  }`;

function Count({ n }: { n?: number }) {
  if (n === undefined) return null;
  return <span className="text-xs opacity-80">{n}</span>;
}

export default function ActivityLayout({
  visitorsCount,
  likesCount,
}: ActivityLayoutType) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-PrimaryDarkBgColor px-4 pb-24 pt-6 md:px-8 md:pb-0 md:pt-10">
        <div className="mx-auto w-full max-w-5xl">
          <header className="flex items-center justify-between">
            <h1 className="font-display text-4xl italic text-PrimaryColor">
              Activity
            </h1>
            <NotificationLogo />
          </header>

          <nav aria-label="Activity tabs" className="mt-6 flex gap-2">
            <NavLink to="/activity/visitors" className={tabClass}>
              Visitors <Count n={visitorsCount} />
            </NavLink>
            <NavLink to="/activity/likes" className={tabClass}>
              Likes you <Count n={likesCount} />
            </NavLink>
          </nav>

          <section className="mt-6">
            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
}
