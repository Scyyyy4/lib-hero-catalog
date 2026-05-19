"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createHeroAction } from "@/app/heroes/actions";
import {
  heroFormInitialState,
  type HeroFormState,
} from "@/lib/heroes/hero-form-state";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-medium text-ink";

export function HeroForm() {
  const [state, formAction, pending] = useActionState<HeroFormState, FormData>(
    createHeroAction,
    heroFormInitialState,
  );

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
        <label htmlFor="name" className={labelClass}>
          名字 <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="英雄的名字或绰号"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="type" className={labelClass}>
          类型 <span className="text-accent">*</span>
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue="guest"
          className={fieldClass}
        >
          <option value="guest">非用户英雄</option>
          <option value="user">用户英雄</option>
        </select>
      </div>

      <div>
        <label htmlFor="library" className={labelClass}>
          常出现的馆 <span className="text-accent">*</span>
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
        <label htmlFor="tags" className={labelClass}>
          标签
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="用逗号分隔，例：早起,文学,安静"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>
          简介
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder="一两句侧写，像借书卡上的备注……"
          className={`${fieldClass} resize-y min-h-[5rem]`}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/heroes"
          className="text-center text-sm text-muted transition-colors hover:text-ink sm:text-left"
        >
          ← 返回英雄图鉴
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="card-interactive inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "保存中…" : "保存档案"}
        </button>
      </div>
    </form>
  );
}
