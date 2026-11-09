import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-be-900 text-zinc-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-white mb-4">Beard & Diapers</h4>
            <p className="text-zinc-400 text-sm">
              Advancing hope where people live, learn, heal, and belong.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Navigation</h5>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>
                <Link className="hover:text-white transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/stories">
                  Stories
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/books">
                  Books
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/projects">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Connect</h5>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="https://twitter.com/royochuka" target="_blank" rel="noopener">
                  X
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://instagram.com/beardandiapers" target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="https://facebook.com/beardandiapers" target="_blank" rel="noopener">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="/privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-be-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm copyright">
            © {new Date().getFullYear()} Beard & Diapers. All rights reserved.
          </p>
          <div className="flex gap-2">
            <a
              className="text-zinc-500 hover:text-white transition-colors"
              href="mailto:contact@beardandiapers.org"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}