import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "lib英雄图鉴",
    template: "%s · lib英雄图鉴",
  },
  description:
    "记录你在不同 library 遇见的英雄，也记录你自己的馆内生活。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-nav/80 py-8 text-center text-sm text-muted">
          <p>lib英雄图鉴 · 记录馆内遇见与自白</p>
        </footer>
      </body>
    </html>
  );
}
