"use server";

import { redirect } from "next/navigation";
import { createHeroProfile } from "@/lib/heroes/create-hero-profile";
import type { HeroFormState } from "@/lib/heroes/hero-form-state";
import { getAuthUser } from "@/lib/auth/get-user";

export async function createHeroAction(
  _prevState: HeroFormState,
  formData: FormData,
): Promise<HeroFormState> {
  const user = await getAuthUser();
  if (!user) {
    return { error: "请先登录" };
  }

  const result = await createHeroProfile(
    {
      name: String(formData.get("name") ?? ""),
      type: String(formData.get("type") ?? ""),
      library: String(formData.get("library") ?? ""),
      tags: String(formData.get("tags") ?? ""),
      bio: String(formData.get("bio") ?? ""),
    },
    user.id,
  );

  if (result.ok) {
    redirect("/heroes");
  }

  if (result.kind === "env") {
    return {
      error: `未配置 Supabase：${result.missing.join("、")}`,
    };
  }

  if (result.kind === "validation") {
    return { error: result.message };
  }

  return {
    error:
      result.kind === "db"
        ? result.message
        : "保存失败，请稍后再试。",
  };
}
