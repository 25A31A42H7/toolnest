import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {ReverseMode, reverseText} from '../../utils/toolCalculations';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ReverseMode>('chars');

  const output = useMemo(() => reverseText(input, mode), [input, mode]);

  const modes: Array<{id: ReverseMode; label: string}> = [
    {id: 'chars', label: 'Reverse All Characters'},
    {id: 'words', label: 'Reverse Word Order'},
    {id: 'each-word', label: 'Reverse Each Word'},
    {id: 'lines', label: 'Reverse Line Order'},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Reversal mode">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`min-h-10 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
              mode === m.id
                ? 'bg-[#C2522B] text-white'
                : 'border border-[#E7E2D8] bg-white text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="reverse-input" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Input Text
            </label>
            <button
              type="button"
              onClick={() => setInput('Build fast websites today')}
              className="text-xs font-medium text-[#C2522B] hover:underline dark:text-[#E06D4B]"
            >
              Load Sample
            </button>
          </div>
          <textarea
            id="reverse-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Enter text or multi-line list..."
            className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <label htmlFor="reverse-output" className="mb-2 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Reversed Output
          </label>
          <textarea
            id="reverse-output"
            value={output}
            readOnly
            rows={8}
            placeholder="Reversed result appears here..."
            className="w-full rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#1C1B19] focus:outline-none dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <CopyButton text={output} label="Copy Reversed Text" />
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
