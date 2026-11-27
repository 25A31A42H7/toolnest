import {AdSlot} from '../components/AdSlot';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';
import {ToolCard} from '../components/ToolCard';
import {ADSENSE_CONFIG} from '../config/adsense';
import {CATEGORIES, CategoryInfo} from '../data/categories';
import {getToolsByCategory} from '../data/tools';
import {Link} from '../utils/router';

export default function CategoryPage({category}: {category: CategoryInfo}) {
  const tools = getToolsByCategory(category.id);

  return (
    <>
      <SeoHead
        title={category.seoTitle}
        description={category.seoDescription}
        canonicalPath={category.slug}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: category.name}]} />

        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
            {category.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
            {category.description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-10">
          <AdSlot slotId={ADSENSE_CONFIG.slots.homeTopBanner} format="leaderboard" />
        </div>

        <section className="mt-12 border-t border-[#E7E2D8] pt-8 dark:border-[#2E2A26]">
          <h2 className="font-display text-lg font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            Explore Other Categories
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
              <Link
                key={c.id}
                to={c.slug}
                className="min-h-10 rounded-lg border border-[#E7E2D8] bg-white px-4 py-2 text-sm font-medium text-[#57534E] transition-colors hover:border-[#C2522B]/50 hover:text-[#C2522B] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6] dark:hover:text-[#E06D4B]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
