"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminNavSignOut() {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (pathname !== "/admin") return;

    let active = true;
    const refreshSession = () => {
      fetch("/api/admin/session", { signal: AbortSignal.timeout(5000) })
        .then((response) => response.json())
        .then((data: { authenticated?: boolean }) => {
          if (active) setAuthenticated(data.authenticated === true);
        })
        .catch(() => {
          if (active) setAuthenticated(false);
        });
    };
    refreshSession();
    window.addEventListener("blog-admin-session-change", refreshSession);

    return () => {
      active = false;
      window.removeEventListener("blog-admin-session-change", refreshSession);
    };
  }, [pathname]);

  if (pathname !== "/admin" || !authenticated) return null;

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } finally {
      setAuthenticated(false);
      router.replace("/admin");
      router.refresh();
      setSigningOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={signingOut}
      className="ml-5 inline-flex h-auto w-auto min-h-0 min-w-0 shrink-0 items-center justify-center whitespace-nowrap border-0 bg-transparent p-0 text-sm font-medium leading-normal text-be-600 transition-colors hover:text-be-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600 disabled:opacity-60 dark:text-zinc-300 dark:hover:text-white"
    >
      {signingOut ? "Signing out…" : "Sign out"}
    </button>
  );
}
