import {lazy, Suspense} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {CATEGORIES} from './data/categories';
import {getToolBySlug} from './data/tools';
import HomePage from './pages/HomePage';
import {RouterProvider, useRouter} from './utils/router';
import {ThemeProvider} from './utils/theme';

const AllToolsPage = lazy(() => import('./pages/AllToolsPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[#EDE8DF] dark:bg-[#2E2A26]" />
      <div className="h-44 w-full animate-pulse rounded-2xl bg-[#F4F0E8] dark:bg-[#191715]" />
    </div>
  );
}

function PageView() {
  const {path} = useRouter();

  if (path === '/') {
    return <HomePage />;
  }
  if (path === '/tools') {
    return <AllToolsPage />;
  }
  if (path === '/about') {
    return <AboutPage />;
  }
  if (path === '/contact') {
    return <ContactPage />;
  }
  if (path === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }
  if (path === '/terms-and-conditions') {
    return <TermsPage />;
  }
  if (path === '/disclaimer') {
    return <DisclaimerPage />;
  }

  const matchedCategory = CATEGORIES.find((c) => c.slug === path);
  if (matchedCategory) {
    return <CategoryPage category={matchedCategory} />;
  }

  const matchedTool = getToolBySlug(path);
  if (matchedTool) {
    return <ToolPage tool={matchedTool} />;
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#1C1B19] dark:bg-[#141312] dark:text-[#F5F2EB]">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageSkeleton />}>
              <PageView />
            </Suspense>
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}
