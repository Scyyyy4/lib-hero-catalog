"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction, signupAction } from "@/app/login/actions";
import {
  authFormInitialState,
  type AuthFormState,
} from "@/lib/auth/login-form-state";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-medium text-ink";

type Tab = "login" | "signup";

export function LoginForm() {
  const [tab, setTab] = useState<Tab>("login");

  const [loginState, loginFormAction, loginPending] = useActionState<
    AuthFormState,
    FormData
  >(loginAction, authFormInitialState);

  const [signupState, signupFormAction, signupPending] = useActionState<
    AuthFormState,
    FormData
  >(signupAction, authFormInitialState);

  const state = tab === "login" ? loginState : signupState;
  const pending = tab === "login" ? loginPending : signupPending;

  return (
    <div className="card-surface p-5 sm:p-6">
      <div className="flex gap-2 rounded-lg bg-tag/60 p-1">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "login"
              ? "bg-accent text-white"
              : "text-muted hover:bg-tag hover:text-ink"
          }`}
        >
          登录
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "signup"
              ? "bg-accent text-white"
              : "text-muted hover:bg-tag hover:text-ink"
          }`}
        >
          注册
        </button>
      </div>

      {state.error ? (
        <div
          className="mt-5 rounded-lg border border-red-200/90 bg-red-50/80 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div
          className="mt-5 rounded-lg border border-emerald-200/90 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {state.success}
        </div>
      ) : null}

      {tab === "login" ? (
        <form action={loginFormAction} className="mt-5 space-y-4">
          <AuthFields />
          <SubmitButton pending={pending} label="登录" />
        </form>
      ) : (
        <form action={signupFormAction} className="mt-5 space-y-4">
          <SignupFields />
          <SubmitButton pending={pending} label="注册" />
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="text-accent hover:underline">
          ← 返回首页
        </Link>
      </p>
    </div>
  );
}

function AuthFields() {
  return (
    <>
      <div>
        <label htmlFor="email" className={labelClass}>
          邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={6}
          placeholder="至少 6 位"
          className={fieldClass}
        />
      </div>
    </>
  );
}

function SignupFields() {
  return (
    <>
      <div>
        <label htmlFor="signup-email" className={labelClass}>
          邮箱
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="display_name" className={labelClass}>
          显示名 <span className="text-accent">*</span>
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          required
          minLength={2}
          autoComplete="nickname"
          placeholder="你的昵称（会显示在网站上）"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="signup-password" className={labelClass}>
          密码
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          placeholder="至少 6 位"
          className={fieldClass}
        />
      </div>
    </>
  );
}

function SubmitButton({
  pending,
  label,
}: {
  pending: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="card-interactive inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "处理中…" : label}
    </button>
  );
}
