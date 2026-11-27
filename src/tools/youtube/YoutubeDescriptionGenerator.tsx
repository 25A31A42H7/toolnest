import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {CopyButton} from '../../components/CopyButton';
import {buildYoutubeDescription} from '../../utils/toolCalculations';

const DEFAULT_HOOK =
  'Learn how to build a fast, distraction-free Notion productivity workspace in under 15 minutes with this step-by-step walkthrough.';
const DEFAULT_POINTS =
  '- Clean daily task inbox setup\n- Weekly planning template workflow\n- Keyboard shortcuts that save hours';
const DEFAULT_CHAPTERS =
  '00:00 Introduction\n01:30 Core Workspace Structure\n05:45 Task & Priority Views\n10:20 Automation Tips & Summary';
const DEFAULT_LINKS =
  'Template & Guide: https://example.com/notion-guide\nSubscribe for weekly tutorials!';
const DEFAULT_HASHTAGS = '#NotionTutorial #ProductivitySystem #WorkflowTips';

export default function YoutubeDescriptionGenerator() {
  const [hook, setHook] = useState(DEFAULT_HOOK);
  const [keyPoints, setKeyPoints] = useState(DEFAULT_POINTS);
  const [chapters, setChapters] = useState(DEFAULT_CHAPTERS);
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [hashtags, setHashtags] = useState(DEFAULT_HASHTAGS);

  const built = useMemo(
    () => buildYoutubeDescription({hook, keyPoints, chapters, links, hashtags}),
    [hook, keyPoints, chapters, links, hashtags]
  );

  const handleReset = () => {
    setHook(DEFAULT_HOOK);
    setKeyPoints(DEFAULT_POINTS);
    setChapters(DEFAULT_CHAPTERS);
    setLinks(DEFAULT_LINKS);
    setHashtags(DEFAULT_HASHTAGS);
  };

  const handleClear = () => {
    setHook('');
    setKeyPoints('');
    setChapters('');
    setLinks('');
    setHashtags('');
  };

  return (
    <div className="space-y-4">
      {built.exceedsLimit && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          Description exceeds YouTube’s 5,000-character limit ({built.charCount.toLocaleString()} / 5,000). Shorten one or more sections before publishing.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="desc-hook"
                className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Above-the-Fold Hook (First 150 chars visible)
              </label>
              <span
                className={`font-mono tabular-nums text-xs ${
                  !built.hookExceedsLimit
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {built.hookLen} / 150 chars
              </span>
            </div>
            <textarea
              id="desc-hook"
              rows={3}
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>

          <div>
            <label
              htmlFor="desc-points"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Key Takeaways / Bullet Points
            </label>
            <textarea
              id="desc-points"
              rows={3}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>

          <div>
            <label
              htmlFor="desc-chapters"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Video Chapters (Start with 00:00)
            </label>
            <textarea
              id="desc-chapters"
              rows={4}
              value={chapters}
              onChange={(e) => setChapters(e.target.value)}
              className="font-mono w-full rounded-xl border border-[#D6CFC2] bg-white p-3 text-xs text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>

          <div>
            <label
              htmlFor="desc-links"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Links &amp; Call to Action
            </label>
            <textarea
              id="desc-links"
              rows={2}
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>

          <div>
            <label
              htmlFor="desc-tags"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Hashtags (3–5 recommended)
            </label>
            <input
              id="desc-tags"
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="h-10 w-full rounded-xl border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Restore Example
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-10 items-center rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
            >
              Clear All Fields
            </button>
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                Formatted Description
              </h3>
              <span
                className={`font-mono tabular-nums text-xs ${
                  built.exceedsLimit
                    ? 'font-semibold text-rose-700 dark:text-rose-400'
                    : 'text-[#78716C] dark:text-[#9E978B]'
                }`}
              >
                {built.charCount.toLocaleString()} / 5,000 characters
              </span>
            </div>
            <CopyButton text={built.text} label="Copy Description" />
          </div>
          <textarea
            readOnly
            value={built.text}
            placeholder="Fill in one or more sections on the left to build your formatted YouTube description..."
            aria-label="Generated YouTube description"
            className="min-h-[380px] flex-1 resize-none rounded-xl border border-[#E7E2D8] bg-white p-4 text-sm leading-relaxed text-[#1C1B19] focus:outline-none dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          />
        </div>
      </div>
    </div>
  );
}
