"use client";
import { useActionState, useEffect } from "react";
import { User, AlertCircle } from "lucide-react";
import { loginAction } from "@/features/auth";
import { Input, SubmitButton, PasswordInput } from "@/components/forms";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function SignInViewPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [state, action] = useActionState(loginAction, {
    status: "idle",
    message: "",
  });
  const searchParams = useSearchParams();
  const sessionExpired = searchParams.get("error") === "session_expired";
  const callbackUrl = searchParams.get("callback");
  const fe = state.fieldErrors ?? {}; // field errors
  // Handle side effects (success, error, session expiry)
  useEffect(() => {
    // On successful login, redirect
    if (state.status === "success") {
      toast.success(state.message, { id: "login-success" });
      router.push(callbackUrl || "/dashboard");
    } else if (state.status === "error" && state.message) {
      toast.error(state.message, { id: "login-error" });
    }
  }, [state.status, state.message, router, callbackUrl]);

  useEffect(() => {
    if (sessionExpired) {
      setAuth(null);
      toast.error("Your session has ended. Please log in again to continue.", {
        id: "session-expired",
      });
    }
  }, [sessionExpired, setAuth]);
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#0a192f] via-[#1d4ed8] to-[#4d80e4] p-4 font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-white mix-blend-multiply blur-xl filter"></div>
        <div
          className="absolute top-20 right-10 h-72 w-72 animate-pulse rounded-full bg-blue-200 mix-blend-multiply blur-xl filter"
          style={{ animationDelay: "2s" }}></div>
        <div
          className="absolute bottom-10 left-20 h-72 w-72 animate-pulse rounded-full bg-indigo-200 mix-blend-multiply blur-xl filter"
          style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-lg text-gray-600">Sign in to your admin dashboard</p>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-px w-full max-w-xs bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Global Error Message */}
        {state.status === "error" && !Object.keys(fe).length && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div>
              <strong className="font-medium block mb-1">Login failed</strong>
              {state.message}
            </div>
          </div>
        )}

        {/* Form */}
        <form action={action} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ">Email</label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10 h-[48px]">
                <User className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#1d4ed8]" />
              </div>
              <Input
                name="email"
                placeholder="Enter your email address"
                error={fe.email?.[0]}
                className="pl-11 h-12"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ">Password</label>
            <PasswordInput
              name="password"
              placeholder="Enter your password"
              error={fe.password?.[0]}
              className="pl-11 h-12"
            />
          </div>

          <div className="pt-2">
            <SubmitButton
              pendingLabel="Signing In..."
              className="h-12 w-full transform rounded-xl bg-linear-to-r from-[#1d4ed8] to-[#4d80e4] text-base font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-[#1e40af] hover:to-[#3b82f6] hover:shadow-xl active:scale-[0.98]">
              Sign In to Dashboard
            </SubmitButton>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
