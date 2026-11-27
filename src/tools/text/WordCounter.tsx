import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {analyzeWordText} from '../../utils/toolCalculations';

const SAMPLE_TEXT = `ToolNest makes everyday writing, studying, and web publishing faster. Whether you are preparing a 1,500-word university essay, polishing a blog post for search engines, or trimming a presentation script, keeping track of exact word counts and reading time helps keep your message clear and concise.`;

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => analyzeWordText(text), [text]);

  const formatDuration = (secs: number) => {
    if (secs === 0) return '0 sec';
    if (secs < 60) return `${secs} sec`;
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return rem > 0 ? `${mins} min ${rem} sec` : `${mins} min`;
  };

  return (
    <div className="space-y-6">
      {/* Live Metric Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          {label: 'Words', value: stats.wordCount},
          {label: 'Characters', value: stats.charCount},
          {label: 'No Spaces', value: stats.charNoSpaces},
          {label: 'Sentences', value: stats.sentences},
          {label: 'Paragraphs', value: stats.paragraphs},
          {label: 'Lines', value: stats.lines},
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

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#57534E] dark:text-[#B8B2A6]">
          <span>
            Reading time:{' '}
            <strong className="text-[#1C1B19] dark:text-[#F5F2EB]">
              {formatDuration(stats.readSeconds)}
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Speaking time:{' '}
            <strong className="text-[#1C1B19] dark:text-[#F5F2EB]">
              {formatDuration(stats.speakSeconds)}
            </strong>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setText(SAMPLE_TEXT)}
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
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="word-counter-input" className="sr-only">
          Text to count
        </label>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Start typing or paste your essay, article, or notes here..."
          className="w-full rounded-xl border border-[#D6CFC2] bg-white p-4 text-base leading-relaxed text-[#1C1B19] placeholder:text-[#8C857B] focus:border-[#C2522B] focus:outline-none focus:ring-2 focus:ring-[#C2522B]/20 dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB] dark:placeholder:text-[#78716C]"
        />
      </div>

      {/* Keyword Density */}
      {stats.topKeywords.length > 0 && (
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <h3 className="font-display text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
            Top Keyword Density
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {stats.topKeywords.map((kw) => (
              <div
                key={kw.word}
                className="flex items-center justify-between rounded-lg border border-[#E7E2D8] bg-white px-3 py-2 text-xs dark:border-[#2E2A26] dark:bg-[#1D1B19]"
              >
                <span className="truncate font-medium text-[#1C1B19] dark:text-[#F5F2EB]">
                  {kw.word}
                </span>
                <span className="font-mono tabular-nums ml-2 text-[#78716C] dark:text-[#9E978B]">
                  {kw.count} ({kw.density}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
