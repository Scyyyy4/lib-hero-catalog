import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { DiaryCard } from "@/components/DiaryCard";
import { getDiaryEntries } from "@/lib/diary/get-diary-entries";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "馆内日记",
  description: "记录在 library 的学习、心情与馆内小事。",
};

export default async function DiaryPage() {
  const user = await getAuthUser();
  const newEntryHref = user ? "/diary/new" : "/login";
  const result = await getDiaryEntries();

  return (
    <PageShell width="narrow">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          className="mb-0 min-w-0 flex-1"
          eyebrow="DIARY"
          title="馆内日记"
          subtitle={
            result.ok
              ? "记录你在馆内的每一天，学了什么，感受了什么。"
              : "连接数据库后即可在此看到真实日记。"
          }
        />
        <Link
          href={newEntryHref}
          className="card-interactive inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:mb-1"
        >
          写今天的日记
        </Link>
      </div>

      {result.ok === false && result.kind === "env" ? (
        <div className="card-surface border-amber-200/80 bg-amber-50/50 p-5 text-sm text-stone-700 sm:p-6">
          <p className="font-medium text-stone-800">尚未配置 Supabase</p>
          <p className="mt-2 leading-relaxed">
            请在项目根目录创建{" "}
            <code className="rounded bg-stone-200/60 px-1 py-0.5 text-xs">
              .env.local
            </code>
            ，并填写：
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-stone-600">
            {result.missing.map((key) => (
              <li key={key}>
                <code className="text-xs">{key}</code>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-stone-600">
            可参考根目录的 <code className="text-xs">.env.example</code>。
          </p>
        </div>
      ) : null}

      {result.ok === false && result.kind === "db" ? (
        <div className="card-surface border-red-200/80 bg-red-50/40 p-5 text-sm text-stone-700 sm:p-6">
          <p className="font-medium text-stone-800">读取数据库失败</p>
          <p className="mt-2 leading-relaxed">{result.message}</p>
          <p className="mt-3 text-stone-600">
            若表尚未创建，请在 Supabase SQL Editor 执行{" "}
            <code className="text-xs">supabase/diary_entries.sql</code>。
          </p>
        </div>
      ) : null}

      {result.ok && result.entries.length === 0 ? (
        <p className="text-sm text-stone-600">
          表里还没有日记。可在 Supabase 执行示例插入语句，或自行添加数据。
        </p>
      ) : null}

      {result.ok && result.entries.length > 0 ? (
        <ul className="list-stack">
          {result.entries.map((entry) => (
            <li key={entry.id}>
              <DiaryCard entry={entry} />
            </li>
          ))}
        </ul>
      ) : null}
    </PageShell>
  );
}
