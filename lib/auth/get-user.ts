import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

/** 在 Server Component 中获取当前登录用户（未登录或环境未配置时返回 null） */
export async function getAuthUser() {
  if (!getSupabaseEnv().ok) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
