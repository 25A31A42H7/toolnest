import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';
import {SITE_CONFIG} from '../config/site';
import {Link} from '../utils/router';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SeoHead
        title="Privacy Policy – ToolNest Free Online Tools"
        description="Read ToolNest's Privacy Policy covering local browser processing, cookies, Google AdSense advertising disclosures, and GDPR/CCPA rights."
        canonicalPath="/privacy-policy"
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Privacy Policy'}]} />

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-[#78716C] dark:text-[#9E978B]">
          Effective Date: November 27, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E] sm:text-base dark:text-[#B8B2A6]">
          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              1. Local Browser Processing
            </h2>
            <p className="mt-2">
              ToolNest is engineered to respect your privacy. All text editors, student GPA and
              attendance calculators, financial/math calculators, and image tools (compression,
              resizing, JPG/PNG conversion) run locally in your browser using JavaScript and the
              HTML5 Canvas API. We do not upload, store, or inspect the text or image files you
              process inside our tools.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              2. Browser Preferences &amp; Local Storage
            </h2>
            <p className="mt-2">
              ToolNest stores your light or dark theme preference in your browser’s{' '}
              <code>localStorage</code> so the interface remembers your visual setting across
              visits. This preference stays solely on your device and is not used for cross-site
              tracking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              3. Contact Form Inquiries
            </h2>
            <p className="mt-2">
              If you choose to submit a message via our{' '}
              <Link
                to="/contact"
                className="text-[#C2522B] underline dark:text-[#E06D4B]"
              >
                Contact page
              </Link>
              , the name, email address, inquiry category, and message you enter are transmitted
              over HTTPS solely to respond to your request. Do not include sensitive passwords or
              confidential financial account numbers in contact inquiries.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              4. Google AdSense &amp; Third-Party Cookies
            </h2>
            <p className="mt-2">
              To keep ToolNest free for everyone, we may partner with Google AdSense and third-party
              vendors who use cookies or web beacons to serve ads based on your prior visits to
              this website or other websites on the internet.
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Google’s use of advertising cookies enables it and its partners to serve relevant
                advertisements to visitors.
              </li>
              <li>
                You may opt out of personalized advertising at any time by visiting Google’s{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C2522B] underline dark:text-[#E06D4B]"
                >
                  Ads Settings
                </a>{' '}
                or{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C2522B] underline dark:text-[#E06D4B]"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              5. Log Files &amp; Hosting Infrastructure
            </h2>
            <p className="mt-2">
              Like most websites hosted on static content delivery networks, standard server logs
              may record non-personally-identifying technical metadata such as IP address, browser
              type, referring page, and timestamps for security, uptime monitoring, and aggregate
              traffic statistics.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              6. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p className="mt-2">
              Visitors in the European Economic Area, United Kingdom, California, and other
              jurisdictions have the right to know what personal data is collected, request deletion
              of contact inquiries, and manage cookie consent preferences in their browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              7. Contact Regarding Privacy
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, please reach us via our{' '}
              <Link to="/contact" className="text-[#C2522B] underline dark:text-[#E06D4B]">
                Contact page
              </Link>
              {SITE_CONFIG.contactEmail ? (
                <>
                  {' '}
                  or email{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="text-[#C2522B] underline dark:text-[#E06D4B]"
                  >
                    {SITE_CONFIG.contactEmail}
                  </a>
                </>
              ) : null}
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
