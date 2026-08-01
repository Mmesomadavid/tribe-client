import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import ForgotPassword from "./pages/Auth/Forgot-password"
import OAuthCallback from "./pages/Auth/OAuthCallback"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardRedirect from "./pages/DashboardRedirect"
import TalentDashboard from "./pages/Dashboard/TalentDashboard"
import HiringDashboard from "./pages/Dashboard/HiringDashboard"
import VerifyEmail from "./pages/Auth/VerifyEmail"
import ArticlesPage from "./pages/Articles"
import ArticleDetailPage from "./pages/ArticleDetail"
import DiscoveryRoutesPage from "./pages/DiscoveryRoutes"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/callback", element: <OAuthCallback /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/articles", element: <ArticlesPage /> },
  { path: "/articles/:slug", element: <ArticleDetailPage /> },
  { path: "/discover/*", element: <DiscoveryRoutesPage /> },
  { path: "/communities/*", element: <DiscoveryRoutesPage /> },
  {
    element: <ProtectedRoute />, // must be logged in for anything under here
    children: [
      { path: "/dashboard", element: <DashboardRedirect /> },
      {
        element: <ProtectedRoute allowedRoles={["talent"]} />,
        children: [
          { path: "/dashboard/talent", element: <TalentDashboard /> },
          { path: "/dashboard/talent/discover/*", element: <DiscoveryRoutesPage variant="dashboard" /> },
          { path: "/dashboard/talent/communities/*", element: <DiscoveryRoutesPage variant="dashboard" /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["hiring"]} />,
        children: [
          { path: "/dashboard/hiring", element: <HiringDashboard /> },
          { path: "/dashboard/hiring/discover/*", element: <DiscoveryRoutesPage variant="dashboard" /> },
          { path: "/dashboard/hiring/communities/*", element: <DiscoveryRoutesPage variant="dashboard" /> },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App