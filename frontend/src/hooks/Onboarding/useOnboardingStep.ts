import { useLocation, useNavigate } from "react-router";

export const ONBOARDING_ROUTES = [
  "/onboarding",
  "/onboarding/yourStory",
  "/onboarding/yourLocation",
  "/onboarding/yourPhotos",
  "/onboarding/youAreDone",
];

const useOnboardingStep = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const path = pathname.replace(/\/$/, "") || "/";
  const index = Math.max(0, ONBOARDING_ROUTES.indexOf(path));
  const total = ONBOARDING_ROUTES.length;

  return {
    step: index + 1,
    total,
    isFirst: index === 0,
    isLast: index === total - 1,
    goPrev: () => index > 0 && navigate(ONBOARDING_ROUTES[index - 1]),
    goNext: () => index < total - 1 && navigate(ONBOARDING_ROUTES[index + 1]),
  };
};

export default useOnboardingStep