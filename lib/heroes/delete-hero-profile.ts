"use server";

import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import { revalidatePath } from "next/cache";

export type DeleteResult =
  | { ok: true }
  | { ok: false; message: string };

export async function deleteHeroProfile(id: string): Promise<DeleteResult> {
  const env = getSupabaseEnv();
  if (!env.ok) return { ok: false, message: "环境变量未配置。" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("hero_profiles")
    .delete()
    .eq("id", id);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/heroes");
  return { ok: true };
}
