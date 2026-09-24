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
import Matches from "../pages/Matches/Matches";
import Messages from "../pages/Messages/Messages";
import MessagesLayout from "../layouts/MessagesLayout/MessagesLayout";
import EmptyConversation from "../pages/Messages/EmptyConversation";
import Conversation from "../pages/Messages/Conversation";
import ProfileView from "../pages/ProfileView/ProfileView";
import MyProfile from "../pages/MyProfile/MyProfile";
import Settings from "../pages/Settings/Settings";

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
  { path: "matches", element: <Matches /> },
  {
    path: "messages",
    element: <MessagesLayout />,
    children: [
      { index: true, element: <EmptyConversation /> },
      {
        path: ":matchId",
        element: <Conversation />,
      },
    ],
  },
  {path: "users/:userId",element: <ProfileView />},
  {path: "myProfile",element: <MyProfile />},
  {path: "settings",element: <Settings />},
]);
export default router;
