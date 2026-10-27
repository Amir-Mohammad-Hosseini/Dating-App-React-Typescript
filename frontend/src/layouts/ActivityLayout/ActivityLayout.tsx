import { NavLink, Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import NotificationLogo from "../../components/NotificationLogo/NotificationLogo";
import { useQuery } from "@tanstack/react-query";
import visitorsQuery from "../../lib/tanstack-query/Activity/visitorsQuery";
import likersQuery from "../../lib/tanstack-query/Activity/likersQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-TertiaryColor focus-visible:ring-offset-2 focus-visible:ring-offset-PrimaryDarkBgColor ${
    isActive
      ? "bg-TertiaryColor text-PrimaryDarkBgColor"
      : "border border-white/10 text-[#A3A8B0] hover:text-PrimaryColor"
  }`;

const ActivityLayout = () => {
  const { data: visitorsData, isPending: isVisitorsQueryPending } =
    useQuery(visitorsQuery());
  const { data: likersData, isPending: isLikersQueryPending } =
    useQuery(likersQuery());

  const isQueryPending = isVisitorsQueryPending || isLikersQueryPending;

  if (isQueryPending) {
    return <LoadingOverlay show />;
  }

  console.log("VISITORS", visitorsData);
  console.log("LIKERS", likersData);

  const visitorsCount = (visitorsData || []).length;
  const likersCount = (likersData || []).length;
  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-10 md:pt-10">
        <div className="mx-auto w-full max-w-5xl">
          <header className="flex items-center justify-between">
            <h1 className="font-display text-4xl italic text-PrimaryColor">
              Activity
            </h1>
            <NotificationLogo />
          </header>

          <nav aria-label="Activity tabs" className="mt-6 flex gap-2">
            <NavLink to="/activity/visitors" className={tabClass}>
              Visitors{" "}
              {visitorsCount ? (
                <span className="text-xs opacity-80">{visitorsCount}</span>
              ) : null}
            </NavLink>
            <NavLink to="/activity/likes" className={tabClass}>
              Likes you{" "}
              {likersCount ? (
                <span className="text-xs opacity-80">{likersCount}</span>
              ) : null}
            </NavLink>
          </nav>

          <section className="mt-6">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}

export default ActivityLayout