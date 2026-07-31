import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import ForgotPassword from "./pages/Auth/Forgot-password"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App