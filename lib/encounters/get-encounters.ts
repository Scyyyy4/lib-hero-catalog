import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import type { Encounter, EncounterRow } from "@/types/encounter";

export type GetEncountersResult =
  | { data: Encounter[]; error: null }
  | { data: null; error: { kind: "env"; missing: string[] } }
  | { data: null; error: { kind: "db"; message: string } };

function rowToEncounter(row: EncounterRow): Encounter {
  return {
    id: row.id,
    heroName: row.hero_name,
    library: row.library,
    date: row.date,
    impression: row.impression,
    rating: row.rating,
    note: row.note,
    createdAt: row.created_at,
  };
}

/** 从 Supabase 表 public.encounters 读取全部遇见记录（按 date 倒序） */
export async function getEncounters(): Promise<GetEncountersResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return {
      data: null,
      error: { kind: "env", missing: env.missing },
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("encounters")
    .select("id, hero_name, library, date, impression, rating, note, created_at")
    .order("date", { ascending: false });

  if (error) {
    return {
      data: null,
      error: { kind: "db", message: error.message },
    };
  }

  return {
    data: (data ?? []).map((row) => rowToEncounter(row as EncounterRow)),
    error: null,
  };
}
