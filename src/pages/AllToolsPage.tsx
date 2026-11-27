import {useState} from 'react';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SearchBar} from '../components/SearchBar';
import {SeoHead} from '../components/SeoHead';
import {ToolCard} from '../components/ToolCard';
import {CATEGORIES, CategoryId} from '../data/categories';
import {TOOLS} from '../data/tools';

export default function AllToolsPage() {
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');

  const visibleCategories =
    selectedCat === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === selectedCat);

  return (
    <>
      <SeoHead
        title="All Free Online Tools (28 Utilities) | ToolNest"
        description="Browse all 28 free online browser tools across Text, Student, YouTube, Everyday Calculators, and Image utilities."
        canonicalPath="/tools"
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'All Tools'}]} />

        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
            All Free Online Tools
          </h1>
          <p className="mt-2 text-base text-[#57534E] dark:text-[#B8B2A6]">
            Browse all {TOOLS.length} browser-based utilities organized by category.
          </p>
        </div>

        <div className="mt-6">
          <SearchBar selectedCategory={selectedCat} onCategoryChange={setSelectedCat} />
        </div>

        <div className="mt-10 space-y-12">
          {visibleCategories.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            return (
              <section key={cat.id}>
                <h2 className="font-display text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  {cat.name}
                </h2>
                <p className="mt-1 text-sm text-[#57534E] dark:text-[#B8B2A6]">{cat.description}</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {catTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
