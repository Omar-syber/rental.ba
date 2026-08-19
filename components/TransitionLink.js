"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/lib/TransitionContext";

export default function TransitionLink({ href, children, onClick = undefined, ...rest }) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (typeof href !== "string" || /^https?:\/\//.test(href)) return;

    const targetPath = href.split("#")[0] || "/";
    if (targetPath === pathname) return; // same-page (incl. hash) nav — let Link's native scroll handle it

    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
