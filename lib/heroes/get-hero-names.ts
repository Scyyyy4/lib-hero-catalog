import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

export type HeroNameOption = {
  id: string;
  name: string;
};

export type GetHeroNamesResult =
  | { data: HeroNameOption[]; error: null }
  | { data: null; error: { kind: "env"; missing: string[] } }
  | { data: null; error: { kind: "db"; message: string } };

/** 从 hero_profiles 读取 id、name，供遇见记录表单下拉选择 */
export async function getHeroNames(): Promise<GetHeroNamesResult> {
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
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return {
      data: null,
      error: { kind: "db", message: error.message },
    };
  }

  return {
    data: (data ?? []) as HeroNameOption[],
    error: null,
  };
}
