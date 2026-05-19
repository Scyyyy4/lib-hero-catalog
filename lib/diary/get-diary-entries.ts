import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import type { DiaryEntry, DiaryEntryRow } from "@/types/diary";

export type GetDiaryEntriesResult =
  | { ok: true; entries: DiaryEntry[] }
  | { ok: false; kind: "env"; missing: string[] }
  | { ok: false; kind: "db"; message: string };

function rowToEntry(row: DiaryEntryRow): DiaryEntry {
  return {
    id: row.id,
    date: row.date,
    library: row.library,
    studyTopic: row.study_topic,
    mood: row.mood as DiaryEntry["mood"],
    note: row.note,
  };
}

/** 从 Supabase 表 public.diary_entries 读取全部日记（按日期倒序） */
export async function getDiaryEntries(): Promise<GetDiaryEntriesResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return { ok: false, kind: "env", missing: env.missing };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("diary_entries")
    .select("id, date, library, study_topic, mood, note")
    .order("date", { ascending: false });

  if (error) {
    return {
      ok: false,
      kind: "db",
      message: error.message,
    };
  }

  return {
    ok: true,
    entries: (data ?? []).map((row) => rowToEntry(row as DiaryEntryRow)),
  };
}
