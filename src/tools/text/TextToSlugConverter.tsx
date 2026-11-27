import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {makeSlug} from '../../utils/toolCalculations';

export default function TextToSlugConverter() {
  const [input, setInput] = useState('10 Best Ways to Improve Your Study Habits in 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [stripStopWords, setStripStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState('0');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    const limit = Math.max(0, parseInt(maxLength, 10) || 0);
    return input
      .split('\n')
      .map((line) => (line.trim() ? makeSlug(line, separator, stripStopWords, limit) : ''))
      .filter(Boolean)
      .join('\n');
  }, [input, separator, stripStopWords, maxLength]);

  const hasNonAlnumWarning = input.trim().length > 0 && output.length === 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 text-sm dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">Separator:</span>
          <div className="inline-flex rounded-lg border border-[#E7E2D8] bg-white p-0.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
            <button
              type="button"
              onClick={() => setSeparator('-')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                separator === '-'
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              Hyphen (-)
            </button>
            <button
              type="button"
              onClick={() => setSeparator('_')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                separator === '_'
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              Underscore (_)
            </button>
          </div>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 text-xs sm:text-sm text-[#1C1B19] dark:text-[#F5F2EB]">
          <input
            type="checkbox"
            checked={stripStopWords}
            onChange={(e) => setStripStopWords(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Remove stop words (a, the, in, of)</span>
        </label>

        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="slug-max" className="font-medium text-[#57534E] dark:text-[#B8B2A6]">
            Max length:
          </label>
          <select
            id="slug-max"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            className="h-9 rounded-lg border border-[#D6CFC2] bg-white px-2.5 text-xs font-medium text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          >
            <option value="0">No limit</option>
            <option value="50">50 chars</option>
            <option value="65">65 chars</option>
            <option value="80">80 chars</option>
          </select>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="slug-input" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Article Title or Headings (one per line for batch)
          </label>
          <button
            type="button"
            onClick={() => {
              setInput('');
              setStripStopWords(false);
              setMaxLength('0');
            }}
            disabled={!input}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#78716C] hover:text-[#1C1B19] disabled:opacity-40 dark:text-[#9E978B]"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Clear
          </button>
        </div>
        <textarea
          id="slug-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Enter blog titles or phrases..."
          className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
        />
      </div>

      {hasNonAlnumWarning && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs font-medium text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
          Enter letters or numbers to generate a valid URL slug.
        </div>
      )}

      <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Generated SEO URL Slug
          </span>
          <CopyButton text={output} label="Copy Slug" />
        </div>
        <pre className="font-mono overflow-x-auto whitespace-pre-wrap break-all rounded-lg border border-[#E7E2D8] bg-white p-3 text-sm text-[#C2522B] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#E06D4B]">
          {output || 'your-generated-slug-will-appear-here'}
        </pre>
        {output && (
          <p className="mt-2 text-xs text-[#78716C] dark:text-[#9E978B]">
            Preview path: /blog/{output.split('\n')[0]}
          </p>
        )}
      </div>
    </div>
  );
}
