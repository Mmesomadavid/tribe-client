import { CheckCircle2, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import { Progress } from "../../../components/ui/progress";

import { useAuth } from "../../../contexts/Authcontext";

const ProfileCard = () => {
  const { user } = useAuth();

  const profileCompletion = 72;

  const fullName =
    user?.name ||
    user?.displayName ||
    "User";

  const avatar =
    user?.photoURL ||
    user?.avatar ||
    user?.profileImage ||
    "";

  const jobTitle =
    user?.title ||
    user?.role ||
    "Software Engineer";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-gray-100/50 shadow-none">
      <CardContent className="p-5">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-white">
            <AvatarImage
              src={avatar}
              alt={fullName}
            />

            <AvatarFallback className="bg-white text-sm font-semibold text-gray-900">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold tracking-tight text-gray-900">
              {fullName}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {jobTitle}
            </p>
          </div>
        </div>

        {/* Visibility */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-sm font-medium text-gray-800">
              Profile visible
            </span>
          </div>

          <button
            type="button"
            className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Change
          </button>
        </div>

        {/* Profile completion */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-800">
                Profile completion
              </span>

              {profileCompletion >= 70 && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              )}
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {profileCompletion}%
            </span>
          </div>

          <Progress
            value={profileCompletion}
            className="h-2 bg-gray-200 rounded-xl"
          />

          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            Complete your profile to get better job matches.
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
        >
          <span>Complete profile</span>

          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;