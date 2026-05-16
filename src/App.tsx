import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"

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
])

function App() {
  return <RouterProvider router={router} />
}

export default App