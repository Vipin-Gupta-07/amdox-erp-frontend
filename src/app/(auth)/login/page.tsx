"use client";

import { useState } from "react";
import {
  Hexagon,
  Shield,
  BarChart3,
  Brain,
  Globe,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  Floating shape for the branded left panel                         */
/* ------------------------------------------------------------------ */
function FloatingShape({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute rounded-full opacity-[0.07] blur-2xl ${className ?? ""}`}
      style={style}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Feature bullet component                                          */
/* ------------------------------------------------------------------ */
function FeatureBullet({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3 text-blue-100/90">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
        <Icon className="h-4 w-4 text-blue-300" />
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Google "G" SVG logo                                               */
/* ------------------------------------------------------------------ */
function GoogleLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ================================================================== */
/*  LOGIN PAGE                                                        */
/* ================================================================== */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* ============================================================ */}
      {/* LEFT BRANDED PANEL                                           */}
      {/* ============================================================ */}
      <section
        className="relative flex w-full flex-col justify-between overflow-hidden px-8 py-12 lg:w-[45%] lg:px-14 lg:py-16"
        style={{
          background:
            "linear-gradient(160deg, #0f172a 0%, #312e81 50%, #1e40af 100%)",
        }}
      >
        {/* ---------- animated floating shapes ---------- */}
        <FloatingShape
          className="h-72 w-72 bg-blue-400 animate-[float-a_18s_ease-in-out_infinite]"
          style={{ top: "-5%", right: "-10%" }}
        />
        <FloatingShape
          className="h-56 w-56 bg-indigo-400 animate-[float-b_22s_ease-in-out_infinite]"
          style={{ bottom: "10%", left: "-8%" }}
        />
        <FloatingShape
          className="h-40 w-40 bg-violet-400 animate-[float-c_15s_ease-in-out_infinite]"
          style={{ top: "40%", right: "15%" }}
        />
        <FloatingShape
          className="h-24 w-24 bg-cyan-400 animate-[float-a_20s_ease-in-out_infinite_reverse]"
          style={{ bottom: "25%", right: "5%" }}
        />

        {/* ---------- top: logo + tagline ---------- */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
              <Hexagon className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                AMDOX
              </h1>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-blue-300">
                ERP Suite
              </p>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="mt-10 max-w-xs text-2xl font-semibold leading-snug text-white lg:text-3xl">
            Next-Generation Intelligent Resource Planning
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-200/80">
            Empower every department with AI-driven insights, real-time
            collaboration, and enterprise-grade security.
          </p>

          {/* Feature bullets */}
          <ul className="mt-10 space-y-5">
            <FeatureBullet
              icon={Shield}
              text="Enterprise-grade security with SOC 2 compliance"
            />
            <FeatureBullet
              icon={BarChart3}
              text="AI-powered demand forecasting & analytics"
            />
            <FeatureBullet
              icon={Brain}
              text="Multi-tenant cloud architecture"
            />
            <FeatureBullet
              icon={Globe}
              text="Real-time business intelligence"
            />
          </ul>
        </div>

        {/* ---------- bottom: trust badge ---------- */}
        <div className="relative z-10 mt-12">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                "bg-blue-400",
                "bg-emerald-400",
                "bg-amber-400",
                "bg-violet-400",
              ].map((bg, i) => (
                <span
                  key={i}
                  className={`inline-block h-7 w-7 rounded-full ${bg} ring-2 ring-[#0f172a]`}
                />
              ))}
            </div>
            <p className="ml-1 text-xs text-blue-200/70">
              Trusted by <span className="font-semibold text-white">500+</span>{" "}
              enterprises worldwide
            </p>
          </div>
        </div>

        {/* ---------- CSS keyframes (scoped via style tag) ---------- */}
        <style>{`
          @keyframes float-a {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); }
            33%      { transform: translateY(-18px) translateX(12px) scale(1.05); }
            66%      { transform: translateY(10px) translateX(-8px) scale(0.97); }
          }
          @keyframes float-b {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(-22px) rotate(6deg); }
          }
          @keyframes float-c {
            0%, 100% { transform: translateY(0) scale(1); }
            50%      { transform: translateY(16px) scale(1.08); }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/* RIGHT FORM PANEL                                             */}
      {/* ============================================================ */}
      <section className="flex w-full flex-1 items-center justify-center bg-[var(--background)] px-6 py-12 lg:w-[55%] lg:px-16">
        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-[var(--muted-foreground)]">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form
              id="login-form"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              {/* Tenant / Organization */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-tenant"
                  className="text-sm font-medium text-[var(--foreground)]"
                >
                  Organization
                </label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <Input
                    id="login-tenant"
                    type="text"
                    placeholder="your-company"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-[var(--foreground)]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-[var(--foreground)]"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    id="toggle-password-visibility"
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-remember"
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    id="login-remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[var(--input)] text-[var(--primary)] accent-[var(--primary)] focus:ring-[var(--ring)]"
                  />
                  <span className="select-none text-[var(--foreground)]">
                    Remember me
                  </span>
                </label>
                <a
                  id="forgot-password-link"
                  href="#"
                  className="text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary)]/80"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In button */}
              <Button
                id="login-submit-btn"
                type="submit"
                className="h-11 w-full text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                }}
              >
                Sign In
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center">
              <span className="flex-1 border-t border-[var(--border)]" />
              <span className="px-3 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                or
              </span>
              <span className="flex-1 border-t border-[var(--border)]" />
            </div>

            {/* SSO & Google buttons */}
            <div className="space-y-3">
              <Button
                id="login-sso-btn"
                variant="outline"
                type="button"
                className="h-11 w-full text-sm font-medium"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Sign in with SSO
              </Button>

              <Button
                id="login-google-btn"
                variant="outline"
                type="button"
                className="h-11 w-full text-sm font-medium"
              >
                <GoogleLogo />
                <span className="ml-2">Sign in with Google</span>
              </Button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-[var(--muted-foreground)]">
              Don&apos;t have an account?{" "}
              <a
                id="contact-admin-link"
                href="#"
                className="font-medium text-[var(--primary)] transition-colors hover:underline"
              >
                Contact your administrator
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
