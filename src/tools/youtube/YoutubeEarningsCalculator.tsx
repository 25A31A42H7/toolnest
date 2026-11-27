import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateYoutubeEarnings, RPM_PRESETS} from '../../utils/toolCalculations';

export default function YoutubeEarningsCalculator() {
  const [dailyViewsStr, setDailyViewsStr] = useState('25000');
  const [presetId, setPresetId] = useState<string>('global-edu');
  const [rpmStr, setRpmStr] = useState('4.2');

  const earnings = useMemo(
    () => calculateYoutubeEarnings(dailyViewsStr, rpmStr),
    [dailyViewsStr, rpmStr]
  );

  const sliderVal = Math.min(500000, Math.max(0, Number(dailyViewsStr) || 0));

  const fmt = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val < 10 ? 2 : 0,
    }).format(val);

  const handleReset = () => {
    setDailyViewsStr('25000');
    setPresetId('global-edu');
    setRpmStr('4.2');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="yt-views"
              className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Daily Video Views
            </label>
            <span className="font-mono tabular-nums text-sm font-bold text-[#C2522B] dark:text-[#E06D4B]">
              {(earnings.valid ? earnings.views : 0).toLocaleString()} / day
            </span>
          </div>
          <input
            id="yt-views"
            type="number"
            min="0"
            step="500"
            value={dailyViewsStr}
            onChange={(e) => setDailyViewsStr(e.target.value)}
            className="font-mono tabular-nums mb-2.5 h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
          <input
            type="range"
            min="0"
            max="500000"
            step="1000"
            aria-label="Daily views slider"
            value={sliderVal}
            onChange={(e) => setDailyViewsStr(e.target.value)}
            className="w-full accent-[#C2522B]"
          />
        </div>

        <div>
          <label
            htmlFor="yt-preset"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Audience Region &amp; Niche Preset
          </label>
          <select
            id="yt-preset"
            value={presetId}
            onChange={(e) => {
              const nextId = e.target.value;
              setPresetId(nextId);
              const found = RPM_PRESETS.find((p) => p.id === nextId);
              if (found) setRpmStr(String(found.rpm));
            }}
            className="mb-2.5 h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          >
            {RPM_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
            <option value="custom">Custom RPM ($)</option>
          </select>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="yt-rpm"
                className="whitespace-nowrap text-xs text-[#78716C] dark:text-[#9E978B]"
              >
                Custom RPM ($ per 1K views):
              </label>
              <input
                id="yt-rpm"
                type="number"
                min="0"
                max="250"
                step="0.1"
                value={rpmStr}
                onChange={(e) => {
                  const val = e.target.value;
                  setRpmStr(val);
                  const matched = RPM_PRESETS.find((p) => String(p.rpm) === val);
                  setPresetId(matched ? matched.id : 'custom');
                }}
                className="font-mono tabular-nums h-9 w-28 rounded-lg border border-[#D6CFC2] bg-white px-2.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {!earnings.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {earnings.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
            <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
              Estimated Daily
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {fmt(earnings.daily)}
            </div>
          </div>
          <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
            <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
              Estimated Monthly (30d)
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {fmt(earnings.monthly)}
            </div>
            <div className="font-mono tabular-nums mt-1 text-xs text-[#57534E] dark:text-[#B8B2A6]">
              Range: {fmt(earnings.lowMonthly)} – {fmt(earnings.highMonthly)}
            </div>
          </div>
          <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
            <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
              Estimated Yearly (365d)
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {fmt(earnings.yearly)}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs leading-relaxed text-[#78716C] dark:text-[#9E978B]">
        Note: Estimates reflect creator AdSense revenue after YouTube’s standard platform revenue share based on RPM (Revenue Per Mille). Actual earnings vary by viewer geography, seasonality (Q4 vs Q1), ad-blocker rates, and video length.
      </p>
    </div>
  );
}
