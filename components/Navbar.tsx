import Link from "next/link";
import { getAuthUser } from "@/lib/auth/get-user";
import { getNavbarDisplayLabel } from "@/lib/auth/display-name";
import { NavbarNav } from "@/components/NavbarNav";
import { NavbarAuth } from "@/components/NavbarAuth";

export async function Navbar() {
  const user = await getAuthUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-nav/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-ink transition-colors hover:text-muted"
        >
          lib英雄图鉴
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <NavbarNav />
          <NavbarAuth
            displayLabel={user ? getNavbarDisplayLabel(user) : null}
          />
        </div>
      </div>
    </header>
  );
}
