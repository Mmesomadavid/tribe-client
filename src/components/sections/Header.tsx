'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  X,
  Menu,
  ChevronDown,
  LogOut,
  SquarePen,
  UserRound,
  Settings,
  BriefcaseBusiness,
  Coins,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Logo from '../Logo';

const NAV_LINKS = [
  { label: 'Explore', href: '/explore' },
  { label: 'Hire Talent', href: '/hire' },
  { label: 'Get Hired', href: '/get-hired' },
  { label: 'Community', href: '/community' },
];

type HeaderProps = {
  variant?: 'public' | 'dashboard';
  user?: {
    name: string;
    role?: string;
    avatar?: string | null;
  } | null;
  onLogout?: () => void;
};

const Header = ({ variant = 'public', user, onLogout }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'jobs' | 'talents'>('jobs');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const discoverBasePath =
    variant === 'dashboard'
      ? user?.role === 'hiring'
        ? '/dashboard/hiring/discover'
        : '/dashboard/talent/discover'
      : '/discover';

  const communitiesBasePath =
    variant === 'dashboard'
      ? user?.role === 'hiring'
        ? '/dashboard/hiring/communities'
        : '/dashboard/talent/communities'
      : '/communities';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const nextFilter = user?.role === 'hiring' ? 'talents' : 'jobs';
    setSelectedFilter(nextFilter);
  }, [user?.role]);

  const placeholder =
    selectedFilter === 'jobs'
      ? 'Search jobs, skills, companies…'
      : 'Search candidates, skills, teams…';

  const profileInitial = user?.name?.trim()?.[0]?.toUpperCase() ?? 'U';

  if (variant === 'dashboard') {
    return (
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-7" />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem className="group">
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1">
                    <NavigationMenuLink href={`${discoverBasePath}/jobs`}>Jobs</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/freelance`}>Freelance Projects</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/companies`}>Companies</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/talent`}>Talent</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/article`}>Articles</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/career-guides`}>Career Guides</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/ai-insights`}>AI Insights</NavigationMenuLink>
                    <NavigationMenuLink href={`${discoverBasePath}/events`}>Events</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="group">
                <NavigationMenuTrigger>Communities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1">
                    <NavigationMenuLink href={`${communitiesBasePath}/browse`}>Browse Communities</NavigationMenuLink>
                    <NavigationMenuLink href={`${communitiesBasePath}/me`}>My Communities</NavigationMenuLink>
                    <NavigationMenuLink href={`${communitiesBasePath}/discussions`}>Discussions</NavigationMenuLink>
                    <NavigationMenuLink href={`${communitiesBasePath}/mentorship`}>Mentorship</NavigationMenuLink>
                    <NavigationMenuLink href={`${communitiesBasePath}/events`}>Events</NavigationMenuLink>
                    <NavigationMenuLink href={`${communitiesBasePath}/leaderboards`}>Leaderboards</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-xl">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={placeholder}
                className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-40 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none"
              />

              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
                    aria-expanded={filterOpen}
                  >
                    <SlidersHorizontal size={14} className="text-gray-500" />
                    <span className="font-medium text-[13px]">{selectedFilter === 'jobs' ? 'Jobs' : 'Candidates'}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-gray-100 z-50">
                      <button
                        onClick={() => {
                          setSelectedFilter('jobs');
                          setFilterOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        Jobs
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFilter('talents');
                          setFilterOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        Candidates
                      </button>
                    </div>
                  )}
                </div>

                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-sm hover:bg-zinc-900">
                  <Search size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="hidden gap-1.5 rounded-full bg-gray-950 text-white hover:bg-black sm:inline-flex"
            >
              <SquarePen size={14} />
              Write
            </Button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm hover:bg-gray-50"
              >
                <Avatar size="default" className="h-9 w-9">
                  <AvatarImage src={user?.avatar ?? undefined} alt={user?.name ?? 'User avatar'} />
                  <AvatarFallback className="bg-zinc-950 text-xs font-semibold text-white">
                    {profileInitial}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl z-50">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    <UserRound size={15} className="text-gray-500" />
                    My Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={15} className="text-gray-500" />
                    Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    <BriefcaseBusiness size={15} className="text-gray-500" />
                    Jobs
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    <Coins size={15} className="text-gray-500" />
                    Toins
                  </button>
                  <Separator className="my-1" />
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-lg' : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-6">
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-14" />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem className="group">
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1">
                    <NavigationMenuLink href="/discover/jobs">Jobs</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/freelance">Freelance Projects</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/companies">Companies</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/talent">Talent</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/articles">Articles</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/career-guides">Career Guides</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/ai-insights">AI Insights</NavigationMenuLink>
                    <NavigationMenuLink href="/discover/events">Events</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="group">
                <NavigationMenuTrigger>Communities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1">
                    <NavigationMenuLink href="/communities/browse">Browse Communities</NavigationMenuLink>
                    <NavigationMenuLink href="/communities/me">My Communities</NavigationMenuLink>
                    <NavigationMenuLink href="/communities/discussions">Discussions</NavigationMenuLink>
                    <NavigationMenuLink href="/communities/mentorship">Mentorship</NavigationMenuLink>
                    <NavigationMenuLink href="/communities/events">Events</NavigationMenuLink>
                    <NavigationMenuLink href="/communities/leaderboards">Leaderboards</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden flex-1 items-center md:flex">
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles, skills…"
                className="h-12 w-full rounded-full border border-transparent bg-gray-100 pl-11 pr-40 text-sm text-gray-700 placeholder:text-gray-400 transition-all focus:border-gray-300 focus:bg-white focus:outline-none"
              />

              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                    aria-expanded={filterOpen}
                  >
                    <SlidersHorizontal size={14} className="text-gray-500" />
                    <span className="font-medium text-[13px]">{selectedFilter === 'jobs' ? 'Jobs' : 'Talents'}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-100 bg-white shadow-lg z-50">
                      <button onClick={() => { setSelectedFilter('jobs'); setFilterOpen(false); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Jobs</button>
                      <button onClick={() => { setSelectedFilter('talents'); setFilterOpen(false); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Talents</button>
                    </div>
                  )}
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-sm hover:bg-zinc-900">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link to="/sign-in" className="hidden rounded-lg px-3 py-2 text-[13.5px] font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 md:inline-flex">
              Sign in
            </Link>

            <Link to="/sign-up" className="hidden md:inline-flex">
              <Button className="h-11 rounded-full bg-black px-5 text-[13.5px] font-medium text-white transition-all hover:bg-zinc-900">
                Get started free
                <ArrowRight size={14} className="opacity-80" />
              </Button>
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles, skills, companies…"
                  className="h-10 w-full rounded-xl bg-gray-100 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}

              <Separator className="my-2 bg-gray-100" />

              <Link
                to="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
              >
                Sign in
              </Link>

              <Link to="/sign-up" onClick={() => setMobileOpen(false)}>
                <Button className="mt-1 h-10 w-full rounded-xl bg-gray-950 text-sm font-medium text-white hover:bg-gray-800">
                  Get started free
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;