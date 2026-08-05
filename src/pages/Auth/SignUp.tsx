'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Eye, EyeOff, ArrowRight, ArrowLeft, BriefcaseBusiness, UserRound, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import Logo from '../../components/Logo';
import GoogleIcon from '../../assets/icons/google-icon.png';
import GithubIcon from '../../assets/icons/github-icon.png';
import { apiFetch, AUTH_BASE, ApiError } from '../../lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'hiring' | 'talent' | null;
type Step = 'role' | 'details' | 'otp';

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

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

// ─── Orb Background ───────────────────────────────────────────────────────────

const OrbBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#0a0a0a]" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
      }}
    />
    <div className="absolute rounded-full opacity-20 blur-[80px]" style={{ width: '420px', height: '420px', background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', top: '-10%', right: '-5%' }} />
    <div className="absolute rounded-full opacity-10 blur-[100px]" style={{ width: '350px', height: '350px', background: 'radial-gradient(circle, #a0a0a0 0%, transparent 70%)', bottom: '5%', left: '10%' }} />
    <div className="absolute rounded-full opacity-[0.07] blur-[60px]" style={{ width: '200px', height: '200px', background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', top: '40%', left: '30%' }} />
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  </div>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

// ─── Role Card ────────────────────────────────────────────────────────────────

const RoleCard = ({
  role,
  selected,
  onSelect,
  icon: Icon,
  title,
  description,
  perks,
}: {
  role: Role;
  selected: Role;
  onSelect: (r: Role) => void;
  icon: React.ElementType;
  title: string;
  description: string;
  perks: string[];
}) => {
  const isSelected = selected === role;

  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={`
        relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
        ${isSelected
          ? 'border-gray-950 bg-black text-white shadow-lg'
          : 'border-gray-200 bg-gray-50/60 hover:border-gray-300 hover:bg-gray-50 text-gray-900'
        }
      `}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'backOut' }}
            className="absolute top-4 right-4 h-5 w-5 rounded-full bg-white flex items-center justify-center"
          >
            <Check size={11} className="text-gray-950 stroke-[3]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mb-3 inline-flex items-center justify-center h-10 w-10 rounded-xl ${isSelected ? 'bg-white/10' : 'bg-gray-200/60'}`}>
        <Icon size={18} className={isSelected ? 'text-white' : 'text-gray-600'} />
      </div>

      <p className={`font-semibold text-[15px] mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>{title}</p>
      <p className={`text-xs leading-relaxed mb-3 ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>{description}</p>

      <ul className="flex flex-col gap-1.5">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <span className={`h-1 w-1 rounded-full shrink-0 ${isSelected ? 'bg-white/40' : 'bg-gray-300'}`} />
            <span className={`text-[11px] ${isSelected ? 'text-white/50' : 'text-gray-400'}`}>{perk}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

// ─── Right Panel Content ───────────────────────────────────────────────────────

const rightContent: Record<NonNullable<Role> | 'default', { badge: string; heading: string; sub: string }> = {
  default: {
    badge: 'Quick sign up',
    heading: 'One click to join',
    sub: 'Use your existing account to sign up securely — no password needed.',
  },
  hiring: {
    badge: 'For hiring managers',
    heading: 'Start hiring smarter',
    sub: 'Connect your account and get instant access to AI-matched talent for your roles.',
  },
  talent: {
    badge: 'For job seekers',
    heading: 'Your next role awaits',
    sub: 'Connect your account and let AI match you to jobs that fit your skills perfectly.',
  },
};

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  github_talent_only: 'GitHub sign-up is only available for Talent accounts.',
  no_email_from_google: 'We couldn\u2019t get an email address from Google. Try another method.',
  no_email_from_github: 'We couldn\u2019t get an email address from GitHub. Try another method.',
  server_error: 'Something went wrong. Please try again.',
  oauth_failed: 'Sign up was cancelled or failed. Please try again.',
};

// ─── Sign Up Page ─────────────────────────────────────────────────────────────

const SignUp = () => {
  const [step, setStep] = useState<Step>('role');
  const [direction, setDirection] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState<'email' | 'google' | 'github' | 'otp' | 'resend' | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const orbRef = useRef<HTMLDivElement>(null);

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

  // Surface OAuth errors that come back as ?error=... after redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get('error');
    if (err) {
      setFormError(OAUTH_ERROR_MESSAGES[err] || 'Sign up failed. Please try again.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const goToDetails = () => {
    if (!selectedRole) return;
    setFormError(null);
    setDirection(1);
    setStep('details');
  };

  const goBack = () => {
    setDirection(-1);
    setStep(step === 'otp' ? 'details' : 'role');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm || !selectedRole) return;
    setFormError(null);
    setIsLoading('email');
    try {
      await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role: selectedRole }),
      });
      setDirection(1);
      setStep('otp');
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setOtpError(null);
    setIsLoading('otp');
    try {
      const data = await apiFetch<{ accessToken: string }>('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
      // Store access token however your app manages auth state (context, memory, etc.)
      localStorage.setItem('accessToken', data.accessToken);
      window.location.href = '/';
    } catch (err) {
      setOtpError(err instanceof ApiError ? err.message : 'Verification failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleResendOtp = async () => {
    setOtpError(null);
    setResendMessage(null);
    setIsLoading('resend');
    try {
      await apiFetch('/api/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setResendMessage('A new code has been sent to your email.');
    } catch (err) {
      setOtpError(err instanceof ApiError ? err.message : 'Could not resend code. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleOAuth = (provider: 'google' | 'github') => {
    if (!selectedRole) return;
    if (provider === 'github' && selectedRole === 'hiring') {
      setFormError('GitHub sign-up is only available for Talent accounts.');
      return;
    }
    setIsLoading(provider);
    window.location.href = `${AUTH_BASE}/${provider}?role=${selectedRole}`;
  };

  const rightKey = selectedRole ? rightContent[selectedRole] : rightContent['default'];
  const passwordMismatch = confirm.length > 0 && password !== confirm;
  const githubDisabledForHiring = selectedRole === 'hiring';

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">

      {/* ── Left Panel ───────────────────────────────────────────── */}
      <motion.div
        className="relative flex flex-col w-full lg:w-[45%] xl:w-[42%] px-10 py-10 md:px-14 lg:px-16 xl:px-20 z-10 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <Logo />
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-2 mt-6 mb-10">
          <div className={`h-1 w-8 rounded-full transition-all duration-300 ${step === 'role' ? 'bg-gray-950' : 'bg-gray-200'}`} />
          <div className={`h-1 w-8 rounded-full transition-all duration-300 ${step === 'details' ? 'bg-gray-950' : 'bg-gray-200'}`} />
          <div className={`h-1 w-8 rounded-full transition-all duration-300 ${step === 'otp' ? 'bg-gray-950' : 'bg-gray-200'}`} />
          <span className="ml-2 text-[11px] text-gray-400">
            {step === 'role' ? 'Step 1 of 3' : step === 'details' ? 'Step 2 of 3' : 'Step 3 of 3'}
          </span>
        </motion.div>

        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
          >
            {formError}
          </motion.div>
        )}

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ── Step 1: Role Selection ── */}
            {step === 'role' && (
              <motion.div
                key="role"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col flex-1"
              >
                <div className="mb-8">
                  <h1 className="text-[2.2rem] leading-[1.15] font-semibold tracking-tight text-gray-950 mb-3">
                    Join Tribe
                    <br />
                    as a{' '}
                    <em className="not-italic text-gray-400 font-light">
                      {selectedRole === 'hiring' ? 'Hiring ' : selectedRole === 'talent' ? 'Talent' : '…'}
                    </em>
                  </h1>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-[280px]">
                    Tell us how you plan to use Tribe so we can tailor your experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <RoleCard
                    role="hiring"
                    selected={selectedRole}
                    onSelect={setSelectedRole}
                    icon={BriefcaseBusiness}
                    title="Hiring "
                    description="I'm looking to hire and build my team."
                    perks={['Post jobs & manage applications', 'AI-matched candidate recommendations', 'Collaborative hiring pipeline']}
                  />
                  <RoleCard
                    role="talent"
                    selected={selectedRole}
                    onSelect={setSelectedRole}
                    icon={UserRound}
                    title="Talent"
                    description="I'm looking for my next opportunity."
                    perks={['Apply with one click', 'AI-powered job matching', 'Real-time application tracking']}
                  />
                </div>

                <Button
                  type="button"
                  disabled={!selectedRole}
                  onClick={goToDetails}
                  className="h-11 rounded-xl bg-black hover:bg-gray-800 text-white text-sm font-medium flex items-center gap-2 group transition-all duration-200 disabled:opacity-40"
                >
                  Continue
                  <ArrowRight
                    size={15}
                    className="opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200"
                  />
                </Button>
              </motion.div>
            )}

            {/* ── Step 2: Details Form ── */}
            {step === 'details' && (
              <motion.div
                key="details"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col flex-1"
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-6 w-fit"
                >
                  <ArrowLeft size={13} />
                  Change role
                </button>

                <div className="mb-7">
                  <h1 className="text-[2.2rem] leading-[1.15] font-semibold tracking-tight text-gray-950 mb-3">
                    Create your
                    <br />
                    <em className="not-italic text-gray-400 font-light">account.</em>
                  </h1>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Signing up as a{' '}
                    <span className="text-gray-900 font-medium">
                      {selectedRole === 'hiring' ? 'Hiring Manager' : 'Talent'}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSignUp} className="flex flex-col gap-4 mb-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Full name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all"
                    />
                  </div>

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

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
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

                  <div className="space-y-1.5">
                    <Label htmlFor="confirm" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className={`h-11 rounded-xl text-sm placeholder:text-gray-300 pr-11 transition-all
                          ${passwordMismatch
                            ? 'border-red-300 bg-red-50/40 focus-visible:ring-red-400 focus-visible:border-red-400'
                            : 'border-gray-200 bg-gray-50/60 focus-visible:ring-gray-900 focus-visible:border-gray-900'
                          } focus-visible:ring-1`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {passwordMismatch && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[11px] text-red-500"
                        >
                          Passwords don't match
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading !== null || passwordMismatch}
                    className="h-11 mt-1 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-sm font-medium flex items-center gap-2 group transition-all duration-200 disabled:opacity-40"
                  >
                    {isLoading === 'email' ? (
                      <span className="flex items-center gap-2">
                        <Spinner />
                        Creating account…
                      </span>
                    ) : (
                      <>
                        Create account
                        <ArrowRight size={15} className="opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="flex items-center gap-3 mb-5">
                  <Separator className="flex-1 bg-gray-100" />
                  <span className="text-xs text-black font-medium shrink-0">or continue with</span>
                  <Separator className="flex-1 bg-gray-100" />
                </div>

                <div className="flex flex-col gap-3 lg:hidden">
                  <Button type="button" variant="outline" disabled={isLoading !== null} onClick={() => handleOAuth('google')} className="h-11 rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-all">
                    {isLoading === 'google' ? <Spinner /> : <img src={GoogleIcon} alt="google" draggable={false} className="h-5 w-5" />}
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading !== null || githubDisabledForHiring}
                    onClick={() => handleOAuth('github')}
                    title={githubDisabledForHiring ? 'GitHub sign-up is only available for Talent accounts' : undefined}
                    className="h-11 rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-all disabled:opacity-40"
                  >
                    {isLoading === 'github' ? <Spinner /> : <img src={GithubIcon} alt="github" draggable={false} className="h-5 w-5" />}
                    Continue with GitHub
                  </Button>
                  {githubDisabledForHiring && (
                    <p className="text-[11px] text-gray-400 -mt-1">GitHub sign-up is available for Talent accounts only.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Step 3: OTP Verification ── */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col flex-1"
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-6 w-fit"
                >
                  <ArrowLeft size={13} />
                  Back
                </button>

                <div className="mb-7">
                  <h1 className="text-[2.2rem] leading-[1.15] font-semibold tracking-tight text-gray-950 mb-3">
                    Check your
                    <br />
                    <em className="not-italic text-gray-400 font-light">inbox.</em>
                  </h1>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Enter the 6-digit code we sent to{' '}
                    <span className="text-gray-900 font-medium">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 mb-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="otp" className="text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Verification code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/60 text-lg tracking-[0.4em] text-center placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all"
                    />
                    <AnimatePresence>
                      {otpError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[11px] text-red-500"
                        >
                          {otpError}
                        </motion.p>
                      )}
                      {resendMessage && !otpError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[11px] text-emerald-600"
                        >
                          {resendMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading !== null || otp.length !== 6}
                    className="h-11 mt-1 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-sm font-medium flex items-center gap-2 group transition-all duration-200 disabled:opacity-40"
                  >
                    {isLoading === 'otp' ? (
                      <span className="flex items-center gap-2">
                        <Spinner />
                        Verifying…
                      </span>
                    ) : (
                      <>
                        Verify email
                        <ArrowRight size={15} className="opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-gray-400">
                  Didn't get a code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading !== null}
                    className="text-gray-900 font-medium hover:underline underline-offset-4 transition-colors disabled:opacity-40"
                  >
                    {isLoading === 'resend' ? 'Sending…' : 'Resend code'}
                  </button>
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {step !== 'otp' && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <a href="/sign-in" className="text-gray-900 font-medium hover:underline underline-offset-4 transition-colors">
                Sign in
              </a>
            </p>
            <p className="text-[11px] text-gray-300 mt-2">
              © {new Date().getFullYear()} Tribe. All rights reserved.
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Right Panel ──────────────────────────────────────────── */}
      <motion.div
        className="relative hidden lg:flex flex-1 items-center justify-center overflow-hidden"
        variants={rightPanelVariants}
        initial="hidden"
        animate="visible"
      >
        <div ref={orbRef} className="absolute inset-0">
          <OrbBackground />
          <div className="gsap-orb absolute rounded-full opacity-[0.12] blur-[90px]" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)', top: '-15%', right: '-10%' }} />
          <div className="gsap-orb absolute rounded-full opacity-[0.08] blur-[70px]" style={{ width: '380px', height: '380px', background: 'radial-gradient(circle, #c0c0c0 0%, transparent 65%)', bottom: '-5%', left: '5%' }} />
          <div className="gsap-orb absolute rounded-full opacity-[0.06] blur-[50px]" style={{ width: '220px', height: '220px', background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)', top: '42%', left: '35%' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-12 max-w-sm w-full">

          <AnimatePresence mode="wait">
            <motion.div
              key={rightKey.badge}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/50 font-medium tracking-wide">{rightKey.badge}</span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={rightKey.heading}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">{rightKey.heading}</h2>
              <p className="text-sm text-white/40 leading-relaxed">{rightKey.sub}</p>
            </motion.div>
          </AnimatePresence>

          {step !== 'otp' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col gap-3 w-full"
            >
              <button
                type="button"
                disabled={isLoading !== null}
                onClick={() => handleOAuth('google')}
                className="group relative w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'google'
                  ? <Spinner className="h-4 w-4 text-white/60" />
                  : <img src={GoogleIcon} alt="google" draggable={false} className="h-5 w-5" />
                }
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Continue with Google
                </span>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
              </button>

              <button
                type="button"
                disabled={isLoading !== null || githubDisabledForHiring}
                onClick={() => handleOAuth('github')}
                title={githubDisabledForHiring ? 'GitHub sign-up is only available for Talent accounts' : undefined}
                className="group relative w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === 'github'
                  ? <Spinner className="h-4 w-4 text-white/60" />
                  : <img src={GithubIcon} alt="github" draggable={false} className="h-5 w-5" />
                }
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Continue with GitHub
                </span>
                <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
              </button>
              {githubDisabledForHiring && (
                <p className="text-[11px] text-white/30 text-center">GitHub sign-up is available for Talent accounts only.</p>
              )}
            </motion.div>
          )}

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

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </motion.div>

    </div>
  );
};

export default SignUp;