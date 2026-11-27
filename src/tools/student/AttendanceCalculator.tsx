import {AlertTriangle, CheckCircle2, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateAttendance} from '../../utils/toolCalculations';

export default function AttendanceCalculator() {
  const [attended, setAttended] = useState('32');
  const [total, setTotal] = useState('40');
  const [target, setTarget] = useState('75');
  const [plannedMiss, setPlannedMiss] = useState('0');

  const analysis = useMemo(
    () => calculateAttendance(attended, total, target, plannedMiss),
    [attended, total, target, plannedMiss]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="att-attended" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Classes Attended
          </label>
          <input
            id="att-attended"
            type="number"
            min="0"
            step="1"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="att-total" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Total Classes Conducted
          </label>
          <input
            id="att-total"
            type="number"
            min="1"
            step="1"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="att-target" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Required Target (%)
          </label>
          <input
            id="att-target"
            type="number"
            min="1"
            max="99"
            step="0.5"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {['75', '80', '85'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTarget(preset)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  target === preset
                    ? 'bg-[#C2522B] text-white'
                    : 'bg-[#F4F0E8] text-[#57534E] hover:bg-[#E7E2D8] dark:bg-[#25221F] dark:text-[#B8B2A6]'
                }`}
              >
                {preset}%
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setAttended('32');
                setTotal('40');
                setTarget('75');
                setPlannedMiss('0');
              }}
              className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-[#78716C] hover:text-[#1C1B19] dark:text-[#9E978B]"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {!analysis.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
        >
          {analysis.message}
        </div>
      ) : (
        <>
          <div
            className={`rounded-xl border p-5 ${
              analysis.status === 'safe'
                ? 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/30'
                : 'border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/30'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {analysis.status === 'safe' ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-900 dark:text-emerald-300">
                    On Track (Above {analysis.targetPct}% Requirement)
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-rose-700 dark:text-rose-400" aria-hidden="true" />
                  <span className="text-rose-900 dark:text-rose-300">
                    Below {analysis.targetPct}% Target
                  </span>
                </>
              )}
            </div>

            <div className="font-display tabular-nums mt-2 text-4xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {analysis.currentPct.toFixed(2)}%
            </div>

            <p className="mt-2 text-sm text-[#44403C] dark:text-[#D6CFC2]">
              {analysis.status === 'safe' ? (
                analysis.count > 0 ? (
                  <>
                    You can safely miss up to <strong className="font-semibold">{analysis.count}</strong> upcoming{' '}
                    {analysis.count === 1 ? 'class' : 'classes'} and still maintain at least{' '}
                    {analysis.targetPct}%.
                  </>
                ) : (
                  <>You meet the {analysis.targetPct}% requirement right now, but skipping the next class will drop you below target.</>
                )
              ) : (
                <>
                  You need to attend the next <strong className="font-semibold">{analysis.count}</strong> consecutive{' '}
                  {analysis.count === 1 ? 'class' : 'classes'} without missing any to reach {analysis.targetPct}%.
                </>
              )}
            </p>
          </div>

          <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="miss-sim" className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
                What-If Simulator: If I skip the next <span className="font-mono">{analysis.missSim}</span> classes
              </label>
              <span className="font-mono tabular-nums text-sm font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                Projected: {analysis.simulatedPct.toFixed(2)}%
              </span>
            </div>
            <input
              id="miss-sim"
              type="range"
              min="0"
              max="20"
              value={plannedMiss}
              onChange={(e) => setPlannedMiss(e.target.value)}
              className="mt-3 w-full accent-[#C2522B]"
            />
          </div>
        </>
      )}
    </div>
  );
}
