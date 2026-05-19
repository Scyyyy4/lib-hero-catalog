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
        subtitle="记在 library 里的人，和记在自己身上的事。"
      />

      <div className="card-surface space-y-5 p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
          「lib英雄图鉴」这个名字里，lib 取 library
          的轻巧缩写；英雄不必拯救世界，可以是在长桌对面认真写字的陌生人，也可以是某天突然读懂一页纸的自己。
        </p>
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
          网站刻意拆成两条线，像笔记本的左右两栏：一边朝外，记录你在不同
          library
          遇见的人与事；一边朝内，记录你在馆内的学习、情绪与细碎观察。以后也许会接上账号、认领、成就或社交，但第一版就先这样了。
        </p>
      </div>

      <section className="mt-10" aria-labelledby="threads-heading">
        <SectionTitle
          id="threads-heading"
          title="两条叙事线"
        />
        <ul className="list-stack">
          <li className="card-surface p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
              <span className="font-semibold text-stone-800">遇见别人</span>
              ：记那些在图书馆遇到的人——坐在对面的陌生人、背包上挂了徽章的人、每天都来但你们从没说过话的人。
            </p>
          </li>
          <li className="card-surface p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
              <span className="font-semibold text-stone-800">记录自己</span>
              ：馆内日记，写今天看了什么、卡在哪里、或者只是坐着发了一会儿呆。
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
          如果你在图鉴里看到了自己，以后可以来认领。现在还没做，先放着。
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
