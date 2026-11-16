import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white pt-12 pb-2 text-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" aria-label="Beard & Diapers home" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">
              <Image
                src="/images/beard-diapers-logo.svg"
                alt="Beard & Diapers — Epic Talks | Endless Stories"
                width={240}
                height={201}
                unoptimized
                className="mb-5 h-auto w-40 sm:w-44"
              />
            </Link>
          </div>

          <div>
            <h5 className="mb-4 font-semibold text-brand-black">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="transition-colors hover:text-brand-gold-muted" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-brand-gold-muted" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-brand-gold-muted" href="/stories">
                  Stories
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-brand-gold-muted" href="/books">
                  Books
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-brand-gold-muted" href="/projects">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold text-brand-black">Connect</h5>
            <ul className="flex items-center gap-4">
              <li>
                <a aria-label="Follow us on X" className="inline-flex transition-colors hover:text-brand-gold-muted" href="https://twitter.com/royochuka" target="_blank" rel="noopener">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>
                </a>
              </li>
              <li>
                <a aria-label="Follow us on Instagram" className="inline-flex transition-colors hover:text-brand-gold-muted" href="https://www.instagram.com/beardanddiapers/" target="_blank" rel="noopener">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>
                </a>
              </li>
              <li>
                <a aria-label="Follow us on Facebook" className="inline-flex transition-colors hover:text-brand-gold-muted" href="https://www.facebook.com/Beards%20%26%20Diapers" target="_blank" rel="noopener">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg>
                </a>
              </li>
              <li>
                <a aria-label="Message us on WhatsApp" className="inline-flex transition-colors hover:text-brand-gold-muted" href="/api/whatsapp" target="_blank" rel="noopener noreferrer">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
                    <path d="M8.3 7.7c-.4.4-.7.9-.7 1.5 0 2.6 3.4 6 6 6 .6 0 1.1-.3 1.5-.7l.3-.4-1.9-1.3-1 .7c-1.1-.5-1.8-1.2-2.3-2.3l.7-1-1.3-1.9-.4.4Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold text-brand-black">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="transition-colors hover:text-brand-gold-muted" href="/privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-brand-gold-muted" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gold/30 pt-8">
          <p className="text-sm copyright">
            © 2026 Beard & Diapers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
