"use client";

import { useTransition } from "react";

type DeleteButtonProps = {
  onDelete: () => Promise<{ ok: boolean; message?: string }>;
  label?: string;
};

export function DeleteButton({ onDelete, label = "删除" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("确定要删除吗？此操作不可撤销。")) return;
    startTransition(async () => {
      const result = await onDelete();
      if (!result.ok) {
        alert(result.message ?? "删除失败，请重试。");
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
      {isPending ? "删除中…" : label}
    </button>
  );
}
