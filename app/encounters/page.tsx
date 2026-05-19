import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { EncounterCard } from "@/components/EncounterCard";
import { getEncounters } from "@/lib/encounters/get-encounters";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "遇见记录",
  description: "按时间与馆别浏览遇见流水：对象、印象与主观评级。",
};

export default async function EncountersPage() {
  const user = await getAuthUser();
  const newEncounterHref = user ? "/encounters/new" : "/login";
  const result = await getEncounters();
  const success = result.error === null && result.data !== null;

  return (
    <PageShell width="wide">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          className="mb-0 min-w-0 flex-1"
          eyebrow="ENCOUNTERS"
          title="遇见记录"
          subtitle={
            success
              ? "记下每一次相遇，时间、地点与印象。"
              : "连接数据库后即可在此看到真实遇见记录。"
          }
        />
        <Link
          href={newEncounterHref}
          className="card-interactive inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:mb-1"
        >
          记录新遇见
        </Link>
      </div>

      {result.error?.kind === "env" ? (
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
            {result.error.missing.map((key) => (
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

      {result.error?.kind === "db" ? (
        <div className="card-surface border-red-200/80 bg-red-50/40 p-5 text-sm text-stone-700 sm:p-6">
          <p className="font-medium text-stone-800">读取数据库失败</p>
          <p className="mt-2 leading-relaxed">{result.error.message}</p>
          <p className="mt-3 text-stone-600">
            请确认 Supabase 中已创建 encounters 表，且 RLS 允许读取。
          </p>
        </div>
      ) : null}

      {success && result.data.length === 0 ? (
        <p className="text-sm text-stone-400">还没有遇见记录。</p>
      ) : null}

      {success && result.data.length > 0 ? (
        <ul className="list-stack">
          {result.data.map((encounter) => (
            <li key={encounter.id}>
              <EncounterCard encounter={encounter} />
            </li>
          ))}
        </ul>
      ) : null}
    </PageShell>
  );
}
