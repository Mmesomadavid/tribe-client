import { useEffect, useRef } from "react";
import gsap from "gsap";
import { UserPlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

const SuggestedUsers = () => {
  const users = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Senior Software Engineer",
      avatar: "",
      initials: "AM",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Designer",
      avatar: "",
      initials: "SW",
    },
    {
      id: 3,
      name: "Daniel Okafor",
      role: "Cloud Engineer",
      avatar: "",
      initials: "DO",
    },
  ];

  const usersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = usersRef.current.filter(Boolean);

    if (!elements.length) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <Card className="rounded-2xl border-0 bg-gray-50 shadow-none border">
      <CardHeader className="px-5 pb-3 pt-5">
        <CardTitle className="text-sm font-semibold tracking-tight text-gray-900">
          Who to follow
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(element) => {
              usersRef.current[index] = element;
            }}
            className="flex items-center gap-3"
          >
            {/* Avatar */}
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
              />

              <AvatarFallback className="bg-white text-xs font-semibold text-gray-700">
                {user.initials}
              </AvatarFallback>
            </Avatar>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {user.name}
              </p>

              <p className="truncate text-xs text-gray-500">
                {user.role}
              </p>
            </div>

            {/* Follow */}
            <button
              type="button"
              aria-label={`Follow ${user.name}`}
              className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <UserPlus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-105" />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="pt-1 text-xs font-semibold text-gray-600 transition-colors hover:text-gray-950"
        >
          Show more
        </button>
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
