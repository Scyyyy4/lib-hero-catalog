import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "关于项目",
  description: "了解 lib英雄图鉴在记录什么，以及两条叙事线。",
};

export default function AboutPage() {
  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="ABOUT"
        title="关于 lib英雄图鉴"
        subtitle="一个偏纸感、偏校园与日记气质的小站，用来安放与 library 有关的遇见与自白。"
      />

      <div className="card-surface space-y-5 p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
          「lib英雄图鉴」这个名字里，lib 取 library
          的轻巧缩写；英雄不必拯救世界，可以是在长桌对面认真写字的陌生人，也可以是某天突然读懂一页纸的自己。
        </p>
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
          网站刻意拆成两条线，像笔记本的左右两栏：一边朝外，记录你在不同
          library
          遇见的人与事；一边朝内，记录你在馆内的学习、情绪与细碎观察。以后也许会接上账号、认领、成就或社交，但第一版只想把版式与叙事搭稳。
        </p>
      </div>

      <section className="mt-10" aria-labelledby="threads-heading">
        <SectionTitle
          id="threads-heading"
          title="两条叙事线"
          subtitle="信息架构上，对外的「事件与人物」与对内的「日记」分开存放，便于以后分表与权限设计。"
        />
        <ul className="list-stack">
          <li className="card-surface p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
              <span className="font-semibold text-stone-800">遇见别人</span>
              ：英雄图鉴与遇见记录，偏向「谁、在哪、留下了怎样的侧写」。适合给那些你愿意称之为英雄、却未必交换过姓名的人。
            </p>
          </li>
          <li className="card-surface p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
              <span className="font-semibold text-stone-800">记录自己</span>
              ：馆内日记，偏向「我这一天在馆内完成了什么、心情如何」。像给自己写的借书卡备注。
            </p>
          </li>
        </ul>
      </section>

      <section
        id="claim"
        className="mt-10 scroll-mt-28"
        aria-labelledby="claim-heading"
      >
        <h2
          id="claim-heading"
          className="font-serif text-xl font-semibold text-stone-800"
        >
          认领档案（规划中）
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          若你在图鉴里认出了自己，将来可以在此认领对应档案，把「非用户」慢慢改成「用户故事」。当前版本为静态前端，不包含登录与数据库。
        </p>
        <Link
          href="/heroes"
          className="mt-4 inline-block text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-500"
        >
          返回英雄图鉴 →
        </Link>
      </section>
    </PageShell>
  );
}
