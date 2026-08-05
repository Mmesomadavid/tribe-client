import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import ForgotPassword from "./pages/Auth/Forgot-password"
import OAuthCallback from "./pages/Auth/OAuthCallback"
import VerifyEmail from "./pages/Auth/VerifyEmail"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/callback", element: <OAuthCallback /> },
  { path: "/verify-email", element: <VerifyEmail /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App