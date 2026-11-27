import {Download, RotateCcw, Undo2} from 'lucide-react';
import {useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {splitWordsForCode, toSentenceCase, toTitleCase} from '../../utils/toolCalculations';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const applyTransform = (fn: (s: string) => string) => {
    if (!text) return;
    setHistory((prev) => [...prev.slice(-9), text]);
    setText(fn(text));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setText(prev);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const transforms: Array<{label: string; fn: (s: string) => string}> = [
    {label: 'UPPERCASE', fn: (s) => s.toUpperCase()},
    {label: 'lowercase', fn: (s) => s.toLowerCase()},
    {label: 'Title Case', fn: toTitleCase},
    {label: 'Sentence case', fn: toSentenceCase},
    {
      label: 'camelCase',
      fn: (s) =>
        s
          .split('\n')
          .map((line) =>
            splitWordsForCode(line)
              .map((word, i) =>
                i === 0
                  ? word.toLowerCase()
                  : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join('')
          )
          .join('\n'),
    },
    {
      label: 'PascalCase',
      fn: (s) =>
        s
          .split('\n')
          .map((line) =>
            splitWordsForCode(line)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('')
          )
          .join('\n'),
    },
    {
      label: 'snake_case',
      fn: (s) =>
        s
          .split('\n')
          .map((line) => splitWordsForCode(line).map((w) => w.toLowerCase()).join('_'))
          .join('\n'),
    },
    {
      label: 'kebab-case',
      fn: (s) =>
        s
          .split('\n')
          .map((line) => splitWordsForCode(line).map((w) => w.toLowerCase()).join('-'))
          .join('\n'),
    },
    {
      label: 'aLtErNaTiNg',
      fn: (s) =>
        Array.from(s)
          .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
          .join(''),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {transforms.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => applyTransform(t.fn)}
            disabled={!text}
            className="min-h-10 rounded-lg border border-[#E7E2D8] bg-[#FAF8F4] px-3.5 py-2 text-xs font-semibold text-[#1C1B19] transition-colors hover:border-[#C2522B] hover:bg-[#F5EFE6] hover:text-[#C2522B] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#F5F2EB] dark:hover:border-[#E06D4B] dark:hover:text-[#E06D4B]"
          >
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={9}
        aria-label="Text to convert case"
        placeholder="Type or paste text, then click any case button above..."
        className="w-full rounded-xl border border-[#D6CFC2] bg-white p-4 text-base leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none focus:ring-2 focus:ring-[#C2522B]/20 dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono tabular-nums text-xs text-[#78716C] dark:text-[#9E978B]">
          {text.length} characters · {text.trim() ? text.trim().split(/\s+/).length : 0} words
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setText('how to calculate cgpa from percentage in college')}
            className="min-h-10 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
          >
            Sample
          </button>
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
          >
            <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
            Undo
          </button>
          <CopyButton text={text} label="Copy Output" />
          <button
            type="button"
            onClick={handleDownload}
            disabled={!text}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download TXT
          </button>
          <button
            type="button"
            onClick={() => {
              setHistory([]);
              setText('');
            }}
            disabled={!text}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
