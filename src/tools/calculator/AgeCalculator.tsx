import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateAge} from '../../utils/toolCalculations';

function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function AgeCalculator() {
  const today = useMemo(() => toInputDate(new Date()), []);
  const [dob, setDob] = useState('1998-05-14');
  const [asOf, setAsOf] = useState(today);

  const result = useMemo(() => calculateAge(dob, asOf), [dob, asOf]);

  const handleReset = () => {
    setDob('1998-05-14');
    setAsOf(toInputDate(new Date()));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="age-dob"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Date of Birth
          </label>
          <input
            id="age-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="font-mono h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="age-asof"
              className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Age at the Date of
            </label>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#78716C] hover:text-[#C2522B] dark:text-[#9E978B] dark:hover:text-[#E06D4B]"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Reset
            </button>
          </div>
          <input
            id="age-asof"
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="font-mono h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      {!result.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {result.error}
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-5 dark:border-[#5C3123] dark:bg-[#2A1B16]">
            <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">Exact Age</div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <p className="mt-2 text-xs text-[#57534E] dark:text-[#B8B2A6]">
              Born on a <strong>{result.bornWeekday}</strong> · Next birthday in{' '}
              <strong>{result.daysUntilBirthday} days</strong> ({result.nextBdayWeekday})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {label: 'Total Months', value: result.totalMonths.toLocaleString()},
              {label: 'Total Weeks', value: result.totalWeeks.toLocaleString()},
              {label: 'Total Days', value: result.totalDays.toLocaleString()},
              {label: 'Approx. Hours', value: result.totalHours.toLocaleString()},
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3.5 dark:border-[#2E2A26] dark:bg-[#141312]"
              >
                <div className="text-xs text-[#78716C] dark:text-[#9E978B]">{stat.label}</div>
                <div className="font-display tabular-nums mt-1 text-xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
