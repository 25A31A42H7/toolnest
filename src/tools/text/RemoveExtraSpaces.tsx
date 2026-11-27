import {Check, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {cleanExtraSpaces} from '../../utils/toolCalculations';

export default function RemoveExtraSpaces() {
  const [input, setInput] = useState('');
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);
  const [convertTabs, setConvertTabs] = useState(true);

  const {output, removedChars} = useMemo(
    () =>
      cleanExtraSpaces(input, {
        collapseSpaces,
        trimLines,
        removeBlankLines,
        convertTabs,
      }),
    [input, collapseSpaces, trimLines, removeBlankLines, convertTabs]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 text-sm dark:border-[#2E2A26] dark:bg-[#141312]">
        <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
          <input
            type="checkbox"
            checked={collapseSpaces}
            onChange={(e) => setCollapseSpaces(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Collapse multiple spaces</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Trim start &amp; end of lines</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
          <input
            type="checkbox"
            checked={convertTabs}
            onChange={(e) => setConvertTabs(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Replace tabs &amp; NBSP</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B19] dark:text-[#F5F2EB]">
          <input
            type="checkbox"
            checked={removeBlankLines}
            onChange={(e) => setRemoveBlankLines(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Remove blank lines</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="space-input" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Original Text
            </label>
            <button
              type="button"
              onClick={() =>
                setInput('  This   sentence   came   from   a   PDF.\n\n\n   It   has   extra    tabs\tand   spaces.  ')
              }
              className="text-xs font-medium text-[#C2522B] hover:underline dark:text-[#E06D4B]"
            >
              Load Sample
            </button>
          </div>
          <textarea
            id="space-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={9}
            placeholder="Paste messy text with extra spaces or blank lines..."
            className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="space-output" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Cleaned Output
            </label>
            <span className="font-mono tabular-nums text-xs text-emerald-700 dark:text-emerald-400">
              {removedChars} characters removed
            </span>
          </div>
          <textarea
            id="space-output"
            value={output}
            readOnly
            rows={9}
            placeholder="Your clean text appears here automatically..."
            className="w-full rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#1C1B19] focus:outline-none dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setInput(output)}
          disabled={!output || output === input}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A6411E] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Apply to Input
        </button>
        <CopyButton text={output} label="Copy Cleaned Text" />
        <button
          type="button"
          onClick={() => {
            setInput('');
            setCollapseSpaces(true);
            setTrimLines(true);
            setRemoveBlankLines(false);
            setConvertTabs(true);
          }}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
