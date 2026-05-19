import type { User } from "@supabase/supabase-js";

/** 导航栏等位置展示：优先 user_metadata.display_name，否则用邮箱 @ 前前缀 */
export function getNavbarDisplayLabel(user: User): string {
  const raw = user.user_metadata?.display_name;
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.trim();
  }

  const email = user.email ?? "";
  const prefix = email.split("@")[0]?.trim();
  return prefix || "读者";
}
