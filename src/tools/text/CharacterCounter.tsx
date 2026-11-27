import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {analyzeCharacters} from '../../utils/toolCalculations';

const PLATFORM_LIMITS = [
  {name: 'Google Meta Title', limit: 60},
  {name: 'Google Meta Description', limit: 160},
  {name: 'X / Twitter Post', limit: 280},
  {name: 'Instagram Caption', limit: 2200},
  {name: 'LinkedIn Post', limit: 3000},
];

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const metrics = useMemo(() => analyzeCharacters(text), [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          {label: 'With Spaces', value: metrics.withSpaces},
          {label: 'Without Spaces', value: metrics.withoutSpaces},
          {label: 'Words', value: metrics.words},
          {label: 'Lines', value: metrics.lines},
          {label: 'UTF-8 Bytes', value: metrics.utf8Bytes},
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] px-4 py-3 dark:border-[#2E2A26] dark:bg-[#141312]"
          >
            <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
              {item.label}
            </div>
            <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() =>
            setText('Calculate your semester GPA and cumulative CGPA quickly with our free online calculator.')
          }
          className="min-h-10 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          Load Sample
        </button>
        <CopyButton text={text} label="Copy Text" />
        <button
          type="button"
          onClick={() => setText('')}
          disabled={!text}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        aria-label="Text input for character count"
        placeholder="Paste your SEO title, meta description, or social post..."
        className="w-full rounded-xl border border-[#D6CFC2] bg-white p-4 text-base leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none focus:ring-2 focus:ring-[#C2522B]/20 dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
      />

      {/* Platform Character Limits */}
      <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
        <h3 className="font-display mb-3 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
          Platform Character Limits
        </h3>
        <div className="space-y-3">
          {PLATFORM_LIMITS.map((p) => {
            const pct = Math.min(100, (metrics.withSpaces / p.limit) * 100);
            const over = metrics.withSpaces > p.limit;
            return (
              <div key={p.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#44403C] dark:text-[#D6CFC2]">{p.name}</span>
                  <span
                    className={`font-mono tabular-nums ${
                      over
                        ? 'font-semibold text-rose-700 dark:text-rose-400'
                        : 'text-[#78716C] dark:text-[#9E978B]'
                    }`}
                  >
                    {metrics.withSpaces} / {p.limit}{' '}
                    {over ? `(${metrics.withSpaces - p.limit} over limit)` : ''}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E7E2D8] dark:bg-[#2E2A26]">
                  <div
                    className={`h-full transition-all duration-150 ${
                      over ? 'bg-rose-600' : pct > 85 ? 'bg-amber-600' : 'bg-[#C2522B]'
                    }`}
                    style={{width: `${pct}%`}}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
