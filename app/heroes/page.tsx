import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { HeroCard } from "@/components/HeroCard";
import { getHeroProfiles } from "@/lib/heroes/get-hero-profiles";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "英雄图鉴",
  description: "浏览馆内的英雄档案；遇见流水见独立页面。",
};

export default async function HeroesPage() {
  const user = await getAuthUser();
  const newHeroHref = user ? "/heroes/new" : "/login";
  const result = await getHeroProfiles();
  const success = result.error === null && result.data !== null;

  return (
    <PageShell width="wide">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          className="mb-0 min-w-0 flex-1"
          eyebrow="HEROES"
          title="英雄图鉴"
          subtitle={
            success
              ? "记录你在图书馆里遇见的英雄，每一个都值得被记住。"
              : "连接数据库后即可在此看到真实英雄档案。"
          }
        />
        <Link
          href={newHeroHref}
          className="card-interactive inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:mb-1"
        >
          新增英雄档案
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
            请确认 Supabase 中已创建 hero_profiles 表，且 RLS 允许读取。
          </p>
        </div>
      ) : null}

      {success && result.data.length === 0 ? (
        <p className="text-sm text-stone-400">还没有英雄档案。</p>
      ) : null}

      {success && result.data.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {result.data.map((hero) => (
            <li key={hero.id}>
              <HeroCard hero={hero} canDelete={!!user} />
            </li>
          ))}
        </ul>
      ) : null}

      <section
        className="mt-12 sm:mt-14"
        aria-labelledby="encounters-link-heading"
      >
        <div className="card-surface p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="min-w-0">
            <h2
              id="encounters-link-heading"
              className="font-serif text-lg font-semibold text-stone-800"
            >
              遇见记录
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              何时、何地、与谁、印象与主观评级，在独立页面查看完整流水。
            </p>
          </div>
          <Link
            href="/encounters"
            className="card-interactive mt-4 inline-flex shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-[var(--surface)] sm:mt-0"
          >
            前往遇见记录 →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
