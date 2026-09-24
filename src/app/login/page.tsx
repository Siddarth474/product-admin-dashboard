"use client";

import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {
    login,
    setLogin,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to manage your products
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-300 bg-white p-6 shadow-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={login.username}
                onChange={(event) =>
                  setLogin({ ...login, username: event.target.value })
                }
                placeholder="Enter your username"
                autoComplete="username"
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={login.password}
                  onChange={(event) =>
                    setLogin({ ...login, password: event.target.value })
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white pl-3.5 pr-10 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-zinc-400 hover:text-zinc-600 focus:outline-none transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-black px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 shadow-2xs"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white/70 p-4 text-center text-xs text-zinc-500 shadow-2xs">
          <p className="font-medium text-zinc-600">Demo credentials</p>

          <p className="mt-1 font-mono text-zinc-700">
            <span>emilys</span>
            <span className="text-zinc-400 mx-1.5">/</span>
            <span>emilyspass</span>
          </p>
        </div>
      </div>
    </main>
  );
}
