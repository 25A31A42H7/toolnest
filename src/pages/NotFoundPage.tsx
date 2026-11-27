import {SeoHead} from '../components/SeoHead';
import {Link} from '../utils/router';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found | ToolNest"
        description="The requested tool or page could not be found. Explore all 28 free online tools on ToolNest."
        canonicalPath="/404"
        noIndex
      />

      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <p className="font-mono text-sm font-semibold text-[#C2522B] dark:text-[#E06D4B]">404</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-[#1C1B19] dark:text-[#F5F2EB]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
          We couldn’t find the tool or page you were looking for. Try returning to the homepage or
          browsing our complete directory.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="min-h-10 rounded-xl bg-[#C2522B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A6411E]"
          >
            Go to Homepage
          </Link>
          <Link
            to="/tools"
            className="min-h-10 rounded-xl border border-[#E7E2D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </>
  );
}
