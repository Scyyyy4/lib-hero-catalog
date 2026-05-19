import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";

type NavbarAuthProps = {
  /** 已登录时的展示名（非完整邮箱） */
  displayLabel: string | null;
};

export function NavbarAuth({ displayLabel }: NavbarAuthProps) {
  if (!displayLabel) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-lg border border-accent px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
      >
        登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        className="max-w-[9rem] truncate text-xs font-medium text-ink sm:max-w-[12rem] sm:text-sm"
        title={displayLabel}
      >
        {displayLabel}
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:bg-tag hover:text-ink sm:text-sm"
        >
          退出
        </button>
      </form>
    </div>
  );
}
