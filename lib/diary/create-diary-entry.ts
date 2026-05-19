import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

export type CreateDiaryInput = {
  date: string;
  library: string;
  studyTopic: string;
  mood?: string;
  note?: string;
};

export type CreateDiaryEntryResult =
  | { ok: true }
  | { ok: false; kind: "env"; missing: string[] }
  | { ok: false; kind: "validation"; message: string }
  | { ok: false; kind: "db"; message: string };

/** 写入 public.diary_entries（不修改读取逻辑） */
export async function createDiaryEntry(
  input: CreateDiaryInput,
  userId: string,
): Promise<CreateDiaryEntryResult> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return { ok: false, kind: "env", missing: env.missing };
  }

  const date = input.date.trim();
  const library = input.library.trim();
  const studyTopic = input.studyTopic.trim();
  const mood = (input.mood ?? "").trim();
  const note = (input.note ?? "").trim();

  if (!date) {
    return { ok: false, kind: "validation", message: "请填写日期。" };
  }
  if (!library) {
    return { ok: false, kind: "validation", message: "请填写馆名。" };
  }
  if (!studyTopic) {
    return { ok: false, kind: "validation", message: "请填写学习主题。" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("diary_entries").insert({
    date,
    library,
    study_topic: studyTopic,
    mood: mood || "未标注",
    note,
    user_id: userId,
  });

  if (error) {
    return { ok: false, kind: "db", message: error.message };
  }

  return { ok: true };
}
