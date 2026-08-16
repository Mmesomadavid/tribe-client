import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import { onboardingPathFor } from "../lib/routing";

const OnboardingGate = () => {
  const { user, accessToken, isAuthenticated, isLoading } = useAuth();

  console.log("========== ONBOARDING DEBUG ==========");
  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("accessToken exists:", !!accessToken);
  console.log("user:", user);
  console.log(
    "user.onboardingCompleted:",
    user?.onboardingCompleted
  );
  console.log("user.role:", user?.role);
  console.log("=======================================");

  if (isLoading) {
    return null;
  }

  if (!user) {
    console.log("❌ NO USER");
    return <Navigate to="/sign-in" replace />;
  }

  if (!user.onboardingCompleted) {
    console.log("🚨 USER IS BEING SENT TO ONBOARDING");

    return (
      <Navigate
        to={onboardingPathFor(user.role)}
        replace
      />
    );
  }

  console.log("✅ ONBOARDING COMPLETE — SHOWING DASHBOARD");

  return <Outlet />;
};

export default OnboardingGate;