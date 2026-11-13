import Image from "next/image";
import Link from "next/link";
import { AdminNavSignOut } from "@/components/AdminNavSignOut";

function SocialIcon({ network }: { network: "x" | "instagram" | "facebook" }) {
  if (network === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="border-b border-[#e8ddc9] bg-white dark:bg-be-900 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          className="flex shrink-0 items-center gap-2"
          href="/"
        >
          <Image
            src="/images/beard-diapers-mark.svg"
            alt=""
            aria-hidden="true"
            width={278}
            height={571}
            unoptimized
            className="h-10 w-auto sm:h-12"
          />
          <span className="flex flex-col gap-0.5">
            <span className="font-serif text-lg font-semibold leading-none tracking-tight text-be-900 dark:text-white sm:text-2xl">
              Beard &amp; Diapers
            </span>
            <span className="font-sans text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-be-500 sm:text-[10px]">
              Epic Talks | Endless Stories
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-be-600 hover:text-be-900 transition-colors font-medium"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-be-600 hover:text-be-900 transition-colors font-medium"
            href="/stories"
          >
            Stories
          </Link>
          <Link
            className="text-be-600 hover:text-be-900 transition-colors font-medium"
            href="/books"
          >
            Books
          </Link>
          <Link
            className="text-be-600 hover:text-be-900 transition-colors font-medium"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-be-600 hover:text-be-900 transition-colors font-medium"
            href="/get-involved"
          >
            Get Involved
          </Link>
          <AdminNavSignOut />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            aria-label="Follow us on X"
            className="text-be-500 hover:text-gold transition-colors"
            href="https://twitter.com/royochuka" target="_blank" rel="noopener"
          >
            <SocialIcon network="x" />
          </a>
          <a
            aria-label="Follow us on Instagram"
            className="text-be-500 hover:text-gold transition-colors"
            href="https://instagram.com/beardandiapers" target="_blank" rel="noopener"
          >
            <SocialIcon network="instagram" />
          </a>
          <a
            aria-label="Follow us on Facebook"
            className="text-be-500 hover:text-gold transition-colors"
            href="https://facebook.com/beardandiapers" target="_blank" rel="noopener"
          >
            <SocialIcon network="facebook" />
          </a>
        </div>
      </div>
    </header>
  );
}
