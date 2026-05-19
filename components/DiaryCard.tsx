import type { DiaryEntry } from "@/types/diary";

type DiaryCardProps = {
  entry: DiaryEntry;
};

export function DiaryCard({ entry }: DiaryCardProps) {
  return (
    <article className="card-surface flex flex-col gap-3 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200/80 pb-3">
        <time
          dateTime={entry.date}
          className="font-mono text-sm font-medium text-stone-700"
        >
          {entry.date}
        </time>
        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-700 ring-1 ring-stone-200/80">
          {entry.mood}
        </span>
      </div>
      <p className="text-sm font-medium text-stone-800">
        <span className="text-stone-500">library · </span>
        {entry.library}
      </p>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          学习主题
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-700">
          {entry.studyTopic}
        </p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          备注
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-600 italic">
          {entry.note}
        </p>
      </div>
    </article>
  );
}