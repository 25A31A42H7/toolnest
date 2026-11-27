import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';

export default function TermsPage() {
  return (
    <>
      <SeoHead
        title="Terms and Conditions – ToolNest Free Online Tools"
        description="Read the Terms and Conditions governing acceptable use, intellectual property, and service availability for ToolNest."
        canonicalPath="/terms-and-conditions"
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Terms and Conditions'}]} />

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-xs text-[#78716C] dark:text-[#9E978B]">
          Last Updated: November 27, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E] sm:text-base dark:text-[#B8B2A6]">
          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing or using ToolNest, you agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, please discontinue using the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              2. Permitted Use
            </h2>
            <p className="mt-2">
              You may use ToolNest utilities freely for personal, educational, and commercial
              workflows. You agree not to automate abusive scraping, attempt to disrupt site
              infrastructure, or circumvent security controls.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              3. User Content &amp; Outputs
            </h2>
            <p className="mt-2">
              You retain 100% ownership and responsibility for any text, numbers, or images you
              process using ToolNest. Because processing occurs locally in your browser, we assert
              no rights over your input or downloaded output files.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              4. Availability &amp; Warranty Disclaimer
            </h2>
            <p className="mt-2">
              ToolNest is provided on an "as-is" and "as-available" basis without warranties of any
              kind, express or implied. While we rigorously test our calculators and converters, we
              do not guarantee uninterrupted uptime or error-free output for mission-critical
              decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              5. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by applicable law, ToolNest and its maintainers shall
              not be liable for any indirect, incidental, or consequential damages arising from your
              use of or reliance on any tool output.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
