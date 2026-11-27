import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateStudyPlan} from '../../utils/toolCalculations';

export default function StudyTimeCalculator() {
  const [units, setUnits] = useState('14');
  const [hoursPerUnit, setHoursPerUnit] = useState('2.5');
  const [revisionHours, setRevisionHours] = useState('5');
  const [daysLeft, setDaysLeft] = useState('10');
  const [maxDailyHours, setMaxDailyHours] = useState('5');
  const [pomodoroMinutes, setPomodoroMinutes] = useState<25 | 50>(25);

  const plan = useMemo(
    () =>
      calculateStudyPlan(
        units,
        hoursPerUnit,
        revisionHours,
        daysLeft,
        maxDailyHours,
        pomodoroMinutes
      ),
    [units, hoursPerUnit, revisionHours, daysLeft, maxDailyHours, pomodoroMinutes]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="st-units" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Chapters / Topics to Study
          </label>
          <input
            id="st-units"
            type="number"
            min="1"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="st-hpu" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Hours Needed per Chapter
          </label>
          <input
            id="st-hpu"
            type="number"
            step="0.5"
            min="0.5"
            value={hoursPerUnit}
            onChange={(e) => setHoursPerUnit(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="st-rev" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Extra Revision Buffer (Hours)
          </label>
          <input
            id="st-rev"
            type="number"
            step="0.5"
            min="0"
            value={revisionHours}
            onChange={(e) => setRevisionHours(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="st-days" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Days Until Exam
          </label>
          <input
            id="st-days"
            type="number"
            min="1"
            value={daysLeft}
            onChange={(e) => setDaysLeft(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="st-cap" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Max Comfortable Hours / Day
          </label>
          <input
            id="st-cap"
            type="number"
            step="0.5"
            min="0.5"
            max="24"
            value={maxDailyHours}
            onChange={(e) => setMaxDailyHours(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Focus Block Style
          </span>
          <div className="inline-flex h-11 w-full rounded-xl border border-[#D6CFC2] bg-[#FAF8F4] p-1 dark:border-[#3A3530] dark:bg-[#141312]">
            <button
              type="button"
              onClick={() => setPomodoroMinutes(25)}
              className={`flex-1 rounded-lg text-xs font-semibold transition-colors ${
                pomodoroMinutes === 25
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              25m / 5m Break
            </button>
            <button
              type="button"
              onClick={() => setPomodoroMinutes(50)}
              className={`flex-1 rounded-lg text-xs font-semibold transition-colors ${
                pomodoroMinutes === 50
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              50m / 10m Break
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setUnits('14');
            setHoursPerUnit('2.5');
            setRevisionHours('5');
            setDaysLeft('10');
            setMaxDailyHours('5');
            setPomodoroMinutes(25);
          }}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset Defaults
        </button>
      </div>

      {!plan.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
        >
          {plan.error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
              <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
                Required Daily Study
              </div>
              <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {plan.hoursPerDay.toFixed(1)} hrs/day
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
                Focus Sessions Daily
              </div>
              <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {plan.sessionsPerDay} × {pomodoroMinutes}m
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
                Total Workload
              </div>
              <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {plan.totalHours.toFixed(1)} hrs
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 text-sm ${
              plan.feasible
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200'
                : 'border-amber-200 bg-amber-50/70 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200'
            }`}
          >
            {plan.feasible ? (
              <>
                <strong>Realistic Schedule:</strong> Studying {plan.hoursPerDay.toFixed(1)} hours per
                day fits comfortably inside your {plan.cap} hrs/day limit ({plan.weeklyHours.toFixed(1)}{' '}
                hrs over the next {Math.min(7, plan.days)} days).
              </>
            ) : (
              <>
                <strong>Heavy Workload Alert:</strong> Your plan requires {plan.hoursPerDay.toFixed(1)}{' '}
                hrs/day, which is {(plan.hoursPerDay - plan.cap).toFixed(1)} hrs/day above your
                comfortable limit. Consider prioritizing core exam topics first or starting earlier.
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
