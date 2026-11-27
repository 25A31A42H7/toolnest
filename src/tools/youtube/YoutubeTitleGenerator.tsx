import {RefreshCw, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {generateYoutubeTitles, type VideoStyle} from '../../utils/toolCalculations';

const DEFAULT_TOPIC = 'Notion Productivity System';
const DEFAULT_MODIFIER = '2026';

export default function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const [style, setStyle] = useState<VideoStyle>('all');
  const [modifier, setModifier] = useState(DEFAULT_MODIFIER);
  const [seed, setSeed] = useState(0);

  const result = useMemo(
    () => generateYoutubeTitles(topic, style, modifier, seed),
    [topic, style, modifier, seed]
  );

  const handleReset = () => {
    setTopic(DEFAULT_TOPIC);
    setModifier(DEFAULT_MODIFIER);
    setStyle('all');
    setSeed(0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label
            htmlFor="yt-topic"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Video Topic / Primary Keyword
          </label>
          <input
            id="yt-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Python Automation, Desk Setup, Budget Travel"
            className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label
            htmlFor="yt-mod"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Optional Year / Audience
          </label>
          <input
            id="yt-mod"
            type="text"
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
            placeholder="e.g., 2026 or Beginners"
            className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Title format style">
          {(
            [
              {id: 'all', label: 'All Formats'},
              {id: 'tutorial', label: 'Tutorial'},
              {id: 'listicle', label: 'Listicle'},
              {id: 'review', label: 'Review'},
              {id: 'comparison', label: 'Comparison'},
              {id: 'story', label: 'Story'},
            ] as Array<{id: VideoStyle; label: string}>
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={style === tab.id}
              onClick={() => setStyle(tab.id)}
              className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                style === tab.id
                  ? 'bg-[#C2522B] text-white'
                  : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            disabled={!result.valid}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 disabled:opacity-40 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Shuffle
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3 py-2 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      {!result.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 text-sm font-medium text-[#A6411E] dark:border-[#5C3123] dark:bg-[#2A1B16] dark:text-[#E06D4B]"
        >
          {result.error}
        </div>
      ) : (
        <div className="space-y-2.5">
          {result.titles.map((item, idx) => {
            const len = item.title.length;
            const ideal = len <= 60;
            return (
              <div
                key={`${idx}-${item.title}`}
                className="flex flex-col justify-between gap-3 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 sm:flex-row sm:items-center dark:border-[#2E2A26] dark:bg-[#141312]"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                    {item.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#78716C] dark:text-[#9E978B]">
                    <span>{item.angle}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-mono tabular-nums ${
                        ideal
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {len} chars {ideal ? '(Mobile safe)' : '(May trim on mobile)'}
                    </span>
                  </div>
                </div>
                <CopyButton
                  text={item.title}
                  label="Copy Title"
                  className="shrink-0 self-start sm:self-center"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
