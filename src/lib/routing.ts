import type { Role } from "../contexts/Authcontext";

export const dashboardPathFor = (role?: Role | null): string => {
  switch (role) {
    case "talent":
      return "/dashboard/talent";
    case "hiring":
      return "/dashboard/hiring";
    case "admin":
      return "/admin";
    default:
      return "/";
  }
};

export const onboardingPathFor = (role?: Role | null): string => {
  switch (role) {
    case "talent":
      return "/onboarding/talent";
    case "hiring":
      return "/onboarding/hiring";
    default:
      return "/";
  }
};

// Where to send a user right after signup/login/verify, based on
// whether they've completed role-specific onboarding yet.
export const postAuthPathFor = (user?: { role?: Role; onboardingCompleted?: boolean } | null): string => {
  if (!user) return "/";
  return user.onboardingCompleted ? dashboardPathFor(user.role) : onboardingPathFor(user.role);
};