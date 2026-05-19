"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/heroes", label: "英雄图鉴" },
  { href: "/encounters", label: "遇见记录" },
  { href: "/diary", label: "馆内日记" },
  { href: "/about", label: "关于项目" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap gap-x-3 gap-y-2 text-sm sm:gap-x-4"
      aria-label="主导航"
    >
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-1 py-0.5 transition-colors ${
              active
                ? "font-medium text-accent underline decoration-accent decoration-2 underline-offset-4"
                : "text-muted hover:text-ink"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
