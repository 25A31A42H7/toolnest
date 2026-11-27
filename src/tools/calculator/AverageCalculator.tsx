import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateStatistics} from '../../utils/toolCalculations';

export default function AverageCalculator() {
  const [rawInput, setRawInput] = useState('78, 85, 92, 85, 90, 88');

  const stats = useMemo(() => calculateStatistics(rawInput), [rawInput]);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="avg-input"
            className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Enter Numbers (separated by commas, spaces, or new lines)
          </label>
          <button
            type="button"
            onClick={() => setRawInput('')}
            disabled={!rawInput}
            className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 disabled:opacity-40 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Clear
          </button>
        </div>
        <textarea
          id="avg-input"
          rows={4}
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="e.g., 12, 18, 24, 30, 30, 45"
          className="font-mono w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
        />
      </div>

      {stats.invalidTokens.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs font-medium text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
        >
          Ignored non-numeric entries: <span className="font-mono">{stats.invalidTokens.join(', ')}</span>
        </div>
      )}

      {!stats.valid ? (
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-6 text-center text-sm text-[#78716C] dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#9E978B]">
          Enter at least one valid number above to compute statistical averages.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
              <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
                Mean (Average)
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {Number(stats.mean.toFixed(4))}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Median</div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {Number(stats.median.toFixed(4))}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Mode</div>
              <div className="font-display tabular-nums mt-1 text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {stats.modes.length > 0 ? stats.modes.join(', ') : 'None'}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Sum / Count</div>
              <div className="font-display tabular-nums mt-1 text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {Number(stats.sum.toFixed(4))}{' '}
                <span className="text-sm font-normal text-[#78716C]">({stats.count})</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-3.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Minimum</div>
              <div className="font-mono tabular-nums mt-1 text-base font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {stats.min}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-3.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Maximum</div>
              <div className="font-mono tabular-nums mt-1 text-base font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {stats.max}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-3.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Range</div>
              <div className="font-mono tabular-nums mt-1 text-base font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {Number(stats.range.toFixed(4))}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-3.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Std. Deviation (Pop)</div>
              <div className="font-mono tabular-nums mt-1 text-base font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {Number(stats.stdDevPop.toFixed(4))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
