import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Welcome from "../pages/Auth/Welcome";
import Discover from "../pages/Discover/Discover";
import OnboardingLayout from "../layouts/OnboardingLayout/OnboardingLayout";
import AboutYou from "../pages/Onboarding/AboutYou";
import YourStory from "../pages/Onboarding/YourStory";
import YourLocation from "../pages/Onboarding/YourLocation";
import YourPhotos from "../pages/Onboarding/YourPhotos";
import YouAreDone from "../pages/Onboarding/YouAreDone";
import Match from "../pages/Match/Match";

const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "signup", element: <Register /> },
  { path: "welcome", element: <Welcome /> },
  { path: "discover", element: <Discover /> },
  {
    path: "onboarding",
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <AboutYou /> },
      { path: "yourStory", element: <YourStory /> },
      { path: "yourLocation", element: <YourLocation /> },
      { path: "yourPhotos", element: <YourPhotos /> },
      { path: "youAreDone", element: <YouAreDone /> },
    ],
  },
  { path: "match", element: <Match /> },
]);
export default router;
