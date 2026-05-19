"use server";

import { redirect } from "next/navigation";
import { createEncounter } from "@/lib/encounters/create-encounter";
import type { EncounterFormState } from "@/lib/encounters/encounter-form-state";
import { getAuthUser } from "@/lib/auth/get-user";

export async function createEncounterAction(
  _prevState: EncounterFormState,
  formData: FormData,
): Promise<EncounterFormState> {
  const user = await getAuthUser();
  if (!user) {
    return { error: "请先登录" };
  }

  const result = await createEncounter(
    {
      heroName: String(formData.get("hero_name") ?? ""),
      library: String(formData.get("library") ?? ""),
      date: String(formData.get("date") ?? ""),
      impression: String(formData.get("impression") ?? ""),
      rating: String(formData.get("rating") ?? ""),
      note: String(formData.get("note") ?? ""),
    },
    user.id,
  );

  if (result.ok) {
    redirect("/encounters");
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
