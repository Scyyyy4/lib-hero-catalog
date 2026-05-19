-- 在 Supabase Dashboard → SQL Editor 中执行本脚本
-- 表名与列名与 lib/diary/get-diary-entries.ts 中的查询一致

create table if not exists public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  library text not null,
  study_topic text not null,
  mood text not null,
  note text not null default '',
  created_at timestamptz not null default now()
);

comment on table public.diary_entries is '馆内日记';

alter table public.diary_entries enable row level security;

-- 未登录也可读（仅 SELECT）；写入以后接登录再加策略
drop policy if exists "diary_entries_public_read" on public.diary_entries;
create policy "diary_entries_public_read"
  on public.diary_entries
  for select
  to anon, authenticated
  using (true);

-- 可选：插入与 mock 接近的示例数据（执行一次即可）
insert into public.diary_entries (date, library, study_topic, mood, note)
values
  (
    '2026-05-12',
    '市立图书馆 · 三楼自习区',
    '复习了半章线性代数，整理了错题本；顺带读了几页散文换脑子。',
    '充实',
    '闭馆音乐响起时，邻座的人一起收拾东西，有种默契的告别感。'
  ),
  (
    '2026-05-08',
    '大学图书馆 · 北区',
    '写课程论文大纲，查了两篇参考文献，没写完但方向清楚了。',
    '平静',
    '窗外在下雨，馆内灯很柔，适合发呆五秒钟再继续。'
  ),
  (
    '2026-05-03',
    '社区图书室',
    '带了一本小说，实际只看了二十页，剩下时间在观察人和书架。',
    '有点乱',
    '小孩在儿童区笑得很响，居然没觉得吵，反而记了一笔「馆内白噪音」。'
  )
;
