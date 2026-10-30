import { createBrowserRouter, Navigate } from "react-router";
import { OnboardingRoute, ProtectedRoute, AuthRoute } from "./../guards";
import { ActivityLayout, MessagesLayout, OnboardingLayout, RootLayout } from "../layouts";
import { ErrorPage, NotFound } from "../pages/Errors";
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail, Welcome } from "../pages/Auth";
import { AboutYou, YouAreDone, YourLocation, YourPhotos, YourStory } from "../pages/Onboarding";
import { Discover } from "../pages/Discover";
import { Matches } from "../pages/Matches";
import { Conversation, EmptyConversation } from "../pages/Messages";
import { ProfileView } from "../pages/ProfileView";
import { BlockedAccounts, MyProfile } from "../pages/MyProfile";
import { Settings } from "../pages/Settings";
import { Notifications } from "../pages/Notifications";
import { LikersPage, VisitorsPage } from "../pages/Activity";
import { Pro } from "../pages/Pro";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Just for unlogged users
      {
        element: <AuthRoute />,
        children: [
          { index: true, element: <Welcome /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Register /> },
          { path: "forgot-password", element: <ForgotPassword /> },
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
          { path: "settings/blocked", element: <BlockedAccounts /> },
          { path: "notifications", element: <Notifications /> },
          {
            path: "activity",
            element: <ActivityLayout />,
            children: [
              { index: true, element: <Navigate to="visitors" replace /> },
              { path: "visitors", element: <VisitorsPage /> },
              { path: "likes", element: <LikersPage /> },
            ],
          },
          { path: "pro", element: <Pro /> },
        ],
      },

      { path: "/resetpassword/:username/:code", element: <ResetPassword /> },
      { path: "confirm/:username/:code", element: <VerifyEmail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
