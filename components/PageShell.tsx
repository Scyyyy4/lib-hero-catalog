import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  /** 与列表页、首页内容区对齐：宽版图鉴；窄版日记/关于/遇见 */
  width?: "wide" | "narrow";
};

const maxWidth = {
  wide: "max-w-5xl",
  narrow: "max-w-3xl",
} as const;

/**
 * 页面水平内边距与最大宽度，与首页功能卡栅格对齐。
 */
export function PageShell({ children, width = "wide" }: PageShellProps) {
  return (
    <div
      className={`mx-auto w-full ${maxWidth[width]} px-4 py-10 sm:px-6 sm:py-12`}
    >
      {children}
    </div>
  );
}
