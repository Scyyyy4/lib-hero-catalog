import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { DiaryForm } from "@/components/DiaryForm";
import { getAuthUser } from "@/lib/auth/get-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "新增馆内日记",
  description: "写一条新的馆内日记并保存到 Supabase。",
};

export default async function NewDiaryPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="DIARY"
        title="新增馆内日记"
        subtitle="选一天、一间馆，记下学习主题与心情。保存后会回到日记列表。"
      />
      <DiaryForm />
    </PageShell>
  );
}
