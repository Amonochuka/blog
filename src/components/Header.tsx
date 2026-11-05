import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-be-200 bg-white dark:bg-be-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          className="flex items-center gap-2"
          href="/"
        >
          <span className="text-2xl font-bold text-be-900 dark:text-white">Beard & Diapers</span>
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
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="text-be-500 hover:text-gold transition-colors"
            href="https://twitter.com/royochuka" target="_blank" rel="noopener"
          >
            X
          </a>
          <a
            className="text-be-500 hover:text-gold transition-colors"
            href="https://instagram.com/beardandiapers" target="_blank" rel="noopener"
          >
            Instagram
          </a>
          <a
            className="text-be-500 hover:text-gold transition-colors"
            href="https://facebook.com/beardandiapers" target="_blank" rel="noopener"
          >
            Facebook
          </a>
        </div>
      </div>
    </header>
  );
}