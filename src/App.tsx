import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";

import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/Forgot-password";
import OAuthCallback from "./pages/Auth/OAuthCallback";
import VerifyEmail from "./pages/Auth/VerifyEmail";

import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingGate from "./routes/OnboardingGate";

import TalentOnboarding from "./pages/Onboarding/TalentOnboarding";
import HiringOnboarding from "./pages/Onboarding/HiringOnboarding";

import TalentDashboardLayout from "./layouts/Talent/TalentDashboardLayout";
import HiringDashboardLayout from "./layouts/Hiring/HiringDashboardLayout";

import TalentDashboardHome from "./pages/Talent/DashboardHome";
import HiringDashboardHome from "./pages/Hiring/DashboardHome";

// Blog
import BlogHome from "./pages/Blog/BlogHome";
import BlogPost from "./pages/Blog/BlogPost";
import WriteBlog from "./pages/Blog/WriteBlog";
import MyBlogs from "./pages/Blog/MyBlogs";
import EditBlog from "./pages/Blog/EditBlog";



// Applications
import MyApplications from "./pages/Talent/Applications/MyApplications";

// Saved Jobs
import SavedJobs from "./pages/Talent/SavedJobs/SavedJobs";

// AI Resume
import AIResume from "./pages/Talent/AIResume/AiResume";

// Messages
import Messages from "./pages/Talent/Messages/Messages";




// ─────────────────────────────────────────────
// Temporary page
// ─────────────────────────────────────────────

const TalentPage = ({ title }: { title: string }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-muted-foreground">
        This section is coming soon.
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

const router = createBrowserRouter([
  // ─────────────────────────────────────────────
  // Public Routes
  // ─────────────────────────────────────────────

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

  {
    path: "/auth/callback",
    element: <OAuthCallback />,
  },

  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },

  // ─────────────────────────────────────────────
  // Onboarding Routes
  // Authenticated + role-gated, but deliberately NOT behind
  // OnboardingGate — that gate is what redirects INTO these
  // routes, so gating them again would create a loop.
  // ─────────────────────────────────────────────

  {
    element: <ProtectedRoute allowedRoles={["talent"]} />,
    children: [
      {
        path: "/onboarding/talent",
        element: <TalentOnboarding />,
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["hiring"]} />,
    children: [
      {
        path: "/onboarding/hiring",
        element: <HiringOnboarding />,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Talent Routes
  // ─────────────────────────────────────────────

  {
    element: <ProtectedRoute allowedRoles={["talent"]} />,

    children: [
      {
        // Redirects to /onboarding/talent if the user hasn't
        // finished onboarding yet; otherwise renders the dashboard.
        element: <OnboardingGate />,

        children: [
          {
            path: "/dashboard/talent",
            element: <TalentDashboardLayout />,

            children: [
              // ─────────────────────────────────────────
              // Talent Dashboard Home
              // /dashboard/talent
              // ─────────────────────────────────────────

              {
                index: true,
                element: <TalentDashboardHome />,
              },

              // ─────────────────────────────────────────
              // Applications
              // /dashboard/talent/applications
              // ─────────────────────────────────────────

              {
                path: "applications",
                element: <MyApplications />,
              },

              // ─────────────────────────────────────────
              // Saved Jobs
              // /dashboard/talent/saved-jobs
              // ─────────────────────────────────────────

              {
                path: "saved-jobs",
                element: <SavedJobs title="Saved Jobs" />,
              },

              // ─────────────────────────────────────────
              // AI Resume
              // /dashboard/talent/resume
              // ─────────────────────────────────────────

              {
                path: "resume",
                element: <AIResume title="AI Resume" />,
              },


              // ─────────────────────────────────────────
              // Messages
              // /dashboard/talent/messages
              // ─────────────────────────────────────────

              {
                path: "messages",
                element: <Messages title="Messages" />,
              },

              // ─────────────────────────────────────────
              // Profile
              // /dashboard/talent/profile
              // ─────────────────────────────────────────

              {
                path: "profile",
                element: <TalentPage title="Profile" />,
              },

              // ─────────────────────────────────────────
              // Settings
              // /dashboard/talent/settings
              // ─────────────────────────────────────────

              {
                path: "settings",
                element: <TalentPage title="Settings" />,
              },

              // ─────────────────────────────────────────
              // Talent Blog
              // ─────────────────────────────────────────

              {
                path: "blog",

                children: [
                  // /dashboard/talent/blog
                  {
                    index: true,
                    element: <BlogHome />,
                  },

                  // /dashboard/talent/blog/write
                  {
                    path: "write",
                    element: <WriteBlog />,
                  },

                  // /dashboard/talent/blog/my-blogs
                  {
                    path: "my-blogs",
                    element: <MyBlogs />,
                  },

                  // /dashboard/talent/blog/edit/:slug
                  {
                    path: "edit/:slug",
                    element: <EditBlog />,
                  },

                  // /dashboard/talent/blog/:slug
                  {
                    path: ":slug",
                    element: <BlogPost />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Hiring Routes
  // ─────────────────────────────────────────────

  {
    element: <ProtectedRoute allowedRoles={["hiring"]} />,

    children: [
      {
        element: <OnboardingGate />,

        children: [
          {
            path: "/dashboard/hiring",
            element: <HiringDashboardLayout />,

            children: [
              // /dashboard/hiring
              {
                index: true,
                element: <HiringDashboardHome />,
              },

              // Hiring routes will go here later.
            ],
          },
        ],
      },
    ],
  },
]);

// ─────────────────────────────────────────────
// App
// ─────────────────────────────────────────────

function App() {
  return <RouterProvider router={router} />;
}

export default App;