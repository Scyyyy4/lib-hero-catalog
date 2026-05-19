"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteOrigin } from "@/lib/auth/site-origin";
import type { AuthFormState } from "@/lib/auth/login-form-state";

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "请填写邮箱和密码。", success: null };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, success: null };
  }

  redirect("/");
}

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const displayName = String(formData.get("display_name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!displayName) {
    return { error: "请填写显示名", success: null };
  }

  if (displayName.length < 2) {
    return { error: "显示名至少需要 2 个字。", success: null };
  }

  if (!email || !password) {
    return { error: "请填写邮箱和密码。", success: null };
  }

  if (password.length < 6) {
    return { error: "密码至少需要 6 位。", success: null };
  }

  const supabase = await createClient();
  const origin = await getSiteOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { display_name: displayName },
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return { error: "该邮箱已注册，请直接登录", success: null };
    }
    return { error: error.message, success: null };
  }

  if (data.session) {
    redirect("/");
  }

  return {
    error: null,
    success: "注册成功！请查收邮件，点击验证链接后即可登录。",
  };
}
