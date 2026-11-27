import {CATEGORIES} from '../data/categories';
import {Link} from '../utils/router';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E7E2D8] bg-[#F4F0E8] dark:border-[#2E2A26] dark:bg-[#141312]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Summary */}
          <div>
            <Link
              to="/"
              className="font-display inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#1C1B19] dark:text-[#F5F2EB]"
            >
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19] text-xs font-bold text-[#FAF8F4] ring-1 ring-[#C2522B] dark:bg-[#C2522B]"
                aria-hidden="true"
              >
                T
              </span>
              ToolNest
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
              Independent, free browser utilities built for writers, students, creators, and
              everyday calculations worldwide.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
              Tool Categories
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E] dark:text-[#B8B2A6]">
              <li>
                <Link to="/tools" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  All Online Tools (28)
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={cat.slug} className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
              Popular Tools
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E] dark:text-[#B8B2A6]">
              <li>
                <Link to="/word-counter" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link to="/cgpa-calculator" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/attendance-calculator"
                  className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]"
                >
                  Attendance Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/youtube-title-generator"
                  className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]"
                >
                  YouTube Title Generator
                </Link>
              </li>
              <li>
                <Link to="/loan-calculator" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  Loan &amp; EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/image-compressor"
                  className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]"
                >
                  Image Compressor
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
              Information &amp; Legal
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E] dark:text-[#B8B2A6]">
              <li>
                <Link to="/about" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#C2522B] dark:hover:text-[#E06D4B]">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#E7E2D8] pt-6 text-xs text-[#57534E] sm:flex-row sm:items-center dark:border-[#2E2A26] dark:text-[#B8B2A6]">
          <p>© {year} ToolNest. Free online tools running locally in your browser.</p>
          <p>No sign-up required · Client-side processing</p>
        </div>
      </div>
    </footer>
  );
}
