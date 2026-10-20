import { useQuery } from "@tanstack/react-query";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router";
import blockedAccountsQuery from "../../lib/tanstack-query/MyProfile/AccountActions/blockedAccountsQuery";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import BlockedAccountItem from "../../components/BlockedAccountsPage/BlockedAccountItem";

const BlockedAccounts = () => {
  const { data: blockedAccounts, isPending: isBlockedAccountsQueryPending } =
    useQuery(blockedAccountsQuery());

  if (isBlockedAccountsQueryPending) {
    return <LoadingOverlay show />;
  }

  console.log(blockedAccounts);
  return (
    <main className="min-h-screen bg-PrimaryDarkBgColor px-4 py-6 text-PrimaryColor sm:px-6 md:py-10">
      <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
        <header className="mb-6 flex items-center gap-3">
          <Link
            to="/settings"
            aria-label="Back to settings"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-SecondaryDarkBgColor text-PrimaryColor transition hover:bg-TertiaryDarkBgColor"
          >
            <FaChevronLeft className="size-3" />
          </Link>

          <div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Blocked accounts
            </h1>
            <p className="text-sm text-PrimaryColor/60">
              People you block can't see your profile or message you.
            </p>
          </div>
        </header>

        {blockedAccounts.length ? (
          // Do this part later
          <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-PrimaryDarkBgColor/30">
            {blockedAccounts.map((blockedAccount: any) => (
              <BlockedAccountItem key={blockedAccount.id} {...blockedAccount} />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border mt-8 border-white/10 bg-PrimaryDarkBgColor/30 flex items-center justify-center h-30">
            <p className="text-TertiaryColor">No account blocked yet</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default BlockedAccounts;
