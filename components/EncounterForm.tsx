"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createEncounterAction } from "@/app/encounters/actions";
import {
  encounterFormInitialState,
  type EncounterFormState,
} from "@/lib/encounters/encounter-form-state";
import type { HeroNameOption } from "@/lib/heroes/get-hero-names";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-medium text-ink";

const ratingOptions = [
  { value: "", label: "（可不选）" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
] as const;

type EncounterFormProps = {
  heroes: HeroNameOption[];
};

export function EncounterForm({ heroes }: EncounterFormProps) {
  const [state, formAction, pending] = useActionState<
    EncounterFormState,
    FormData
  >(createEncounterAction, encounterFormInitialState);

  const today = new Date().toISOString().slice(0, 10);
  const hasHeroes = heroes.length > 0;

  return (
    <form action={formAction} className="card-surface space-y-5 p-5 sm:p-6">
      {state.error ? (
        <div
          className="rounded-lg border border-red-200/90 bg-red-50/80 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="hero_name" className={labelClass}>
          遇见了谁 <span className="text-accent">*</span>
        </label>
        {hasHeroes ? (
          <>
            <select
              id="hero_name"
              name="hero_name"
              required
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                请选择一位英雄
              </option>
              {heroes.map((hero) => (
                <option key={hero.id} value={hero.name}>
                  {hero.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted">
              没有找到这位英雄？先去{" "}
              <Link
                href="/heroes/new"
                className="font-medium text-accent hover:underline"
              >
                新增英雄档案 →
              </Link>
            </p>
          </>
        ) : (
          <div className="mt-1.5 rounded-lg border border-border bg-tag/50 px-4 py-3 text-sm text-muted">
            <p>还没有英雄档案，请先去英雄图鉴新增。</p>
            <Link
              href="/heroes/new"
              className="mt-2 inline-block font-medium text-accent hover:underline"
            >
              前往新增英雄档案 →
            </Link>
          </div>
        )}
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
          placeholder="例如：大学图书馆 · 北区"
          className={fieldClass}
        />
      </div>

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
        <label htmlFor="impression" className={labelClass}>
          印象
        </label>
        <input
          id="impression"
          name="impression"
          type="text"
          placeholder="一两句侧写或画面"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="rating" className={labelClass}>
          评级
        </label>
        <select id="rating" name="rating" defaultValue="" className={fieldClass}>
          {ratingOptions.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.value ? `${opt.label} 分` : opt.label}
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
          placeholder="还想补记的细节……"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/encounters"
          className="text-center text-sm text-muted transition-colors hover:text-ink sm:text-left"
        >
          ← 返回遇见记录
        </Link>
        <button
          type="submit"
          disabled={pending || !hasHeroes}
          className="card-interactive inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "保存中…" : "保存记录"}
        </button>
      </div>
    </form>
  );
}
