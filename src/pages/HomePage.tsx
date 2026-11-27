import {ArrowRight, ChevronDown, Globe, Lock, ShieldCheck, Zap} from 'lucide-react';
import {useMemo, useState} from 'react';
import {AdSlot} from '../components/AdSlot';
import {SearchBar} from '../components/SearchBar';
import {SeoHead} from '../components/SeoHead';
import {ToolCard} from '../components/ToolCard';
import {ADSENSE_CONFIG} from '../config/adsense';
import {getCanonicalOrigin} from '../config/site';
import {CATEGORIES, CategoryId} from '../data/categories';
import {TOOLS} from '../data/tools';
import {Link} from '../utils/router';

const HOME_FAQS = [
  {
    question: 'Are all tools on ToolNest completely free to use?',
    answer:
      'Yes. Every calculator, text formatter, YouTube utility, and image converter on ToolNest is 100% free with no paywalls, trial limits, or account sign-ups required.',
  },
  {
    question: 'Do I need to create an account or install software?',
    answer:
      'No registration or downloads are required. Every tool loads straight inside your web browser on desktop, tablet, or smartphone.',
  },
  {
    question: 'Are my documents and images uploaded to a server?',
    answer:
      'No. All text tools, student calculators, and HTML5 Canvas image tools run locally inside your browser tab, so your files never leave your device.',
  },
  {
    question: 'Which grading scales and currencies are supported?',
    answer:
      'ToolNest supports international standards across the USA, UK, Canada, Australia, and India—including 4.0 and 10.0 GPA/CGPA scales, metric and imperial BMI units, and USD, GBP, CAD, AUD, EUR, and INR currencies.',
  },
];

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');

  const popularTools = useMemo(() => TOOLS.filter((t) => t.popular).slice(0, 8), []);
  const recentTools = useMemo(() => TOOLS.filter((t) => t.recent), []);
  const categorizedTools = useMemo(
    () => (selectedCat === 'all' ? TOOLS : TOOLS.filter((t) => t.category === selectedCat)),
    [selectedCat]
  );

  const structuredData = useMemo(() => {
    const origin = getCanonicalOrigin();
    const websiteSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ToolNest',
      description:
        'Free online tools for text formatting, student GPA and attendance calculation, YouTube creators, everyday math, and browser-based image optimization.',
    };
    if (origin) {
      websiteSchema.url = origin;
    }

    return [
      websiteSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: HOME_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ];
  }, []);

  return (
    <>
      <SeoHead
        title="ToolNest – Free Online Tools for Everyone"
        description="Powerful, simple, and free browser-based online tools for text editing, student calculators, YouTube creators, everyday math, and image optimization."
        canonicalPath="/"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="border-b border-[#E7E2D8] bg-[#FAF8F4] py-14 sm:py-20 dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-xs font-semibold tracking-wide text-[#C2522B] dark:text-[#E06D4B]">
              28 Free Browser Utilities · Text · Student · YouTube · Calculators · Images
            </p>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[#1C1B19] [text-wrap:balance] sm:text-5xl lg:text-[54px] lg:leading-[1.08] dark:text-[#F5F2EB]">
              Free Online Tools for Everyone
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#57534E] sm:text-lg dark:text-[#B8B2A6]">
              Powerful, simple and free tools to make your everyday tasks easier.
            </p>

            <div className="mt-8 flex w-full justify-center">
              <SearchBar selectedCategory={selectedCat} onCategoryChange={setSelectedCat} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#78716C] dark:text-[#9E978B]">
              <span>Popular:</span>
              <Link
                to="/word-counter"
                className="font-medium text-[#1C1B19] hover:text-[#C2522B] dark:text-[#F5F2EB] dark:hover:text-[#E06D4B]"
              >
                Word Counter
              </Link>
              <Link
                to="/cgpa-calculator"
                className="font-medium text-[#1C1B19] hover:text-[#C2522B] dark:text-[#F5F2EB] dark:hover:text-[#E06D4B]"
              >
                CGPA Calculator
              </Link>
              <Link
                to="/attendance-calculator"
                className="font-medium text-[#1C1B19] hover:text-[#C2522B] dark:text-[#F5F2EB] dark:hover:text-[#E06D4B]"
              >
                Attendance Calculator
              </Link>
              <Link
                to="/image-compressor"
                className="font-medium text-[#1C1B19] hover:text-[#C2522B] dark:text-[#F5F2EB] dark:hover:text-[#E06D4B]"
              >
                Image Compressor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C1B19] sm:text-3xl dark:text-[#F5F2EB]">
              Popular Online Tools
            </h2>
            <p className="mt-1.5 text-sm text-[#57534E] dark:text-[#B8B2A6]">
              Most used utilities for students, writers, creators, and daily calculations.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C2522B] hover:text-[#A6411E] dark:text-[#E06D4B]"
          >
            View all {TOOLS.length} tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* AdSense Leaderboard Banner */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot slotId={ADSENSE_CONFIG.slots.homeTopBanner} format="leaderboard" />
      </div>

      {/* Browse by Category */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C1B19] sm:text-3xl dark:text-[#F5F2EB]">
            Tools Categorized by Functionality
          </h2>
          <p className="mt-1.5 text-sm text-[#57534E] dark:text-[#B8B2A6]">
            Filter by workflow or open any category archive for specialized tools.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-[#E7E2D8] pb-4 dark:border-[#2E2A26]">
          <button
            type="button"
            onClick={() => setSelectedCat('all')}
            className={`min-h-10 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              selectedCat === 'all'
                ? 'bg-[#C2522B] text-white'
                : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
            }`}
          >
            All Categories ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`min-h-10 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-[#C2522B] text-white'
                    : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorizedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Recently Added Tools */}
      <section className="border-y border-[#E7E2D8] bg-[#F4F0E8]/60 py-12 dark:border-[#2E2A26] dark:bg-[#191715]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C1B19] dark:text-[#F5F2EB]">
                Recently Added Tools
              </h2>
              <p className="mt-1.5 text-sm text-[#57534E] dark:text-[#B8B2A6]">
                Fresh browser utilities added to help with planning, list cleanup, and image conversion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ToolNest */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C1B19] sm:text-3xl dark:text-[#F5F2EB]">
            Why Choose ToolNest
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
            Designed for speed, clarity, and everyday privacy without bloated popups or paywalls.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: 'Instant Browser Speed',
              desc: 'Lightweight pages and live calculations update as you type without server round-trips.',
            },
            {
              icon: Lock,
              title: 'Privacy by Design',
              desc: 'Text drafts and image files are processed directly inside your browser—nothing is uploaded.',
            },
            {
              icon: ShieldCheck,
              title: 'Zero Sign-Up Friction',
              desc: 'Open any tool URL and start working immediately with no accounts, emails, or subscriptions.',
            },
            {
              icon: Globe,
              title: 'Built for International Users',
              desc: 'Supports 4.0 and 10.0 academic scales, Metric/Imperial units, and major global currencies.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-[#E7E2D8] bg-white p-5 dark:border-[#2E2A26] dark:bg-[#1D1B19]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5EFE6] text-[#C2522B] dark:bg-[#2A2420] dark:text-[#E06D4B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display mt-4 text-base font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <AdSlot slotId={ADSENSE_CONFIG.slots.homeMidBanner} format="in-article" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-4 sm:px-6">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-[#1C1B19] sm:text-3xl dark:text-[#F5F2EB]">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 divide-y divide-[#E7E2D8] rounded-xl border border-[#E7E2D8] bg-white dark:divide-[#2E2A26] dark:border-[#2E2A26] dark:bg-[#1D1B19]">
          {HOME_FAQS.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-[#78716C] transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
