// routes/router.tsx
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import { OnboardingRoute, ProtectedRoute, AuthRoute } from "./../guards";
import Welcome from "../pages/Auth/Welcome";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import OnboardingLayout from "../layouts/OnboardingLayout/OnboardingLayout";
import AboutYou from "../pages/Onboarding/AboutYou";
import YourStory from "../pages/Onboarding/YourStory";
import YourLocation from "../pages/Onboarding/YourLocation";
import YourPhotos from "../pages/Onboarding/YourPhotos";
import YouAreDone from "../pages/Onboarding/YouAreDone";
import Discover from "../pages/Discover/Discover";
import Match from "../pages/Match/Match";
import Matches from "../pages/Matches/Matches";
import MessagesLayout from "../layouts/MessagesLayout/MessagesLayout";
import EmptyConversation from "../pages/Messages/EmptyConversation";
import Conversation from "../pages/Messages/Conversation";
import ProfileView from "../pages/ProfileView/ProfileView";
import MyProfile from "../pages/MyProfile/MyProfile";
import Settings from "../pages/Settings/Settings";
import Notifications from "../pages/Notifications/Notifications";
import NotFound from "../pages/Errors/NotFound";
import ErrorPage from "../pages/Errors/ErrorPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement : <ErrorPage />,
    children: [
      // Just for unlogged users
      {
        element: <AuthRoute />,
        children: [
          { index: true, element: <Welcome /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Register /> },
        ],
      },

      // Just for logge in users with uncompleted profile
      {
        element: <OnboardingRoute />,
        children: [
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
        ],
      },

      //Just for logged in users with complete profile
      {
        element: <ProtectedRoute />,
        children: [
          { path: "discover", element: <Discover /> },
          { path: "match", element: <Match /> },
          { path: "matches", element: <Matches /> },
          {
            path: "messages",
            element: <MessagesLayout />,
            children: [
              { index: true, element: <EmptyConversation /> },
              { path: ":matchId", element: <Conversation /> },
            ],
          },
          { path: "users/:userId", element: <ProfileView /> },
          { path: "myProfile", element: <MyProfile /> },
          { path: "settings", element: <Settings /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
