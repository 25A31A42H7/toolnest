import {ArrowLeftRight, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateDateDifference} from '../../utils/toolCalculations';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-05-30');
  const [inclusive, setInclusive] = useState(false);

  const swapDates = () => {
    setStartDate(endDate);
    setEndDate(startDate);
  };

  const handleReset = () => {
    setStartDate('2026-03-01');
    setEndDate('2026-05-30');
    setInclusive(false);
  };

  const diff = useMemo(
    () => calculateDateDifference(startDate, endDate, inclusive),
    [startDate, endDate, inclusive]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="dd-start"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Start Date
          </label>
          <input
            id="dd-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="font-mono h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <button
          type="button"
          onClick={swapDates}
          aria-label="Swap start and end dates"
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] px-3.5 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          <span className="sm:hidden">Swap</span>
        </button>

        <div className="flex-1">
          <label
            htmlFor="dd-end"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            End Date
          </label>
          <input
            id="dd-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="font-mono h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#57534E] dark:text-[#B8B2A6]">
          <input
            type="checkbox"
            checked={inclusive}
            onChange={(e) => setInclusive(e.target.checked)}
            className="h-4 w-4 rounded border-[#D6CFC2] accent-[#C2522B]"
          />
          <span>Include end date in count (+1 day)</span>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      {!diff.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {diff.error}
        </div>
      ) : (
        <>
          {diff.swapped && (
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] px-4 py-2.5 text-xs text-[#57534E] dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#B8B2A6]">
              Note: End date precedes start date; duration shown as absolute span between dates.
            </div>
          )}

          <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-5 dark:border-[#5C3123] dark:bg-[#2A1B16]">
            <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
              Time Between Dates
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {diff.totalDays.toLocaleString()} {diff.totalDays === 1 ? 'day' : 'days'}
            </div>
            <p className="mt-1.5 text-xs text-[#57534E] dark:text-[#B8B2A6]">
              Calendar duration: {diff.years} yrs, {diff.months} mos, {diff.days} days · Or{' '}
              {diff.weeks} weeks and {diff.remDays} days
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">
                Business Weekdays (Mon–Fri)
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {diff.weekdays.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">
                Weekend Days (Sat–Sun)
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {diff.weekends.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs text-[#78716C] dark:text-[#9E978B]">Total Hours</div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {diff.hours.toLocaleString()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
