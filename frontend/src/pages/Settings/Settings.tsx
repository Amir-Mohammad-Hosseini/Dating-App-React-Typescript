import { useState } from "react";
import type { IconType } from "react-icons";
import { FaRegUser } from "react-icons/fa6";
import {
  LuBell,
  LuShield,
  LuCircleHelp,
  LuChevronRight,
  LuLogOut,
  LuTrash2,
  LuPencil,
  LuMail,
  LuPhone,
  LuLock,
} from "react-icons/lu";
import Navbar from "../../components/Navbar/Navbar";

/**
 * Color-token assumptions (this file only reuses tokens already used by
 * your Navbar component — adjust here if any of these guesses are off):
 *   PrimaryColor         -> accent red   (#F5435A)
 *   SecondaryColor       -> light/muted foreground, also used at low
 *                            opacity for hairline borders
 *   TertiaryColor        -> accent tint used behind active/selected rows
 *   SecondaryDarkBgColor -> elevated surface (cards, nav, inputs)
 *   PrimaryDarkBgColor   -> page background (assumed sibling token to
 *                            SecondaryDarkBgColor — swap this class if
 *                            your config names it differently)
 */

type PanelKey = "account" | "notifications" | "privacy" | "support";

const PANELS: { key: PanelKey; label: string; Icon: IconType }[] = [
  { key: "account", label: "Account", Icon: FaRegUser },
  { key: "notifications", label: "Notifications", Icon: LuBell },
  { key: "privacy", label: "Privacy", Icon: LuShield },
  { key: "support", label: "Support", Icon: LuCircleHelp },
];

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
        on
          ? "border-PrimaryColor bg-PrimaryColor"
          : "border-SecondaryColor/20 bg-SecondaryDarkBgColor"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full transition-transform ${
          on
            ? "translate-x-5 bg-SecondaryDarkBgColor"
            : "bg-SecondaryColor/60"
        }`}
      />
    </button>
  );
}

function Row({
  Icon,
  title,
  subtitle,
  right,
  onClick,
}: {
  Icon?: IconType;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-SecondaryColor/10 px-4 py-3.5 text-left last:border-b-0 ${
        onClick ? "hover:bg-SecondaryColor/4" : ""
      }`}
    >
      {Icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-SecondaryDarkBgColor text-SecondaryColor">
          <Icon size={16} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block text-xs text-SecondaryColor/70">
            {subtitle}
          </span>
        )}
      </span>
      {right ??
        (onClick && (
          <LuChevronRight size={16} className="shrink-0 text-SecondaryColor/60" />
        ))}
    </Comp>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-SecondaryColor/10 bg-SecondaryDarkBgColor/60">
      {children}
    </div>
  );
}

function ProfileCard() {
  return (
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
  );
}

