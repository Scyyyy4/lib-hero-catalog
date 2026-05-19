import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

export type CreateEncounterInput = {
  heroName: string;
  library: string;
  date: string;
  impression?: string;
  rating?: string;
  note?: string;
};

export type CreateEncounterResult =
  | { ok: true }
  | { ok: false; kind: "env"; missing: string[] }
  | { ok: false; kind: "validation"; message: string }
  | { ok: false; kind: "db"; message: string };

/** 写入 public.encounters（不修改读取逻辑） */
export async function createEncounter(
  input: CreateEncounterInput,
  userId: string,
): Promise<CreateEncounterResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return { ok: false, kind: "env", missing: env.missing };
  }

  const heroName = input.heroName.trim();
  const library = input.library.trim();
  const date = input.date.trim();
  const impression = (input.impression ?? "").trim();
  const note = (input.note ?? "").trim();
  const ratingRaw = (input.rating ?? "").trim();

  if (!heroName) {
    return { ok: false, kind: "validation", message: "请填写遇见了谁。" };
  }
  if (!library) {
    return { ok: false, kind: "validation", message: "请填写馆名。" };
  }
  if (!date) {
    return { ok: false, kind: "validation", message: "请填写日期。" };
  }

  let rating: number | undefined;
  if (ratingRaw) {
    const n = Number.parseInt(ratingRaw, 10);
    if (Number.isNaN(n) || n < 1 || n > 5) {
      return {
        ok: false,
        kind: "validation",
        message: "评级请填写 1 到 5 之间的整数。",
      };
    }
    rating = n;
  }

  const row: {
    hero_name: string;
    library: string;
    date: string;
    impression: string;
    note: string;
    user_id: string;
    rating?: number;
  } = {
    hero_name: heroName,
    library,
    date,
    impression,
    note,
    user_id: userId,
  };

  if (rating !== undefined) {
    row.rating = rating;
  }

  const supabase = await createClient();

  const { error } = await supabase.from("encounters").insert(row);

  if (error) {
    return { ok: false, kind: "db", message: error.message };
  }

  return { ok: true };
}
