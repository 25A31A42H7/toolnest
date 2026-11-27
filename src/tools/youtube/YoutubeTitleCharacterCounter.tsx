import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {analyzeTitleLength} from '../../utils/toolCalculations';

const DEFAULT_TITLE = 'How to Build a Fast Portfolio Website in 20 Minutes';

export default function YoutubeTitleCharacterCounter() {
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const analysis = useMemo(() => analyzeTitleLength(title), [title]);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="title-len-input"
            className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Enter YouTube Video Title or SEO Page Title
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={title} label="Copy Title" />
            <button
              type="button"
              onClick={() => setTitle('')}
              disabled={!title}
              className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 disabled:opacity-40 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Clear
            </button>
          </div>
        </div>
        <input
          id="title-len-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your headline to check mobile and desktop truncation..."
          className="h-12 w-full rounded-xl border border-[#D6CFC2] bg-white px-4 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
        />
      </div>

      {analysis.ytMaxExceeded && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          Title exceeds YouTube Studio’s 100-character maximum ({analysis.chars} / 100). Trim at least{' '}
          {analysis.chars - 100} character{analysis.chars - 100 === 1 ? '' : 's'} before uploading.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Characters</div>
          <div
            className={`font-display tabular-nums mt-1 text-2xl font-bold ${
              analysis.ytMaxExceeded
                ? 'text-rose-700 dark:text-rose-400'
                : 'text-[#1C1B19] dark:text-[#F5F2EB]'
            }`}
          >
            {analysis.chars} <span className="text-xs font-normal text-[#78716C]">/ 100 max</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Est. Pixel Width</div>
          <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {analysis.pixels}px
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs text-[#78716C] dark:text-[#9E978B]">YouTube Mobile</div>
          <div
            className={`mt-1 text-sm font-semibold ${
              analysis.mobileTruncated
                ? 'text-amber-700 dark:text-amber-400'
                : 'text-emerald-700 dark:text-emerald-400'
            }`}
          >
            {analysis.mobileTruncated ? 'Truncates (~55)' : 'Fits Cleanly'}
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Google Search SERP</div>
          <div
            className={`mt-1 text-sm font-semibold ${
              analysis.serpTruncated
                ? 'text-amber-700 dark:text-amber-400'
                : 'text-emerald-700 dark:text-emerald-400'
            }`}
          >
            {analysis.serpTruncated ? 'May Clip (~580px)' : 'Fits Cleanly'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#E7E2D8] bg-white p-4 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
          <div className="mb-2 text-xs font-semibold text-[#78716C] dark:text-[#9E978B]">
            YouTube Mobile Feed Preview (~55 chars)
          </div>
          <div className="rounded-lg bg-[#FAF8F4] p-3 dark:bg-[#141312]">
            <div className="text-sm font-semibold leading-snug text-[#1C1B19] dark:text-[#F5F2EB]">
              {analysis.mobilePreview || 'Your title preview'}
            </div>
            <div className="mt-1 text-xs text-[#78716C] dark:text-[#9E978B]">
              Channel Name · 18K views · 2 hours ago
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E7E2D8] bg-white p-4 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
          <div className="mb-2 text-xs font-semibold text-[#78716C] dark:text-[#9E978B]">
            Google Search Result Preview (~60 chars)
          </div>
          <div className="rounded-lg bg-[#FAF8F4] p-3 dark:bg-[#141312]">
            <div className="text-xs text-[#78716C] dark:text-[#9E978B]">https://youtube.com › watch</div>
            <div className="mt-0.5 text-base font-medium text-[#C2522B] dark:text-[#E06D4B]">
              {analysis.serpPreview || 'Your title preview'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
