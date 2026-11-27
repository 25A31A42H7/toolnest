import {Download, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {deduplicateLines, SortOrder} from '../../utils/toolCalculations';

export default function DuplicateLineRemover() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const result = useMemo(
    () =>
      deduplicateLines(input, {
        caseSensitive,
        trimLines,
        removeEmpty,
        sortOrder,
      }),
    [input, caseSensitive, trimLines, removeEmpty, sortOrder]
  );

  const handleDownload = () => {
    if (!result.output) return;
    const blob = new Blob([result.output], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unique-lines.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 text-sm dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
            />
            <span>Case-sensitive</span>
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
            />
            <span>Trim line spaces</span>
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
            />
            <span>Remove empty lines</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-xs font-medium text-[#57534E] dark:text-[#B8B2A6]">
            Sort:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="h-9 rounded-lg border border-[#D6CFC2] bg-white px-2.5 text-xs font-medium text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          >
            <option value="none">Keep Original Order</option>
            <option value="asc">Alphabetical (A–Z)</option>
            <option value="desc">Reverse (Z–A)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="dup-input" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Input List ({result.totalLines} lines)
            </label>
            <button
              type="button"
              onClick={() =>
                setInput('word counter\ncgpa calculator\nWord Counter\nbmi calculator\ncgpa calculator\nimage compressor')
              }
              className="text-xs font-medium text-[#C2522B] hover:underline dark:text-[#E06D4B]"
            >
              Load Sample
            </button>
          </div>
          <textarea
            id="dup-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste items, emails, keywords, or URLs (one per line)..."
            className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="dup-output" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Unique Lines ({result.uniqueLines})
            </label>
            <span className="font-mono tabular-nums text-xs text-[#C2522B] dark:text-[#E06D4B]">
              {result.duplicatesRemoved} duplicate{result.duplicatesRemoved === 1 ? '' : 's'} removed
              {result.emptyRemoved > 0 ? ` · ${result.emptyRemoved} blank` : ''}
            </span>
          </div>
          <textarea
            id="dup-output"
            value={result.output}
            readOnly
            rows={10}
            placeholder="Deduplicated lines appear here..."
            className="w-full rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#1C1B19] focus:outline-none dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <CopyButton text={result.output} label="Copy Unique Lines" />
        <button
          type="button"
          onClick={handleDownload}
          disabled={!result.output}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download TXT
        </button>
        <button
          type="button"
          onClick={() => setInput('')}
          disabled={!input}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>
    </div>
  );
}
