"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createDiaryEntryAction } from "@/app/diary/actions";
import {
  diaryFormInitialState,
  type DiaryFormState,
} from "@/lib/diary/diary-form-state";
import type { Mood } from "@/types/diary";

const moodOptions: { value: "" | Mood; label: string }[] = [
  { value: "", label: "（可不选）" },
  { value: "平静", label: "平静" },
  { value: "充实", label: "充实" },
  { value: "疲惫", label: "疲惫" },
  { value: "期待", label: "期待" },
  { value: "有点乱", label: "有点乱" },
];

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-medium text-ink";

export function DiaryForm() {
  const [state, formAction, pending] = useActionState<
    DiaryFormState,
    FormData
  >(createDiaryEntryAction, diaryFormInitialState);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="card-surface space-y-5 p-5 sm:p-6">
      {state.error ? (
        <div
          className="rounded-lg border border-red-200/90 bg-red-50/80 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {state.error}
          {state.error.includes("row-level security") ||
          state.error.includes("policy") ? (
            <p className="mt-2 text-xs text-red-800/90">
              若提示与 RLS 相关，请在 Supabase 为 diary_entries 添加 INSERT
              策略（见项目 supabase/diary_entries_insert.sql）。
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor="date" className={labelClass}>
          日期 <span className="text-accent">*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={today}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="library" className={labelClass}>
          馆名 <span className="text-accent">*</span>
        </label>
        <input
          id="library"
          name="library"
          type="text"
          required
          placeholder="例如：市立图书馆 · 三楼自习区"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="studyTopic" className={labelClass}>
          学习主题 <span className="text-accent">*</span>
        </label>
        <textarea
          id="studyTopic"
          name="studyTopic"
          required
          rows={4}
          placeholder="今天学了什么、读了什么……"
          className={`${fieldClass} resize-y min-h-[6rem]`}
        />
      </div>

      <div>
        <label htmlFor="mood" className={labelClass}>
          心情
        </label>
        <select id="mood" name="mood" defaultValue="" className={fieldClass}>
          {moodOptions.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className={labelClass}>
          备注
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="闭馆前的细节、馆内的小观察……"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/diary"
          className="text-center text-sm text-muted transition-colors hover:text-ink sm:text-left"
        >
          ← 返回日记列表
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="card-interactive inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "保存中…" : "保存日记"}
        </button>
      </div>
    </form>
  );
}
