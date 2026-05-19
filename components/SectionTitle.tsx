type SectionTitleProps = {
  title: string;
  subtitle?: string;
  /** 用于锚点跳转，如 heroes 页的 #meetings */
  id?: string;
};

export function SectionTitle({ title, subtitle, id }: SectionTitleProps) {
  return (
    <div className="mb-6 scroll-mt-28">
      <h2
        id={id}
        className="font-serif text-2xl font-semibold text-stone-800 sm:text-[1.65rem]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
