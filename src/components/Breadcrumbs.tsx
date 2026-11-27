import {ChevronRight} from 'lucide-react';
import {Link} from '../utils/router';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({items}: {items: BreadcrumbItem[]}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#78716C] dark:text-[#9E978B]">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#A8A095]" aria-hidden="true" />}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="transition-colors hover:text-[#C2522B] dark:hover:text-[#E06D4B]"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-[#1C1B19] dark:text-[#F5F2EB]' : ''}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
