import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';
import {Link} from '../utils/router';

export default function AboutPage() {
  return (
    <>
      <SeoHead
        title="About Us – ToolNest Free Online Tools"
        description="Learn about ToolNest's mission to provide fast, private, and free browser-based utilities for students, writers, creators, and global users."
        canonicalPath="/about"
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'About Us'}]} />

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
          About ToolNest
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
          ToolNest was created with a simple goal: everyday digital utilities should load in a
          split second, work reliably on any device, and never force users behind paywalls or
          unnecessary account sign-ups.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E] sm:text-base dark:text-[#B8B2A6]">
          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Built for International Students, Writers, and Creators
            </h2>
            <p className="mt-2">
              Whether you are checking essay word limits, converting a 10.0 or 4.0 university GPA,
              planning semester attendance, formatting YouTube descriptions, calculating loan EMIs,
              or shrinking an image before uploading to an online portal, ToolNest brings 28 focused
              utilities together in one uncluttered workspace.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Browser-First Architecture &amp; Data Privacy
            </h2>
            <p className="mt-2">
              Unlike traditional utility sites that upload your documents or photos to remote
              servers for processing, ToolNest executes calculations, text transformations, and
              HTML5 Canvas image compression directly inside your own browser tab. Your drafts,
              personal dates, and image files never leave your computer or smartphone.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              How We Keep ToolNest Free
            </h2>
            <p className="mt-2">
              ToolNest is designed to be sustained through non-intrusive display advertising that
              never blocks or interferes with tool functionality. Every calculator, converter, and
              generator remains free for visitors across the United States, United Kingdom, Canada,
              Australia, India, and worldwide.
            </p>
          </section>

          <div className="pt-4">
            <Link
              to="/tools"
              className="inline-flex min-h-11 items-center rounded-xl bg-[#C2522B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A6411E]"
            >
              Explore All 28 Tools
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
