import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Welcome from "../pages/Auth/Welcome";
import Discover from "../pages/Discover/Discover";
import OnboardingLayout from "../layouts/OnboardingLayout/OnboardingLayout";
import AboutYou from "../pages/Onboarding/AboutYou";
import YourStory from "../pages/Onboarding/YourStory";

const router = createBrowserRouter([
    {path : "login" , element : <Login />},
    {path : "signup" , element : <Register />},
    {path : "welcome" , element : <Welcome />},
    {path : "discover" , element : <Discover />},
    {path : "onboarding" , element : <OnboardingLayout /> , children : [
        { index : true , element : <AboutYou />},
        { path : "yourStory" , element : <YourStory />},
    ]},
])
export default router