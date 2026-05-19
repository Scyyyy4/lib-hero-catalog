import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/env";

/**
 * 在 Server Component、Server Action、Route Handler 里使用。
 * 通过 cookies 与 @supabase/ssr 配合，便于以后接入登录而不用改结构。
 */
export async function createClient() {
  const env = getSupabaseEnv();
  if (!env.ok) {
    throw new Error(
      `缺少 Supabase 环境变量：${env.missing.join("、")}。请在 .env.local 中配置。`,
    );
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, _headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component 里不能写 cookie 时会走到这里；
          // 仅做公开只读查询时可忽略，登录上线后需配合 middleware/proxy 刷新会话。
        }
      },
    },
  });
}
