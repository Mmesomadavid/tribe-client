"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface HiringOnboardingShellProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;

  children: React.ReactNode;

  onBack?: () => void;
  onContinue: () => void;

  continueLabel?: string;
  continueDisabled?: boolean;
  isSubmitting?: boolean;

  error?: string | null;

  secondaryAction?: React.ReactNode;
}

const HiringOnboardingShell = ({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  isSubmitting = false,
  error,
  secondaryAction,
}: HiringOnboardingShellProps) => {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen w-full bg-white text-gray-950 flex">

      {/* ================================================================
          LEFT SIDEBAR
      ================================================================= */}

      <aside className="hidden lg:flex w-[260px] shrink-0 border-r border-gray-100 bg-gray-50/40 flex-col px-7 py-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-16">
          <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              +
            </span>
          </div>

          <span className="text-sm font-semibold tracking-tight">
            WorkTribe
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-5">

          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-gray-400">
              Hiring setup
            </p>

            <p className="text-sm font-medium text-gray-900 mt-1">
              Step {step + 1} of {totalSteps}
            </p>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-950 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="space-y-3 pt-2">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const completed = index < step;
              const active = index === step;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`
                      h-6 w-6 rounded-full flex items-center justify-center
                      text-[9px] font-semibold shrink-0 transition-all
                      ${
                        completed
                          ? "bg-gray-950 text-white"
                          : active
                          ? "border border-gray-950 text-gray-950"
                          : "border border-gray-200 text-gray-400"
                      }
                    `}
                  >
                    {completed ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <span
                    className={`
                      text-[11px] transition-colors
                      ${
                        active
                          ? "text-gray-950 font-medium"
                          : completed
                          ? "text-gray-600"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {getStepLabel(index)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom sidebar */}
        <div className="mt-auto pt-10">
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Build your hiring profile once and let WorkTribe
              help you discover better talent.
            </p>
          </div>
        </div>
      </aside>

      {/* ================================================================
          MAIN AREA
      ================================================================= */}

      <main className="flex-1 min-w-0 min-h-screen flex flex-col">

        {/* Mobile header */}
        <div className="lg:hidden px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                +
              </span>
            </div>

            <span className="text-sm font-semibold">
              WorkTribe
            </span>
          </div>

          <span className="text-[10px] text-gray-400">
            {step + 1}/{totalSteps}
          </span>
        </div>

        {/* ============================================================
            CONTENT
        ============================================================= */}

        <div className="flex-1 overflow-y-auto">

          <div className="w-full max-w-[760px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-20">

            {/* Step indicator on mobile/tablet */}
            <div className="mb-8">
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-950 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Header */}
            <header className="mb-10">

              <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center mb-6">
                <span className="text-white text-base font-bold">
                  +
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-gray-950">
                {title}
              </h1>

              <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-[560px]">
                {subtitle}
              </p>
            </header>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Form content */}
            <section>
              {children}
            </section>

          </div>
        </div>

        {/* ============================================================
            FOOTER NAVIGATION
        ============================================================= */}

        <footer className="border-t border-gray-100 bg-white">

          <div className="max-w-[760px] mx-auto px-6 sm:px-10 lg:px-16 py-5">

            <div className="flex items-center justify-between gap-4">

              {/* Back */}
              <div>
                {onBack ? (
                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="
                      h-10 px-4 rounded-xl
                      border border-gray-200
                      text-xs font-medium text-gray-700
                      hover:border-gray-300
                      hover:bg-gray-50
                      transition-all
                      inline-flex items-center gap-2
                      disabled:opacity-40
                    "
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Go back
                  </button>
                ) : (
                  <div />
                )}
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-4">

                {secondaryAction}

                <button
                  type="button"
                  onClick={onContinue}
                  disabled={continueDisabled || isSubmitting}
                  className="
                    h-10 px-5 rounded-xl
                    bg-gray-950 text-white
                    text-xs font-medium
                    inline-flex items-center gap-2
                    transition-all
                    hover:bg-gray-800
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {continueLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>
        </footer>

      </main>
    </div>
  );
};

/* ================================================================
   STEP LABELS
================================================================ */

function getStepLabel(step: number) {
  const labels = [
    "Company",
    "Location",
    "Hiring needs",
    "Preferences",
    "Finish",
  ];

  return labels[step] || `Step ${step + 1}`;
}

export default HiringOnboardingShell;