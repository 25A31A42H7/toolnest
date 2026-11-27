import {renderToString} from 'react-dom/server';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {CATEGORIES, getCategoryById} from './data/categories';
import {TOOLS, getToolBySlug} from './data/tools';
import AboutPage from './pages/AboutPage';
import AllToolsPage from './pages/AllToolsPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import DisclaimerPage from './pages/DisclaimerPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ToolPage from './pages/ToolPage';
import {RouterProvider} from './utils/router';
import {ThemeProvider} from './utils/theme';

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  priority: string;
  changefreq: string;
  getStructuredData?: (origin: string) => Array<Record<string, unknown>> | Record<string, unknown>;
}

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

export const PRERENDER_ROUTES: PrerenderRoute[] = [
  {
    path: '/',
    title: 'ToolNest – Free Online Tools for Everyone',
    description:
      'Powerful, simple, and free browser-based online tools for text editing, student calculators, YouTube creators, everyday math, and image optimization.',
    priority: '1.0',
    changefreq: 'weekly',
    getStructuredData: (origin: string) => {
      const siteSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ToolNest',
        description:
          'Free online tools for text formatting, student GPA and attendance calculation, YouTube creators, everyday math, and browser-based image optimization.',
      };
      if (origin) siteSchema.url = origin;
      return [
        siteSchema,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {'@type': 'Answer', text: f.answer},
          })),
        },
      ];
    },
  },
  {
    path: '/tools',
    title: 'All Free Online Tools (28 Utilities) | ToolNest',
    description:
      'Browse all 28 free online browser tools across Text, Student, YouTube, Everyday Calculators, and Image utilities.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  ...CATEGORIES.map((cat) => ({
    path: cat.slug,
    title: cat.seoTitle,
    description: cat.seoDescription,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...TOOLS.map((tool) => ({
    path: tool.slug,
    title: tool.seoTitle,
    description: tool.seoDescription,
    priority: tool.popular ? '0.9' : '0.8',
    changefreq: 'monthly',
    getStructuredData: (origin: string) => {
      const cat = getCategoryById(tool.category);
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
          offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {'@type': 'ListItem', position: 1, name: 'Home', item: resolveUrl('/')},
            {'@type': 'ListItem', position: 2, name: cat.name, item: resolveUrl(cat.slug)},
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
    },
  })),
  {
    path: '/about',
    title: 'About Us – ToolNest Free Online Tools',
    description:
      "Learn about ToolNest's mission to provide fast, private, and free browser-based utilities for students, writers, creators, and global users.",
    priority: '0.5',
    changefreq: 'yearly',
  },
  {
    path: '/contact',
    title: 'Contact Us – ToolNest Free Online Tools',
    description:
      'Contact ToolNest to report a bug, suggest a new online calculator or text tool, or ask a question about privacy and advertising.',
    priority: '0.5',
    changefreq: 'yearly',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy – ToolNest Free Online Tools',
    description:
      "Read ToolNest's Privacy Policy covering local browser processing, cookies, Google AdSense advertising disclosures, and GDPR/CCPA rights.",
    priority: '0.4',
    changefreq: 'yearly',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions – ToolNest Free Online Tools',
    description:
      'Read the Terms and Conditions governing acceptable use, intellectual property, and service availability for ToolNest.',
    priority: '0.4',
    changefreq: 'yearly',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer – ToolNest Free Online Tools',
    description:
      'Important informational disclaimers regarding ToolNest financial, academic GPA, BMI health, and YouTube revenue estimation calculators.',
    priority: '0.4',
    changefreq: 'yearly',
  },
];

function SyncPageView({path}: {path: string}) {
  if (path === '/') return <HomePage />;
  if (path === '/tools') return <AllToolsPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/privacy-policy') return <PrivacyPolicyPage />;
  if (path === '/terms-and-conditions') return <TermsPage />;
  if (path === '/disclaimer') return <DisclaimerPage />;

  const matchedCategory = CATEGORIES.find((c) => c.slug === path);
  if (matchedCategory) return <CategoryPage category={matchedCategory} />;

  const matchedTool = getToolBySlug(path);
  if (matchedTool) return <ToolPage tool={matchedTool} />;

  return <NotFoundPage />;
}

export function render(url: string): string {
  return renderToString(
    <ThemeProvider>
      <RouterProvider initialPath={url}>
        <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#1C1B19] dark:bg-[#141312] dark:text-[#F5F2EB]">
          <Header />
          <main className="flex-1">
            <SyncPageView path={url} />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}
