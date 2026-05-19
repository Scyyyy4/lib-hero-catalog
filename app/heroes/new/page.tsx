import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { HeroForm } from "@/components/HeroForm";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "新增英雄档案",
  description: "添加一条新的英雄档案到图鉴。",
};

export default async function NewHeroPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="HEROES"
        title="新增英雄档案"
        subtitle="记下名字、类型与常去的馆。保存后会回到英雄图鉴。"
      />
      <HeroForm />
    </PageShell>
  );
}
