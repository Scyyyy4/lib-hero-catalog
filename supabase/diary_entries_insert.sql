-- 允许匿名/已登录用户向 diary_entries 插入（MVP 无登录时使用）
-- 在 Supabase Dashboard → SQL Editor 中执行

drop policy if exists "diary_entries_public_insert" on public.diary_entries;
create policy "diary_entries_public_insert"
  on public.diary_entries
  for insert
  to anon, authenticated
  with check (true);
