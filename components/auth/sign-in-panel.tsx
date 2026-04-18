"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { ModeToggle } from "@/components/auth/theme-toggle";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Enterprise-ready access",
    description: "Secure sign-in flows designed for teams, admins, and customer portals.",
  },
  {
    icon: Sparkles,
    title: "Beautiful by default",
    description: "Clear hierarchy, calm spacing, and strong contrast across every screen size.",
  },
  {
    icon: Globe,
    title: "Works everywhere",
    description: "Responsive layout with system-aware dark and light modes from first paint.",
  },
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.37h5.64c-.11.84-.72 2.1-2.07 2.95l-.02.11 3 2.27.21.02c1.93-1.74 3.04-4.29 3.04-6.92Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.89 6.78-2.42l-3.23-2.4c-.87.59-2.03 1-3.55 1-2.7 0-4.99-1.74-5.8-4.15l-.1.01-3.12 2.36-.03.09A10.26 10.26 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.2 14.03A6.05 6.05 0 0 1 5.86 12c0-.7.13-1.37.33-2.03l-.01-.14-3.16-2.4-.1.05A9.83 9.83 0 0 0 1.9 12c0 1.59.39 3.09 1.08 4.43l3.22-2.4Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.82c1.92 0 3.22.81 3.96 1.49l2.9-2.76C17.07 2.96 14.76 2 12 2a10.26 10.26 0 0 0-9.05 5.51l3.27 2.49c.82-2.42 3.1-4.18 5.78-4.18Z"
        fill="#EA4335"
      />
    </svg>
  );
}

type SignInPanelProps = {
  initialError?: string;
};

export function SignInPanel({ initialError }: SignInPanelProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(
    initialError ?? null
  );

  async function handleGoogleSignIn() {
    try {
      setGoogleLoading(true);
      setGoogleError(null);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-in?error=google_auth_failed",
      });
    } catch (error) {
      setGoogleError(
        error instanceof Error
          ? error.message
          : "Google sign-in could not be started. Please try again."
      );
      setGoogleLoading(false);
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium tracking-[0.24em] uppercase backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              A
            </span>
            Avik Studio
          </Link>
          <ModeToggle />
        </div>

        <section className="grid min-h-[calc(100vh-7rem)] overflow-hidden rounded-[2rem] border border-border/60 bg-card/75 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur xl:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-between gap-12 overflow-hidden border-b border-border/60 px-6 py-8 sm:px-10 lg:border-r lg:border-b-0 lg:px-12 lg:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.14),transparent_28%),linear-gradient(135deg,transparent,rgba(255,255,255,0.04))]" />
            <div className="relative space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                <BadgeCheck className="size-3.5 text-primary" />
                Trusted workspace access
              </span>

              <div className="max-w-2xl space-y-5">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Welcome back to the workspace that keeps teams moving.
                </h1>
                <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                  Sign in with your email and password, or continue with Google to
                  get back to projects, approvals, and shared updates with a
                  polished experience.
                </p>
              </div>
            </div>

            <div className="relative grid gap-4 md:grid-cols-3">
              {trustPoints.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-[1.5rem] border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/55"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative flex items-center px-4 py-6 sm:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-border/60 bg-background/88 p-6 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.75)] backdrop-blur xl:p-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">Sign in</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Access your account
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Use your work credentials to continue. Google sign-in is ready
                  when you prefer a faster path.
                </p>
              </div>

              {googleError ? (
                <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {googleError === "google_auth_failed"
                    ? "Google sign-in was cancelled or failed. Please try again."
                    : googleError}
                </div>
              ) : null}

              <form className="mt-8 space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      autoComplete="email"
                      className="pl-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="pl-11"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className="h-12 w-full rounded-2xl text-sm font-semibold shadow-[0_18px_30px_-18px_color-mix(in_oklab,var(--color-primary)_85%,transparent)]"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </Button>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/70" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-3 text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  type="button"
                  variant="outline"
                  disabled={googleLoading}
                  className="h-12 w-full rounded-2xl border-border/70 bg-background/60 text-sm font-semibold"
                >
                  {googleLoading ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <GoogleMark />
                  )}
                  {googleLoading ? "Redirecting to Google..." : "Sign in with Google"}
                </Button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/60 p-4 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="leading-6">
                  Protected by modern authentication patterns, quiet visual
                  hierarchy, and responsive spacing for desktop and mobile.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
