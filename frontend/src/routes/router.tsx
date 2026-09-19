import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Welcome from "../pages/Auth/Welcome";
import Discover from "../pages/Discover/Discover";

const router = createBrowserRouter([
    {path : "login" , element : <Login />},
    {path : "signup" , element : <Register />},
    {path : "welcome" , element : <Welcome />},
    {path : "discover" , element : <Discover />},
])
export default router