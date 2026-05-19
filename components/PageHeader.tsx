type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /** 页眉小字，如模块英文名或语境标签 */
  eyebrow?: string;
  className?: string;
};

/**
 * 各路由页顶部主标题（h1），与区块内的 SectionTitle（h2）区分层级。
 */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`mb-8 sm:mb-10 ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-wide text-stone-500 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 font-serif text-2xl font-semibold leading-snug text-stone-900 sm:mt-1 sm:text-3xl sm:leading-tight">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
