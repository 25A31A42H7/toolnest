import {Menu, Moon, Sun, X} from 'lucide-react';
import {useState} from 'react';
import {CATEGORIES} from '../data/categories';
import {Link, useRouter} from '../utils/router';
import {useTheme} from '../utils/theme';

export function Header() {
  const {path} = useRouter();
  const {theme, toggleTheme} = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7E2D8] bg-[#FAF8F4] dark:border-[#2E2A26] dark:bg-[#141312]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Zone 1: Single-line brand wordmark */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-display flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#1C1B19] whitespace-nowrap shrink-0 dark:text-[#F5F2EB]"
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19] text-xs font-bold text-[#FAF8F4] ring-1 ring-[#C2522B] dark:bg-[#C2522B] dark:text-[#FAF8F4]"
            aria-hidden="true"
          >
            T
          </span>
          ToolNest
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {CATEGORIES.map((cat) => {
            const active = path === cat.slug;
            return (
              <Link
                key={cat.id}
                to={cat.slug}
                className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors hover:text-[#C2522B] dark:hover:text-[#E06D4B] ${
                  active
                    ? 'text-[#C2522B] underline decoration-[#C2522B]/50 underline-offset-4 dark:text-[#E06D4B]'
                    : 'text-[#57534E] dark:text-[#B8B2A6]'
                }`}
              >
                {cat.shortName}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Theme toggle & mobile menu */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#E7E2D8] bg-white px-3.5 text-xs font-medium text-[#1C1B19] whitespace-nowrap shrink-0 transition-colors hover:border-[#C2522B]/50 focus-visible:outline-2 focus-visible:outline-[#C2522B] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#F5F2EB] dark:hover:border-[#E06D4B]/50"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-[#E06D4B]" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-[#57534E]" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E7E2D8] bg-white text-[#1C1B19] transition-colors hover:border-[#C2522B]/50 md:hidden dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E7E2D8] bg-[#FAF8F4] px-4 py-3 md:hidden dark:border-[#2E2A26] dark:bg-[#141312]"
        >
          <div className="flex flex-col gap-1">
            <Link
              to="/tools"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-[#1C1B19] hover:bg-[#EFECE4] dark:text-[#F5F2EB] dark:hover:bg-[#1D1B19]"
            >
              All 28 Tools
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.slug}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#57534E] hover:bg-[#EFECE4] dark:text-[#B8B2A6] dark:hover:bg-[#1D1B19]"
              >
                {cat.name}
              </Link>
            ))}
            <div className="my-2 border-t border-[#E7E2D8] dark:border-[#2E2A26]" />
            <div className="grid grid-cols-2 gap-1">
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-xs font-medium text-[#57534E] hover:bg-[#EFECE4] dark:text-[#B8B2A6] dark:hover:bg-[#1D1B19]"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-xs font-medium text-[#57534E] hover:bg-[#EFECE4] dark:text-[#B8B2A6] dark:hover:bg-[#1D1B19]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
