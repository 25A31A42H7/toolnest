import {CheckCircle2, ChevronDown} from 'lucide-react';
import {useMemo} from 'react';
import {AdSlot} from '../components/AdSlot';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';
import {ToolCard} from '../components/ToolCard';
import {ToolIcon} from '../components/ToolIcon';
import {ADSENSE_CONFIG} from '../config/adsense';
import {getCanonicalOrigin} from '../config/site';
import {getCategoryById} from '../data/categories';
import {getToolBySlug, ToolDefinition} from '../data/tools';
import {ToolWorkspace} from '../tools/ToolRegistry';
import {Link} from '../utils/router';

export default function ToolPage({tool}: {tool: ToolDefinition}) {
  const category = getCategoryById(tool.category);

  const relatedTools = useMemo(() => {
    return tool.relatedSlugs
      .map((slug) => getToolBySlug(slug))
      .filter((t): t is ToolDefinition => Boolean(t));
  }, [tool.relatedSlugs]);

  const structuredData = useMemo(() => {
    const origin = getCanonicalOrigin();
    const resolveUrl = (p: string) => (origin ? `${origin}${p}` : p);

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        url: resolveUrl(tool.slug),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        description: tool.seoDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Home', item: resolveUrl('/')},
          {'@type': 'ListItem', position: 2, name: category.name, item: resolveUrl(category.slug)},
          {'@type': 'ListItem', position: 3, name: tool.name, item: resolveUrl(tool.slug)},
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {'@type': 'Answer', text: f.answer},
        })),
      },
    ];
  }, [tool, category]);

  return (
    <>
      <SeoHead
        title={tool.seoTitle}
        description={tool.seoDescription}
        canonicalPath={tool.slug}
        structuredData={structuredData}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <Breadcrumbs
          items={[
            {label: 'Home', to: '/'},
            {label: category.name, to: category.slug},
            {label: tool.name},
          ]}
        />

        {/* Tool Header */}
        <div className="mb-8 max-w-3xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#C2522B] dark:text-[#E06D4B]">
            <span>{category.name}</span>
            <span aria-hidden="true">·</span>
            <span>Free Online Utility</span>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5EFE6] text-[#C2522B] dark:bg-[#2A2420] dark:text-[#E06D4B]">
              <ToolIcon name={tool.iconName} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
              {tool.name}
            </h1>
          </div>
          <p className="mt-3 text-base leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
            {tool.shortDesc}
          </p>
        </div>

        {/* Main Workspace + Desktop Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section
              aria-label={`${tool.name} interactive tool`}
              className="rounded-2xl border border-[#E7E2D8] bg-white p-5 shadow-xs sm:p-6 dark:border-[#2E2A26] dark:bg-[#1D1B19]"
            >
              <ToolWorkspace toolId={tool.id} />
            </section>

            {/* In-Content AdSense Banner well separated from interactive controls */}
            <AdSlot slotId={ADSENSE_CONFIG.slots.toolBottomBanner} format="in-article" />

            {/* SEO Editorial Guide */}
            <article className="space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  About {tool.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#57534E] sm:text-base dark:text-[#B8B2A6]">
                  {tool.intro}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  How to Use {tool.name}
                </h2>
                <ol className="mt-3 space-y-2.5">
                  {tool.instructions.map((step, idx) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]"
                    >
                      <span className="font-mono tabular-nums mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#F5EFE6] text-xs font-bold text-[#A6411E] dark:bg-[#2A2420] dark:text-[#E06D4B]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-5 dark:border-[#2E2A26] dark:bg-[#141312]">
                <h2 className="font-display text-lg font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  Example Usage: {tool.example.title}
                </h2>
                <div className="mt-3 space-y-2.5 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-[#78716C] dark:text-[#9E978B]">
                      Sample Input
                    </span>
                    <p className="mt-0.5 rounded-lg border border-[#E7E2D8] bg-white p-3 font-mono text-xs text-[#1C1B19] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#F5F2EB]">
                      {tool.example.input}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#78716C] dark:text-[#9E978B]">
                      Result Output
                    </span>
                    <p className="mt-0.5 rounded-lg border border-[#E2B8A8] bg-[#FAF0EB] p-3 font-mono text-xs text-[#A6411E] dark:border-[#5C3123] dark:bg-[#2A1B16] dark:text-[#E06D4B]">
                      {tool.example.output}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  Key Benefits &amp; Features
                </h2>
                <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {tool.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 rounded-xl border border-[#E7E2D8] bg-white p-3.5 text-sm text-[#57534E] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  Frequently Asked Questions
                </h2>
                <div className="mt-3 divide-y divide-[#E7E2D8] rounded-xl border border-[#E7E2D8] bg-white dark:divide-[#2E2A26] dark:border-[#2E2A26] dark:bg-[#1D1B19]">
                  {tool.faqs.map((faq) => (
                    <details key={faq.question} className="group p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                        <span>{faq.question}</span>
                        <ChevronDown
                          className="h-4 w-4 shrink-0 text-[#78716C] transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </article>
          </div>

          {/* Desktop Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <AdSlot slotId={ADSENSE_CONFIG.slots.toolSidebarRect} format="rectangle" />

              <div className="rounded-xl border border-[#E7E2D8] bg-white p-5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
                <h3 className="font-display text-sm font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  More in {category.name}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedTools.map((rel) => (
                    <li key={rel.id}>
                      <Link
                        to={rel.slug}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[#57534E] transition-colors hover:bg-[#FAF8F4] hover:text-[#C2522B] dark:text-[#B8B2A6] dark:hover:bg-[#25221F] dark:hover:text-[#E06D4B]"
                      >
                        <ToolIcon
                          name={rel.iconName}
                          className="h-4 w-4 text-[#C2522B] dark:text-[#E06D4B]"
                        />
                        <span className="truncate font-medium">{rel.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-[#E7E2D8] pt-3 dark:border-[#2E2A26]">
                  <Link
                    to={category.slug}
                    className="text-xs font-semibold text-[#C2522B] hover:underline dark:text-[#E06D4B]"
                  >
                    Browse all {category.name} →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Tools Bottom Grid */}
        {relatedTools.length > 0 && (
          <section className="mt-14 border-t border-[#E7E2D8] pt-10 dark:border-[#2E2A26]">
            <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              Related Tools
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((rel) => (
                <ToolCard key={rel.id} tool={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
