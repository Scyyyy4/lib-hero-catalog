/**
 * 从 .env.local 读取 Supabase 配置。
 * 支持官方新键名 publishable，也兼容常见的 anon 键名。
 */
export function getSupabaseEnv():
  | { ok: true; url: string; anonKey: string }
  | { ok: false; missing: string[] } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!anonKey) {
    missing.push(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 或 NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  if (missing.length > 0) {
    return { ok: false, missing };
  }

  return { ok: true, url: url!, anonKey: anonKey! };
}
