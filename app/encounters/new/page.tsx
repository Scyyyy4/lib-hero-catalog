import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { EncounterForm } from "@/components/EncounterForm";
import { getHeroNames } from "@/lib/heroes/get-hero-names";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "新增遇见记录",
  description: "记录一次在 library 的遇见。",
};

export default async function NewEncounterPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  const result = await getHeroNames();
  const heroes = result.data ?? [];

  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="ENCOUNTERS"
        title="新增遇见记录"
        subtitle="选一天、一间馆、从图鉴里选一位英雄。保存后会回到遇见列表。"
      />
      {result.error ? (
        <p className="mb-4 text-sm text-red-800" role="alert">
          无法加载英雄列表：{" "}
          {result.error.kind === "env"
            ? `请配置 ${result.error.missing.join("、")}`
            : result.error.message}
        </p>
      ) : null}
      <EncounterForm heroes={heroes} />
    </PageShell>
  );
}
