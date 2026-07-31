'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight, X, Menu, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import Logo from '../Logo';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Explore',   href: '/explore' },
  { label: 'Hire Talent', href: '/hire' },
  { label: 'Get Hired',   href: '/get-hired' },
  { label: 'Community',   href: '/community' },
];

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'jobs' | 'talents'>('jobs');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm'
          : 'bg-white'
      }`}
    >
      {/* ── Desktop bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-6">

          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Logo className="h-7" />
          </a>

          {/* Nav links with chevrons + hover popovers */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-2 px-3.5 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-150"
                >
                  <span>{link.label}</span>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>

                {/* simple hover popover - replace contents with real items later */}
                <div className="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 absolute left-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100 py-3">
                  <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">Overview</div>
                  <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">Sub-item A</div>
                  <div className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">Sub-item B</div>
                </div>
              </div>
            ))}
          </nav>

          {/* Search: narrower width, taller, filter + search button */}
          <div className="hidden md:flex items-center flex-1 max-w-md ml-6">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search roles, skills…"
                className="w-full h-12 pl-11 pr-40 rounded-full bg-gray-100 border border-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                {/* Filter button with simple dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                    aria-expanded={filterOpen}
                  >
                    <SlidersHorizontal size={14} className="text-gray-500" />
                    <span className="font-medium text-[13px]">{selectedFilter === 'jobs' ? 'Jobs' : 'Talents'}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-100 z-50">
                      <button onClick={() => { setSelectedFilter('jobs'); setFilterOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Jobs</button>
                      <button onClick={() => { setSelectedFilter('talents'); setFilterOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Talents</button>
                    </div>
                  )}
                </div>

                {/* Search submit button */}
                <button className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center shadow-sm hover:bg-zinc-900">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-4">
            <a
              href="/sign-in"
              className="hidden md:inline-flex text-[13.5px] font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              Sign in
            </a>

            <a href="/sign-up" className="hidden md:inline-flex">
              <Button className="h-11 px-5 rounded-full bg-black hover:bg-zinc-900 text-white text-[13.5px] font-medium flex items-center gap-2 transition-all">
                Get started free
                <ArrowRight size={14} className="opacity-80" />
              </Button>
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles, skills, companies…"
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-gray-100 text-sm placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}

              <Separator className="my-2 bg-gray-100" />

              <a
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                Sign in
              </a>

              <a href="/sign-up" onClick={() => setMobileOpen(false)}>
                <Button className="w-full h-10 mt-1 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-sm font-medium">
                  Get started free
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;