function DangerZone({
  confirmingDelete,
  onDeleteClick,
  onCancel,
  onConfirm,
  deleted,
}: {
  confirmingDelete: boolean;
  onDeleteClick: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  deleted: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-PrimaryColor/30">
      <Row
        Icon={LuLogOut}
        title="Log out"
        onClick={() => {
          /* wire to your auth sign-out */
        }}
      />
      <Row
        Icon={LuTrash2}
        title="Delete account"
        subtitle="This can't be undone"
        onClick={onDeleteClick}
      />
      {confirmingDelete && (
        <div className="m-3 rounded-xl border border-PrimaryColor/30 bg-PrimaryColor/10 p-3.5">
          {deleted ? (
            <p className="text-xs text-SecondaryColor/80">
              Account scheduled for deletion (demo only).
            </p>
          ) : (
            <>
              <p className="mb-3 text-xs leading-relaxed text-SecondaryColor/80">
                Deleting your account removes your profile, matches, and
                messages permanently. This can&apos;t be undone.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 rounded-lg border border-SecondaryColor/15 bg-SecondaryDarkBgColor py-2.5 text-xs font-semibold text-SecondaryColor"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex-1 rounded-lg bg-PrimaryColor py-2.5 text-xs font-semibold text-white"
                >
                  Delete anyway
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const Settings = () => {
  const [notifs, setNotifs] = useState({
    matches: true,
    messages: true,
    likes: false,
    updates: false,
  });
  const [privacy, setPrivacy] = useState({
    showMe: true,
    readReceipts: false,
  });
  const [activePanel, setActivePanel] = useState<PanelKey>("account");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs((n) => ({ ...n, [key]: !n[key] }));
  const togglePrivacy = (key: keyof typeof privacy) =>
    setPrivacy((p) => ({ ...p, [key]: !p[key] }));

  const resetDelete = () => {
    setConfirmingDelete(false);
    setDeleted(false);
  };

  const accountGroup = (
    <Group>
      <Row Icon={LuPencil} title="Edit profile" onClick={() => {}} />
      <Row
        Icon={LuMail}
        title="Email address"
        subtitle="amir.dev@example.com"
        onClick={() => {}}
      />
      <Row
        Icon={LuPhone}
        title="Phone number"
        subtitle="+98 9•• ••• ••12"
        onClick={() => {}}
      />
      <Row Icon={LuLock} title="Change password" onClick={() => {}} />
    </Group>
  );

  const notificationsGroup = (
    <Group>
      <Row
        title="New matches"
        right={
          <Toggle
            on={notifs.matches}
            onChange={() => toggleNotif("matches")}
            label="New matches notifications"
          />
        }
      />
      <Row
        title="New messages"
        right={
          <Toggle
            on={notifs.messages}
            onChange={() => toggleNotif("messages")}
            label="New messages notifications"
          />
        }
      />
      <Row
        title="Likes"
        right={
          <Toggle
            on={notifs.likes}
            onChange={() => toggleNotif("likes")}
            label="Likes notifications"
          />
        }
      />
      <Row
        title="Product updates"
        right={
          <Toggle
            on={notifs.updates}
            onChange={() => toggleNotif("updates")}
            label="Product update notifications"
          />
        }
      />
    </Group>
  );

  const privacyGroup = (
    <Group>
      <Row
        title="Show me on Ember"
        right={
          <Toggle
            on={privacy.showMe}
            onChange={() => togglePrivacy("showMe")}
            label="Show me on Ember"
          />
        }
      />
      <Row
        title="Read receipts"
        right={
          <Toggle
            on={privacy.readReceipts}
            onChange={() => togglePrivacy("readReceipts")}
            label="Read receipts"
          />
        }
      />
      <Row
        title="Distance visibility"
        subtitle="Shown to matches"
        onClick={() => {}}
      />
      <Row title="Blocked users" onClick={() => {}} />
    </Group>
  );

  const supportGroup = (
    <Group>
      <Row title="Help center" onClick={() => {}} />
      <Row title="Terms of service" onClick={() => {}} />
      <Row title="Privacy policy" onClick={() => {}} />
    </Group>
  );

  const panelContent: Record<PanelKey, React.ReactNode> = {
    account: accountGroup,
    notifications: notificationsGroup,
    privacy: privacyGroup,
    support: supportGroup,
  };

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor text-white md:flex">
      <Navbar />

      <main className="min-w-0 flex-1 pb-24 md:pb-0">
        {/* ---------- shared top bar ---------- */}
        <header className="px-5 pt-6 pb-2 sm:px-6 lg:px-10 lg:mt-2">
          <h1 className="font-serif text-3xl italic">Settings</h1>
        </header>

        {/* ================= below lg: stacked single column ================= */}
        <div className="flex flex-col gap-4 px-5 pb-10 sm:px-6 lg:hidden">
          <ProfileCard />

          <div>
            <p className="mb-2 px-1 text-xs text-SecondaryColor/60">
              Account
            </p>
            {accountGroup}
          </div>

          <div>
            <p className="mb-2 px-1 text-xs text-SecondaryColor/60">
              Notifications
            </p>
            {notificationsGroup}
          </div>

          <div>
            <p className="mb-2 px-1 text-xs text-SecondaryColor/60">
              Privacy
            </p>
            {privacyGroup}
          </div>

          <DangerZone
            confirmingDelete={confirmingDelete}
            deleted={deleted}
            onDeleteClick={() => setConfirmingDelete(true)}
            onCancel={resetDelete}
            onConfirm={() => setDeleted(true)}
          />

          <p className="pb-4 text-center text-xs text-SecondaryColor/50">
            Ember · version 1.0.0
          </p>
        </div>

        {/* ================= lg and up: internal sidebar + detail pane ================= */}
        <div className="hidden lg:flex lg:items-start">
          <nav className="flex w-64 shrink-0 flex-col justify-between px-6 pb-10 xl:w-72 xl:px-10">
            <ul className="flex flex-col gap-1">
              {PANELS.map(({ key, label, Icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setActivePanel(key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                      activePanel === key
                        ? "bg-TertiaryColor/20 text-PrimaryColor"
                        : "text-SecondaryColor hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 border-l border-SecondaryColor/10 px-8 pb-16 xl:px-12">
            <div className="mx-auto flex max-w-xl flex-col gap-5">
              {activePanel === "account" && <ProfileCard />}

              <div>
                <h2 className="font-serif text-xl">
                  {PANELS.find((p) => p.key === activePanel)?.label}
                </h2>
                <p className="mt-1 mb-4 text-sm text-SecondaryColor/70">
                  {activePanel === "account" &&
                    "Manage your login details and how people identify you."}
                  {activePanel === "notifications" &&
                    "Choose what Ember can notify you about."}
                  {activePanel === "privacy" &&
                    "Control what's visible and who can reach you."}
                  {activePanel === "support" &&
                    "Get help or review how Ember works."}
                </p>
                {panelContent[activePanel]}
              </div>

              {activePanel === "support" && (
                <p className="text-xs text-SecondaryColor/50">
                  Ember · version 1.0.0
                </p>
              )}

              <div>
                <h2 className="mb-3 font-serif text-xl">Account actions</h2>
                <DangerZone
                  confirmingDelete={confirmingDelete}
                  deleted={deleted}
                  onDeleteClick={() => setConfirmingDelete(true)}
                  onCancel={resetDelete}
                  onConfirm={() => setDeleted(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
