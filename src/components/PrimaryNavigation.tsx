"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AdminNavSignOut } from "@/components/AdminNavSignOut";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/books", label: "Books" },
  { href: "/projects", label: "Projects" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export function PrimaryNavigation() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState({ pathname, open: false });
  const mobileOpen = mobileMenu.pathname === pathname && mobileMenu.open;
  const setMobileOpen = useCallback((open: boolean) => setMobileMenu({ pathname, open }), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`${
          mobileOpen
            ? "absolute right-4 top-full z-50 flex w-80 max-w-[calc(100vw_-_2rem)] flex-col items-stretch gap-1 rounded-xl border border-brand-gold/30 bg-brand-black p-3 shadow-xl"
            : "hidden"
        } lg:static lg:z-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-5`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-bold text-brand-gold-light transition-colors hover:bg-brand-gold/10 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold lg:px-0 lg:py-1 lg:text-[13px] lg:text-brand-black xl:text-sm"
          >
            {label}
          </Link>
        ))}
        <div className="px-3 py-2 lg:px-0 lg:py-0">
          <AdminNavSignOut onSignOutStart={() => setMobileOpen(false)} />
        </div>
      </nav>

      <button
        type="button"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-black transition-colors hover:bg-brand-gold/10 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold lg:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="primary-navigation"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
    </>
  );
}
