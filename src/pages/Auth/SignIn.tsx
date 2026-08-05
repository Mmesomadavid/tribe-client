'use client';

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../..//components/ui/separator';
import Logo from '../..//components/Logo';
import GoogleIcon from '../../assets/icons/google-icon.png';
import GithubIcon from '../../assets/icons/github-icon.png';
import { useAuth } from '../../contexts/Authcontext';
import { apiFetch, ApiError, AUTH_BASE } from '../../lib/api';
// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const rightPanelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.1 },
  },
};

// ─── Orb Background (right panel) ─────────────────────────────────────────────

const OrbBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base dark texture */}
    <div className="absolute inset-0 bg-[#0a0a0a]" />

    {/* Subtle noise overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
      }}
    />

    {/* Glowing orbs */}
    <div
      className="absolute rounded-full opacity-20 blur-[80px]"
      style={{
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        top: '-10%',
        right: '-5%',
      }}
    />
    <div
      className="absolute rounded-full opacity-10 blur-[100px]"
      style={{
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, #a0a0a0 0%, transparent 70%)',
        bottom: '5%',
        left: '10%',
      }}
    />
    <div
      className="absolute rounded-full opacity-[0.07] blur-[60px]"
      style={{
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        top: '40%',
        left: '30%',
      }}
    />

    {/* Thin grid lines */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  </div>
);

// ─── Sign In Page ─────────────────────────────────────────────────────────────

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState<'email' | 'google' | 'github' | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const orbRef = useRef<HTMLDivElement>(null);

  // GSAP subtle floating animation on the right-panel orb
  useEffect(() => {
    if (!orbRef.current) return;
    const orbs = orbRef.current.querySelectorAll('.gsap-orb');
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: i % 2 === 0 ? -18 : 18,
        x: i % 3 === 0 ? 12 : -12,
        duration: 4 + i * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      });
    });
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading('email');

    try {
      const data = await apiFetch<{ accessToken: string; user: any }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, rememberMe }),
      });

      setAuth(data.accessToken, data.user);
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.data?.requiresVerification) {
        navigate(`/verify-email?email=${encodeURIComponent(err.data.email ?? email)}`);
        return;
      }

      setFormError(
        err instanceof ApiError
          ? err.message
          : 'Unable to sign in right now. Please try again.'
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleOAuth = (provider: 'google' | 'github') => {
    setIsLoading(provider);
    window.location.href = `${AUTH_BASE}/${provider}`;
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">

      {/* ── Left Panel ───────────────────────────────────────────── */}
      <motion.div
        className="relative flex flex-col w-full lg:w-[45%] xl:w-[42%] px-10 py-10 md:px-14 lg:px-16 xl:px-20 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-auto">
          <Logo />
        </motion.div>

        {/* Headline */}
        <div className="mt-16 mb-10">
          <motion.h1
            variants={itemVariants}
            className="text-[2.6rem] leading-[1.15] font-semibold tracking-tight text-gray-950 mb-3"
          >
            Welcome
            <br />
            back,{' '}
            <em className="not-italic text-gray-400 font-light">friend.</em>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-400 leading-relaxed max-w-[280px]"
          >
            Sign in to your Tribe account to continue your journey.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleEmailSignIn}
          className="flex flex-col gap-4 mb-6"
        >
          {formError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {formError}
            </div>
          ) : null}
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm placeholder:text-gray-300 pr-11 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                className="rounded-md border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
              />
              <Label htmlFor="remember" className="text-xs text-gray-800 cursor-pointer">
                Remember me
              </Label>
            </div>
            <a
              href="/forgot-password"
              className="text-xs text-gray-400 hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading !== null}
            className="h-11 mt-1 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-sm font-medium flex items-center gap-2 group transition-all duration-200"
          >
            {isLoading === 'email' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing in…
              </span>
            ) : (
              <>
                Sign in
                <ArrowRight
                  size={15}
                  className="opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200"
                />
              </>
            )}
          </Button>
        </motion.form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <Separator className="flex-1 bg-gray-100" />
          <span className="text-xs text-black font-medium shrink-0">or continue with</span>
          <Separator className="flex-1 bg-gray-100" />
        </motion.div>

        {/* OAuth buttons (mobile fallback — shown on small screens) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 lg:hidden mb-8">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleOAuth('google')}
            className="h-11 rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-all"
          >
            {isLoading === 'google' ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <img src={GoogleIcon} alt="google" draggable="false" className='h-8 w-8'/>
            )}
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleOAuth('github')}
            className="h-11 rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-all"
          >
            {isLoading === 'github' ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <img src={GithubIcon} alt="github" draggable="false" className='h-8 w-8' />
            )}
            Continue with GitHub
          </Button>
        </motion.div>

        {/* Sign up link */}
        <motion.p variants={itemVariants} className="text-xs text-gray-400 mt-auto pt-6">
          Don't have an account?{' '}
          <a
            href="/sign-up"
            className="text-gray-900 font-medium hover:underline underline-offset-4 transition-colors"
          >
            Sign up
          </a>
        </motion.p>

        {/* Copyright */}
        <motion.p variants={itemVariants} className="text-[11px] text-gray-300 mt-4">
          © {new Date().getFullYear()} Tribe. All rights reserved.
        </motion.p>
      </motion.div>

      {/* ── Right Panel ──────────────────────────────────────────── */}
      <motion.div
        className="relative hidden lg:flex flex-1 items-center justify-center overflow-hidden"
        variants={rightPanelVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated dark background */}
        <div ref={orbRef} className="absolute inset-0">
          <OrbBackground />

          {/* GSAP animated orbs */}
          <div
            className="gsap-orb absolute rounded-full opacity-[0.12] blur-[90px]"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)',
              top: '-15%',
              right: '-10%',
            }}
          />
          <div
            className="gsap-orb absolute rounded-full opacity-[0.08] blur-[70px]"
            style={{
              width: '380px',
              height: '380px',
              background: 'radial-gradient(circle, #c0c0c0 0%, transparent 65%)',
              bottom: '-5%',
              left: '5%',
            }}
          />
          <div
            className="gsap-orb absolute rounded-full opacity-[0.06] blur-[50px]"
            style={{
              width: '220px',
              height: '220px',
              background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)',
              top: '42%',
              left: '35%',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-12 max-w-sm w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/50 font-medium tracking-wide">Quick sign in</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
              One click to get in
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Use your existing account to sign in securely — no password needed.
            </p>
          </motion.div>

          {/* OAuth Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col gap-3 w-full"
          >
            {/* Google */}
            <button
              type="button"
              disabled={isLoading !== null}
              onClick={() => handleOAuth('google')}
              className="group relative w-full h-13 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'google' ? (
                <svg className="animate-spin h-4 w-4 text-white/60" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <img src={GoogleIcon} alt="google" draggable="false" className='h-8 w-8' />
              )}
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Continue with Google
              </span>
              <ArrowRight
                size={14}
                className="ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200"
              />
            </button>

            {/* GitHub */}
            <button
              type="button"
              disabled={isLoading !== null}
              onClick={() => handleOAuth('github')}
              className="group relative w-full h-13 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'github' ? (
                <svg className="animate-spin h-4 w-4 text-white/60" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <img src={GithubIcon} alt="github" className="h-8 w-8" draggable={false} />
              )}
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Continue with GitHub
              </span>
              <ArrowRight
                size={14}
                className="ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200"
              />
            </button>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-[11px] text-white/25 text-center leading-relaxed"
          >
            We'll never post anything without your permission.
            <br />
            Your data stays yours.
          </motion.p>
        </div>

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </motion.div>

    </div>
  );
};

export default SignIn;