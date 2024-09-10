import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/sign-up',
        element: <Signup />
    },
    {
        path: '/sign-in',
        element: <Signin />
    }
])

export default router;