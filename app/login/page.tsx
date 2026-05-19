import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { LoginForm } from "@/components/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "登录",
  description: "登录或注册 lib英雄图鉴 账号。",
};

export default function LoginPage() {
  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="AUTH"
        title="登录 lib英雄图鉴"
        subtitle="登录后可新增馆内日记、英雄档案与遇见记录。浏览内容无需登录。"
      />
      <LoginForm />
    </PageShell>
  );
}
