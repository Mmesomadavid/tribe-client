'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import Logo from '../../components/Logo';

type VerificationMethod = 'email' | 'authenticator';

const methodConfig: Record<VerificationMethod, { label: string; description: string; length: number; icon: typeof Mail }> = {
  email: {
    label: 'Email code',
    description: 'A 4-digit one-time code will be sent to your email inbox.',
    length: 4,
    icon: Mail,
  },
  authenticator: {
    label: 'Authenticator app',
    description: 'Use your authenticator app to enter a 6-digit verification code.',
    length: 6,
    icon: Smartphone,
  },
};

const ForgotPassword = () => {
  const [method, setMethod] = useState<VerificationMethod>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(methodConfig.email.length).fill(''));
  const [showOtpStage, setShowOtpStage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const activeMethod = useMemo(() => methodConfig[method], [method]);

  useEffect(() => {
    if (!stageRef.current) return;

    gsap.fromTo(
      stageRef.current,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );

    if (showOtpStage) {
      gsap.fromTo(
        '.otp-digit',
        { y: 16, opacity: 0, scale: 0.88 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.35,
          ease: 'back.out(1.8)',
        }
      );
    }
  }, [method, showOtpStage]);

  const handleMethodChange = (nextMethod: VerificationMethod) => {
    setMethod(nextMethod);
    setOtp(Array(methodConfig[nextMethod].length).fill(''));
    setShowOtpStage(false);
    setSubmitted(false);
  };

  const handleSendCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setShowOtpStage(true);
    setSubmitted(false);
    setOtp(Array(methodConfig[method].length).fill(''));
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otp];
    nextDigits[index] = cleaned;
    setOtp(nextDigits);

    if (cleaned && index < activeMethod.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < activeMethod.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, activeMethod.length);

    if (!pasted) return;

    const nextDigits = Array.from({ length: activeMethod.length }, (_, index) => pasted[index] ?? '');
    setOtp(nextDigits);

    const nextIndex = Math.min(pasted.length, activeMethod.length - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== activeMethod.length) return;

    setSubmitted(true);
  };

  const stageHeader = showOtpStage
    ? method === 'email'
      ? 'Enter your 4-digit code'
      : 'Enter your authenticator code'
    : 'Reset your password';

  const stageBody = showOtpStage
    ? method === 'email'
      ? 'We sent a secure email confirmation code to your inbox.'
      : 'Use the 6-digit code from your authenticator app to confirm access.'
    : 'Choose how you want to verify ownership of your account.';

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-xl"
        >
          <Card className="overflow-hidden rounded-[28px] border border-border/60 bg-card/95 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="items-center border-b border-border/60 bg-gradient-to-br from-background to-muted/40 px-6 pb-5 pt-6 text-center">
              <div className="mb-3 flex items-center justify-center">
                <Logo className="h-16 w-16" />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">{stageHeader}</CardTitle>
              <CardDescription className="max-w-md text-sm text-muted-foreground">{stageBody}</CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-6">
              <AnimatePresence mode="wait">
                {!showOtpStage ? (
                  <motion.div
                    key="email-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(['email', 'authenticator'] as VerificationMethod[]).map((type) => {
                        const option = methodConfig[type];
                        const Icon = option.icon;
                        const selected = method === type;

                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleMethodChange(type)}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50'
                            }`}
                          >
                            <div className="mb-3 inline-flex rounded-xl bg-background p-2 text-primary shadow-sm">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="text-sm font-semibold">{option.label}</div>
                            <div className="mt-1 text-xs text-muted-foreground">{option.description}</div>
                          </button>
                        );
                      })}
                    </div>

                    <form onSubmit={handleSendCode} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          Email address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          inputMode="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="h-11 rounded-xl border-border bg-background px-3 text-sm focus-visible:ring-1"
                        />
                      </div>

                      <Button type="submit" className="h-11 w-full rounded-xl bg-primary text-primary-foreground">
                        <span className="flex items-center gap-2">
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${method}-otp`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2 text-center">
                      <div className="mx-auto inline-flex rounded-full bg-muted p-2 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method === 'email'
                          ? `Code sent to ${email || 'your email'}`
                          : 'Your authenticator app is ready to confirm the code.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      {Array.from({ length: activeMethod.length }).map((_, index) => (
                        <Input
                          key={`${method}-${index}`}
                          ref={(element) => {
                            otpRefs.current[index] = element;
                          }}
                          value={otp[index] ?? ''}
                          maxLength={1}
                          inputMode="numeric"
                          onChange={(event) => handleOtpChange(index, event.target.value)}
                          onKeyDown={(event) => handleOtpKeyDown(index, event)}
                          onPaste={handleOtpPaste}
                          className="otp-digit h-14 w-14 rounded-2xl border-border bg-background text-center text-lg font-semibold shadow-sm sm:h-16 sm:w-16"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowOtpStage(false)}
                        className="rounded-xl"
                      >
                        <span className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </span>
                      </Button>

                      <Button type="button" onClick={handleVerify} className="rounded-xl">
                        <span className="flex items-center gap-2">
                          Verify
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="items-center justify-between gap-3 border-t border-border/60 px-6 py-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Link to="/signin" className="text-primary transition-colors hover:underline">
                  Back to sign in
                </Link>
              </div>

              {submitted && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Code verified
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;