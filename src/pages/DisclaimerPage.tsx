import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';

export default function DisclaimerPage() {
  return (
    <>
      <SeoHead
        title="Disclaimer – ToolNest Free Online Tools"
        description="Important informational disclaimers regarding ToolNest financial, academic GPA, BMI health, and YouTube revenue estimation calculators."
        canonicalPath="/disclaimer"
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Disclaimer'}]} />

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
          Disclaimer
        </h1>
        <p className="mt-2 text-xs text-[#78716C] dark:text-[#9E978B]">
          Last Updated: November 27, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E] sm:text-base dark:text-[#B8B2A6]">
          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              General Informational Purpose
            </h2>
            <p className="mt-2">
              All calculators, generators, and converters on ToolNest are provided strictly for
              educational and general informational purposes. Always double-check official rules
              with your institution, lender, or advisor before making binding decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Academic &amp; Grading Disclaimers
            </h2>
            <p className="mt-2">
              Universities and exam boards apply varying rounding policies, repeat-course rules, and
              CGPA-to-percentage formulas (such as ×9.5, ×10, or custom conversions). Always confirm
              your official GPA, CGPA, and attendance standing with your academic registrar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Financial &amp; YouTube Earnings Estimates
            </h2>
            <p className="mt-2">
              The Loan/EMI Calculator and Discount Calculator provide mathematical estimates and do
              not constitute licensed financial or tax advice. Likewise, the YouTube Earnings
              Calculator estimates approximate AdSense RPM ranges; actual creator payouts fluctuate
              based on advertiser demand, viewer country, seasonality, and YouTube Partner Program
              policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Health &amp; BMI Disclaimer
            </h2>
            <p className="mt-2">
              The BMI Calculator uses standard World Health Organization formulas for adults and is
              not medical advice. BMI does not directly measure body fat percentage or account for
              muscle mass, age, or clinical history. Consult a qualified healthcare professional for
              personalized medical guidance.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
