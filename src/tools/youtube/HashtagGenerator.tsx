import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {generateHashtags, type SocialPlatform} from '../../utils/toolCalculations';

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('home workout');
  const [platform, setPlatform] = useState<SocialPlatform>('youtube');
  const [excluded, setExcluded] = useState<Set<string>>(new Set());

  const generated = useMemo(() => generateHashtags(topic, platform), [topic, platform]);

  const activeTags = useMemo(
    () => (generated.valid ? generated.tags.filter((tag) => !excluded.has(tag)) : []),
    [generated, excluded]
  );

  const toggleTag = (tag: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const hashString = activeTags.join(' ');
  const commaString = activeTags.map((t) => t.replace(/^#/, '')).join(', ');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ht-topic"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Topic or Niche Keyword
          </label>
          <input
            id="ht-topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setExcluded(new Set());
            }}
            placeholder="e.g., web development, travel vlog, vegan recipes"
            className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Target Platform
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {(
              [
                {id: 'youtube', label: 'YouTube'},
                {id: 'instagram', label: 'Instagram'},
                {id: 'tiktok', label: 'TikTok'},
                {id: 'linkedin', label: 'LinkedIn'},
              ] as Array<{id: SocialPlatform; label: string}>
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`h-11 rounded-xl text-xs font-semibold transition-colors ${
                  platform === p.id
                    ? 'bg-[#C2522B] text-white'
                    : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!generated.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 text-sm font-medium text-[#A6411E] dark:border-[#5C3123] dark:bg-[#2A1B16] dark:text-[#E06D4B]"
        >
          {generated.error}
        </div>
      ) : (
        <>
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#78716C] dark:text-[#9E978B]">
              <span>Click any hashtag to include or exclude it ({activeTags.length} selected)</span>
              <div className="flex items-center gap-3">
                {platform === 'youtube' && (
                  <span>Recommended for YouTube descriptions: 3–5 hashtags</span>
                )}
                {excluded.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setExcluded(new Set())}
                    className="inline-flex items-center gap-1 font-medium text-[#C2522B] hover:underline dark:text-[#E06D4B]"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Re-select all
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {generated.tags.map((tag) => {
                const isSelected = !excluded.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`min-h-9 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'border-[#E2B8A8] bg-[#FAF0EB] text-[#A6411E] dark:border-[#5C3123] dark:bg-[#2A1B16] dark:text-[#E06D4B]'
                        : 'border-[#E7E2D8] bg-[#FAF8F4] text-[#78716C] line-through opacity-60 dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#9E978B]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
                  Hashtag Format (#tag)
                </span>
                <CopyButton text={hashString} label="Copy Hashtags" />
              </div>
              <p className="font-mono break-words text-xs leading-relaxed text-[#1C1B19] dark:text-[#F5F2EB]">
                {hashString || 'Select at least one tag above.'}
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
                  YouTube Studio Tags (Comma-Separated)
                </span>
                <CopyButton text={commaString} label="Copy CSV Tags" />
              </div>
              <p className="font-mono break-words text-xs leading-relaxed text-[#1C1B19] dark:text-[#F5F2EB]">
                {commaString || 'Select at least one tag above.'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
