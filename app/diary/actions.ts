"use server";

import { redirect } from "next/navigation";
import { createDiaryEntry } from "@/lib/diary/create-diary-entry";
import type { DiaryFormState } from "@/lib/diary/diary-form-state";
import { getAuthUser } from "@/lib/auth/get-user";

export async function createDiaryEntryAction(
  _prevState: DiaryFormState,
  formData: FormData,
): Promise<DiaryFormState> {
  const user = await getAuthUser();
  if (!user) {
    return { error: "请先登录" };
  }

  const result = await createDiaryEntry(
    {
      date: String(formData.get("date") ?? ""),
      library: String(formData.get("library") ?? ""),
      studyTopic: String(formData.get("studyTopic") ?? ""),
      mood: String(formData.get("mood") ?? ""),
      note: String(formData.get("note") ?? ""),
    },
    user.id,
  );

  if (result.ok) {
    redirect("/diary");
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
