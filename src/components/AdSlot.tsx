import {useEffect} from 'react';
import {ADSENSE_CONFIG} from '../config/adsense';

export type AdFormat = 'leaderboard' | 'rectangle' | 'in-article';

interface AdSlotProps {
  slotId: string;
  format?: AdFormat;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const FORMAT_META: Record<
  AdFormat,
  {containerClass: string; dimensionsLabel: string; adFormatAttr: string}
> = {
  leaderboard: {
    containerClass: 'min-h-[90px] w-full max-w-[728px] mx-auto',
    dimensionsLabel: '728 × 90 Leaderboard Ad Slot (Inactive until AdSense approval)',
    adFormatAttr: 'horizontal',
  },
  rectangle: {
    containerClass: 'min-h-[250px] w-full max-w-[336px] mx-auto',
    dimensionsLabel: '300 × 250 / 336 × 280 Ad Slot (Inactive until AdSense approval)',
    adFormatAttr: 'rectangle',
  },
  'in-article': {
    containerClass: 'min-h-[100px] w-full',
    dimensionsLabel: 'Responsive In-Content Ad Slot (Inactive until AdSense approval)',
    adFormatAttr: 'auto',
  },
};

export function AdSlot({
  slotId,
  format = 'in-article',
  label = 'Advertisement',
  className = '',
}: AdSlotProps) {
  const meta = FORMAT_META[format];
  const isConfigured =
    ADSENSE_CONFIG.enabled &&
    ADSENSE_CONFIG.publisherId.startsWith('ca-pub-') &&
    !ADSENSE_CONFIG.publisherId.includes('0000000000000000') &&
    Boolean(slotId) &&
    !/^[1-5]{10}$/.test(slotId);

  useEffect(() => {
    if (!isConfigured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore AdSense initialization warnings when script is blocked
    }
  }, [isConfigured, slotId]);

  if (isConfigured) {
    return (
      <aside aria-label={label} className={`my-6 ${meta.containerClass} ${className}`}>
        <div className="mb-1.5 text-center text-[11px] font-medium tracking-wide text-[#78716C] dark:text-[#9E978B]">
          {label}
        </div>
        <ins
          className="adsbygoogle block"
          style={{display: 'block'}}
          data-ad-client={ADSENSE_CONFIG.publisherId}
          data-ad-slot={slotId}
          data-ad-format={meta.adFormatAttr}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  return (
    <aside
      aria-label={`${label} container`}
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D6CFC2] bg-[#F4F0E8]/70 px-4 py-4 text-center dark:border-[#2E2A26] dark:bg-[#1A1816] ${meta.containerClass} ${className}`}
    >
      <span className="text-[11px] font-medium tracking-wide text-[#78716C] dark:text-[#9E978B]">
        {label}
      </span>
      <span className="mt-0.5 text-xs text-[#8C857B] dark:text-[#78716C]">
        {meta.dimensionsLabel}
      </span>
    </aside>
  );
}
