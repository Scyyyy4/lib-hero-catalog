import Link from "next/link";

const featureCards = [
  {
    title: "英雄图鉴",
    desc: "认识在馆内遇见的人：用户与非用户，都值得被温柔记下。",
    href: "/heroes",
    emoji: "📚",
  },
  {
    title: "遇见记录",
    desc: "哪一天、哪一间 library、与谁擦肩而过或并肩坐了一下午。",
    href: "/encounters",
    emoji: "👀",
  },
  {
    title: "馆内日记",
    desc: "学了什么、心情如何，把馆内的一天写成可回翻的纸页。",
    href: "/diary",
    emoji: "📓",
  },
  {
    title: "认领档案",
    desc: "若你认出故事里的自己，将来可在此认领属于你的那一页。",
    href: "/about#claim",
    emoji: "🏷️",
  },
] as const;

const containerClass = "mx-auto max-w-5xl px-4 sm:px-6";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border/60 py-20 sm:py-24">
        <div className={containerClass}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            library · diary · campus
          </p>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-ink sm:text-6xl">
            lib英雄图鉴
          </h1>
          <div className="mt-6 mb-8 h-px w-12 bg-border" aria-hidden />
          <p className="max-w-[480px] text-lg leading-relaxed text-muted">
            记录你在不同 library 遇见的英雄，也记录你自己的馆内生活。
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/diary/new"
              className="card-interactive inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              开始记录
            </Link>
            <Link
              href="/heroes"
              className="card-interactive inline-flex items-center justify-center rounded-lg border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
            >
              查看英雄图鉴
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="features-heading">
        <div className={containerClass}>
          <h2
            id="features-heading"
            className="font-serif text-2xl font-semibold text-ink"
          >
            从这里开始
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {featureCards.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="card-interactive group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden>
                    {card.emoji}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {card.desc}
                  </p>
                  <span className="mt-5 text-sm font-medium text-accent group-hover:underline">
                    前往 →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
