import {ArrowUpRight} from 'lucide-react';
import {getCategoryById} from '../data/categories';
import {ToolDefinition} from '../data/tools';
import {Link} from '../utils/router';
import {ToolIcon} from './ToolIcon';

export function ToolCard({tool}: {tool: ToolDefinition}) {
  const category = getCategoryById(tool.category);

  return (
    <Link
      to={tool.slug}
      className="group flex flex-col justify-between rounded-xl border border-[#E7E2D8] bg-white p-5 transition-colors duration-150 hover:border-[#C2522B] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:hover:border-[#E06D4B]"
    >
      <div>
        <div className="mb-3.5 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5EFE6] text-[#C2522B] transition-colors group-hover:bg-[#C2522B] group-hover:text-white dark:bg-[#2A2420] dark:text-[#E06D4B] dark:group-hover:bg-[#C2522B] dark:group-hover:text-white">
            <ToolIcon name={tool.iconName} className="h-5 w-5" />
          </div>
          <ArrowUpRight
            className="h-4 w-4 text-[#8C857B] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C2522B] dark:text-[#8C857B] dark:group-hover:text-[#E06D4B]"
            aria-hidden="true"
          />
        </div>
        <h3 className="font-display text-base font-semibold text-[#1C1B19] transition-colors group-hover:text-[#C2522B] dark:text-[#F5F2EB] dark:group-hover:text-[#E06D4B]">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
          {tool.shortDesc}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
        <span>{category.name}</span>
        <span aria-hidden="true">·</span>
        <span>Browser utility</span>
      </div>
    </Link>
  );
}
