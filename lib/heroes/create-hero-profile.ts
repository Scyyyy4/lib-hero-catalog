import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import type { HeroType } from "@/types/hero";

export type CreateHeroInput = {
  name: string;
  type: string;
  library: string;
  tags?: string;
  bio?: string;
};

export type CreateHeroProfileResult =
  | { ok: true }
  | { ok: false; kind: "env"; missing: string[] }
  | { ok: false; kind: "validation"; message: string }
  | { ok: false; kind: "db"; message: string };

function parseTags(raw: string): string[] {
  return raw
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** 写入 public.hero_profiles（不修改读取逻辑） */
export async function createHeroProfile(
  input: CreateHeroInput,
  userId: string,
): Promise<CreateHeroProfileResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return { ok: false, kind: "env", missing: env.missing };
  }

  const name = input.name.trim();
  const library = input.library.trim();
  const type = input.type.trim() as HeroType;
  const bio = (input.bio ?? "").trim();
  const tags = parseTags(input.tags ?? "");

  if (!name) {
    return { ok: false, kind: "validation", message: "请填写名字。" };
  }
  if (!library) {
    return { ok: false, kind: "validation", message: "请填写常出现的馆。" };
  }
  if (type !== "user" && type !== "guest") {
    return { ok: false, kind: "validation", message: "请选择有效的英雄类型。" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("hero_profiles").insert({
    name,
    type,
    library,
    tags,
    bio,
    user_id: userId,
  });

  if (error) {
    return { ok: false, kind: "db", message: error.message };
  }

  return { ok: true };
}
