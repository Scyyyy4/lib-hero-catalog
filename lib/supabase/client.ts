import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/env";

/**
 * 在 Client Component 里使用（例如以后的实时订阅、登录表单）。
 * 当前 /diary 只在服务端读数据，一般不需要用到本文件。
 */
export function createClient() {
  const env = getSupabaseEnv();
  if (!env.ok) {
    throw new Error(
      `缺少 Supabase 环境变量：${env.missing.join("、")}。请在 .env.local 中配置。`,
    );
  }

  return createBrowserClient(env.url, env.anonKey);
}
