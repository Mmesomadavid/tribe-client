'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import Logo from '../../components/Logo';
import { apiFetch, ApiError } from '../../lib/api';
import { useAuth } from '../../contexts/Authcontext';

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<'otp' | 'resend' | null>(null);

  useEffect(() => {
    if (!email) navigate('/sign-in', { replace: true });
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setOtpError(null);
    setIsLoading('otp');
    try {
      const data = await apiFetch<{ accessToken: string; user: any }>('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
      setAuth(data.accessToken, data.user);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setOtpError(err instanceof ApiError ? err.message : 'Verification failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleResend = async () => {
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8">
          <Logo />
        </div>

        <h1 className="text-[2rem] leading-[1.15] font-semibold tracking-tight text-gray-950 mb-3">
          Verify your
          <br />
          <em className="not-italic text-gray-400 font-light">email.</em>
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-7">
          Enter the 6-digit code we sent to{' '}
          <span className="text-gray-900 font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
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
                <Spinner /> Verifying…
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
            onClick={handleResend}
            disabled={isLoading !== null}
            className="text-gray-900 font-medium hover:underline underline-offset-4 transition-colors disabled:opacity-40"
          >
            {isLoading === 'resend' ? 'Sending…' : 'Resend code'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;