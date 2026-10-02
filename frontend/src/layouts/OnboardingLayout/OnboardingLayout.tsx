import { Outlet } from "react-router";
import { GoChevronLeft } from "react-icons/go";
import Logo from "../../components/Logo/Logo";
import SidePanel from "../../components/OnboardingPage/SidePanel";
import StepBar from "../../components/OnboardingPage/StepBar";
import useAppStore from "../../lib/zustand/store";
import { confirmAction } from "../../lib/sweetalert2/confirmAction";
import useOnboardingStep from "../../hooks/useOnboardingStep";
import Button from "../../components/Button/Button";
import { useState } from "react";
import Spinner from "../../components/Loader/Spinner";

const OnboardingLayout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logoutUser = useAppStore((state) => state.logoutUser);
  const reset = useAppStore((state) => state.reset);
  const { total, isFirst, isLast, step, goPrev } = useOnboardingStep();

  const handleLogout = async () => {
    const isConfirmed = await confirmAction({
      title: "Log out?",
      text: "You will need to sign in again to access your account.",
      confirmButtonText: "Log Out",
      icon: "question",
    });

    if (isConfirmed) {
      logoutUser();
      reset()
    }
  };

  return (
    <div className="min-h-dvh bg-SecondaryDarkBgColor lg:flex lg:items-center lg:justify-center lg:p-8">
      {/* Shell: full screen on mobile/tablet, rounded two-panel window on desktop */}
      <div className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-PrimaryDarkBgColor md:bg-SecondaryDarkBgColor lg:h-[min(56.25rem,calc(100dvh-4rem))] lg:min-h-0 lg:max-w-App lg:flex-row lg:rounded-3xl lg:border lg:border-SecondaryColor/20 lg:bg-PrimaryDarkBgColor">
        {/* Red glow (mobile + tablet). On desktop the glow lives inside SidePanel */}
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-TertiaryColor/40 blur-3xl md:size-112 lg:hidden" />

        <SidePanel />

        <section className="flex flex-1 flex-col lg:overflow-y-auto">
          {/* Tablet only: top bar */}
          <div className="hidden items-center justify-between px-10 pt-8 md:flex lg:hidden">
            <Logo isShowText />
            <span className="text-sm text-SecondaryColor">
              Step {step} of {total}
            </span>
          </div>

          {/* Desktop only: log out */}
          <div className="hidden justify-end px-10 pt-8 lg:flex">
            <button
              type="button"
              className="text-sm text-SecondaryColor transition hover:text-PrimaryColor"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>

          {/* The card: plain on mobile, boxed on tablet, transparent on desktop */}
          <div className="flex flex-1 flex-col md:mx-auto md:my-10 md:w-full md:max-w-lg md:rounded-3xl md:border md:border-SecondaryColor/20 md:bg-PrimaryDarkBgColor lg:my-0 lg:max-w-none lg:rounded-none lg:border-0 lg:bg-transparent">
            {/* Mobile only: logo/back + progress + counter */}
            <div className="flex items-center gap-3 px-6 pt-6 md:hidden">
              {isFirst ? (
                <Logo isShowText={false} />
              ) : (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Back"
                  className="flex size-10 items-center justify-center rounded-full border border-SecondaryColor bg-PrimaryDarkBgColor"
                >
                  <GoChevronLeft className="size-4 text-SecondaryColor" />
                </button>
              )}
              <StepBar step={step} />
              <span className="text-sm text-SecondaryColor">
                {step}/{total}
              </span>
            </div>

            {/* Tablet only: progress inside the card */}
            <div className="hidden px-10 pt-8 md:flex lg:hidden">
              <StepBar step={step} />
            </div>

            {/* Step content */}
            <div className="flex-1 px-6 md:px-10 lg:flex lg:flex-col lg:justify-center lg:px-12">
              <div className="mx-auto w-full lg:max-w-100">
                <Outlet context={{setIsSubmitting}} />
              </div>
            </div>

            {/* Footer: full-width divider on mobile, none from tablet up */}
            <div className="border-t border-SecondaryColor/20 px-6 py-4 md:border-0 md:px-10 md:pb-8 lg:px-12 lg:pb-10">
              <div className="mx-auto flex w-full gap-3 lg:max-w-100">
                {!isFirst && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="hidden rounded-xl border border-SecondaryColor/30 px-6 font-bold transition hover:border-PrimaryColor md:block"
                  >
                    Back
                  </button>
                )}
                <div className="flex-1">
                  <Button
                    type="submit"
                    text={isLast ? "Finish and start matching" : "Continue"}
                    form="onboarding-form"
                    className="my-0! rounded-xl font-bold shadow-lg shadow-TertiaryColor/30"
                    submittingText={<Spinner />}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnboardingLayout;
