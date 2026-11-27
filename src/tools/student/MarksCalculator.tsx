import {Plus, RotateCcw, Trash2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateMarks} from '../../utils/toolCalculations';

interface SubjectRow {
  id: number;
  name: string;
  obtained: string;
  max: string;
}

const DEFAULT_SUBJECTS: SubjectRow[] = [
  {id: 1, name: 'Mathematics', obtained: '92', max: '100'},
  {id: 2, name: 'Science', obtained: '88', max: '100'},
  {id: 3, name: 'English', obtained: '84', max: '100'},
  {id: 4, name: 'History', obtained: '79', max: '100'},
  {id: 5, name: 'Computer Science', obtained: '95', max: '100'},
];

export default function MarksCalculator() {
  const [subjects, setSubjects] = useState<SubjectRow[]>(DEFAULT_SUBJECTS);
  const [passThreshold, setPassThreshold] = useState('35');

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {id: Date.now(), name: `Subject ${prev.length + 1}`, obtained: '', max: '100'},
    ]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: number, field: keyof SubjectRow, val: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? {...s, [field]: val} : s)));
  };

  const stats = useMemo(
    () => calculateMarks(subjects, passThreshold),
    [subjects, passThreshold]
  );

  return (
    <div className="space-y-6">
      {stats.errors.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          <ul className="list-disc space-y-1 pl-4">
            {stats.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
          <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">Overall %</div>
          <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {stats.overallPct.toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">Total Marks</div>
          <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {stats.totalObtained} / {stats.totalMax}
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">Standing</div>
          <div className="font-display mt-1 text-base font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {stats.division}
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <label htmlFor="pass-pct" className="block text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
            Pass Threshold (%)
          </label>
          <input
            id="pass-pct"
            type="number"
            min="0"
            max="100"
            value={passThreshold}
            onChange={(e) => setPassThreshold(e.target.value)}
            className="font-mono tabular-nums mt-1 h-9 w-full rounded-lg border border-[#D6CFC2] bg-white px-2.5 text-sm font-semibold text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="hidden grid-cols-12 gap-3 px-1 text-xs font-semibold text-[#78716C] sm:grid dark:text-[#9E978B]">
          <div className="col-span-5">Subject</div>
          <div className="col-span-3">Obtained Marks</div>
          <div className="col-span-2">Max Marks</div>
          <div className="col-span-1 text-right">%</div>
          <div className="col-span-1 text-right">Remove</div>
        </div>

        {subjects.map((subj) => {
          const obt = parseFloat(subj.obtained);
          const max = parseFloat(subj.max);
          const validRow = !isNaN(obt) && !isNaN(max) && max > 0 && obt >= 0 && obt <= max;
          const rowPct = validRow ? (obt / max) * 100 : null;
          return (
            <div
              key={subj.id}
              className="grid grid-cols-1 gap-3 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:bg-transparent sm:p-0 dark:border-[#2E2A26] dark:bg-[#141312] sm:dark:bg-transparent"
            >
              <div className="sm:col-span-5">
                <input
                  type="text"
                  value={subj.name}
                  onChange={(e) => updateSubject(subj.id, 'name', e.target.value)}
                  aria-label="Subject name"
                  className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                />
              </div>
              <div className="sm:col-span-3">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={subj.obtained}
                  onChange={(e) => updateSubject(subj.id, 'obtained', e.target.value)}
                  placeholder="Obtained"
                  aria-label="Obtained marks"
                  className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  step="any"
                  min="1"
                  value={subj.max}
                  onChange={(e) => updateSubject(subj.id, 'max', e.target.value)}
                  placeholder="Max"
                  aria-label="Maximum marks"
                  className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                />
              </div>
              <div className="font-mono tabular-nums text-right text-xs font-semibold sm:col-span-1">
                {rowPct !== null ? (
                  <span
                    className={
                      rowPct < stats.passPct
                        ? 'text-rose-700 dark:text-rose-400'
                        : 'text-[#1C1B19] dark:text-[#F5F2EB]'
                    }
                  >
                    {rowPct.toFixed(0)}%
                  </span>
                ) : (
                  '—'
                )}
              </div>
              <div className="flex justify-end sm:col-span-1">
                <button
                  type="button"
                  onClick={() => removeSubject(subj.id)}
                  disabled={subjects.length <= 1}
                  aria-label={`Remove ${subj.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E2D8] text-[#78716C] hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40 dark:border-[#2E2A26]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {stats.best && stats.lowest && (
        <div className="flex flex-wrap gap-4 text-xs text-[#57534E] dark:text-[#B8B2A6]">
          <span>
            Highest:{' '}
            <strong className="text-[#1C1B19] dark:text-[#F5F2EB]">{stats.best.name}</strong> (
            {stats.best.pct.toFixed(1)}%)
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Lowest:{' '}
            <strong className="text-[#1C1B19] dark:text-[#F5F2EB]">{stats.lowest.name}</strong> (
            {stats.lowest.pct.toFixed(1)}%)
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={addSubject}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#A6411E]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Subject
        </button>
        <button
          type="button"
          onClick={() => setSubjects([{id: 1, name: 'Subject 1', obtained: '', max: '100'}])}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
