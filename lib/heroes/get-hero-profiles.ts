import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import type { HeroProfile, HeroProfileRow, HeroType } from "@/types/hero";

export type GetHeroProfilesResult =
  | { data: HeroProfile[]; error: null }
  | { data: null; error: { kind: "env"; missing: string[] } }
  | { data: null; error: { kind: "db"; message: string } };

function rowToProfile(row: HeroProfileRow): HeroProfile {
  return {
    id: row.id,
    name: row.name,
    type: row.type as HeroType,
    library: row.library,
    tags: row.tags ?? [],
    bio: row.bio,
    claimedByUserId: row.claimed_by_user_id,
    createdAt: row.created_at,
  };
}

/** 从 Supabase 表 public.hero_profiles 读取全部英雄（按 created_at 倒序） */
export async function getHeroProfiles(): Promise<GetHeroProfilesResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return {
      data: null,
      error: { kind: "env", missing: env.missing },
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_profiles")
    .select(
      "id, name, type, library, tags, bio, claimed_by_user_id, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return {
      data: null,
      error: { kind: "db", message: error.message },
    };
  }

  return {
    data: (data ?? []).map((row) => rowToProfile(row as HeroProfileRow)),
    error: null,
  };
}
