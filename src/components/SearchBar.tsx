import {ArrowRight, Search, X} from 'lucide-react';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CATEGORIES, CategoryId, getCategoryById} from '../data/categories';
import {TOOLS, ToolDefinition} from '../data/tools';
import {useRouter} from '../utils/router';
import {ToolIcon} from './ToolIcon';

interface SearchBarProps {
  placeholder?: string;
  showCategoryFilter?: boolean;
  onCategoryChange?: (cat: CategoryId | 'all') => void;
  selectedCategory?: CategoryId | 'all';
}

export function SearchBar({
  placeholder = 'Search 28 free tools (e.g., Word Counter, CGPA, Image Compressor)...',
  showCategoryFilter = true,
  onCategoryChange,
  selectedCategory = 'all',
}: SearchBarProps) {
  const {navigate} = useRouter();
  const [query, setQuery] = useState('');
  const [localCategory, setLocalCategory] = useState<CategoryId | 'all'>(selectedCategory);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const activeCategory = onCategoryChange ? selectedCategory : localCategory;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const results = useMemo<ToolDefinition[]>(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const catMatch = activeCategory === 'all' || tool.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        getCategoryById(tool.category).name.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const suggestions = useMemo(() => results.slice(0, 8), [results]);

  const selectTool = (slug: string) => {
    setOpen(false);
    setQuery('');
    navigate(slug);
  };

  const handleCategoryClick = (cat: CategoryId | 'all') => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setLocalCategory(cat);
    }
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectTool(suggestions[activeIndex].slug);
      } else if (suggestions.length > 0) {
        selectTool(suggestions[0].slug);
      }
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-3xl text-left">
      {/* Category Filter Tabs */}
      {showCategoryFilter && (
        <div
          role="tablist"
          aria-label="Filter search by category"
          className="mb-3 flex flex-wrap items-center justify-center gap-1.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => handleCategoryClick('all')}
            className={`min-h-10 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#C2522B] text-white'
                : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
            }`}
          >
            All Tools
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`min-h-10 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#C2522B] text-white'
                  : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716C]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search tools"
          aria-expanded={open}
          aria-autocomplete="list"
          className="h-14 w-full rounded-xl border border-[#D6CFC2] bg-white pl-12 pr-12 text-base text-[#1C1B19] transition-colors placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none focus:ring-2 focus:ring-[#C2522B]/20 dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB] dark:placeholder:text-[#8C857B] dark:focus:border-[#E06D4B]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(true);
              setActiveIndex(-1);
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#78716C] hover:bg-[#F4F0E8] hover:text-[#1C1B19] dark:hover:bg-[#2E2A26] dark:hover:text-[#F5F2EB]"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Instant Search Suggestions Dropdown */}
        {open && (query.trim().length > 0 || activeCategory !== 'all') && (
          <div
            role="listbox"
            aria-label="Tool suggestions"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-96 overflow-y-auto rounded-xl border border-[#E7E2D8] bg-white p-2 shadow-lg dark:border-[#2E2A26] dark:bg-[#1D1B19]"
          >
            {suggestions.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-[#57534E] dark:text-[#B8B2A6]">
                No tools found matching "{query}". Try searching for "word", "gpa", "youtube", "loan", or "image".
              </div>
            ) : (
              suggestions.map((tool, index) => {
                const cat = getCategoryById(tool.category);
                const isActive = index === activeIndex;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectTool(tool.slug)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-[#F5EFE6] dark:bg-[#2A2420]'
                        : 'hover:bg-[#FAF8F4] dark:hover:bg-[#25221F]'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EFE6] text-[#C2522B] dark:bg-[#2A2420] dark:text-[#E06D4B]">
                        <ToolIcon name={tool.iconName} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                          {tool.name}
                        </div>
                        <div className="truncate text-xs text-[#57534E] dark:text-[#B8B2A6]">
                          {cat.name} · {tool.shortDesc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#8C857B]" aria-hidden="true" />
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
