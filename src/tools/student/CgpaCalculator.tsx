import {Plus, RotateCcw, Trash2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateCgpa} from '../../utils/toolCalculations';

interface SemesterRow {
  id: number;
  name: string;
  sgpa: string;
  credits: string;
}

const INITIAL_SEMESTERS: SemesterRow[] = [
  {id: 1, name: 'Semester 1', sgpa: '8.4', credits: '20'},
  {id: 2, name: 'Semester 2', sgpa: '8.8', credits: '22'},
  {id: 3, name: 'Semester 3', sgpa: '9.1', credits: '24'},
  {id: 4, name: 'Semester 4', sgpa: '8.9', credits: '22'},
];

export default function CgpaCalculator() {
  const [scale, setScale] = useState<10 | 4>(10);
  const [multiplier, setMultiplier] = useState<string>('9.5');
  const [rows, setRows] = useState<SemesterRow[]>(INITIAL_SEMESTERS);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Semester ${prev.length + 1}`,
        sgpa: '',
        credits: '20',
      },
    ]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: keyof SemesterRow, val: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? {...r, [field]: val} : r)));
  };

  const result = useMemo(() => calculateCgpa(rows, scale, multiplier), [rows, scale, multiplier]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Grading Scale:
          </span>
          <div className="inline-flex rounded-lg border border-[#E7E2D8] bg-white p-0.5 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
            <button
              type="button"
              onClick={() => setScale(10)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                scale === 10
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              10.0 Scale
            </button>
            <button
              type="button"
              onClick={() => setScale(4)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                scale === 4
                  ? 'bg-[#C2522B] text-white'
                  : 'text-[#57534E] dark:text-[#B8B2A6]'
              }`}
            >
              4.0 Scale
            </button>
          </div>
        </div>

        {scale === 10 && (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="cgpa-mult" className="font-medium text-[#57534E] dark:text-[#B8B2A6]">
              Percentage Factor:
            </label>
            <select
              id="cgpa-mult"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              className="h-9 rounded-lg border border-[#D6CFC2] bg-white px-2.5 text-xs font-medium text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
            >
              <option value="9.5">× 9.5 (CBSE / Standard)</option>
              <option value="10">× 10.0 (Direct %)</option>
            </select>
          </div>
        )}
      </div>

      {result.errors.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          <ul className="list-disc space-y-1 pl-4">
            {result.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Results Banner */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
          <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
            Cumulative CGPA
          </div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {result.cgpa.toFixed(2)}{' '}
            <span className="text-base font-medium text-[#78716C]">/ {scale}.0</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
            Estimated Percentage
          </div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {result.percentage.toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
            Total Credits
          </div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {result.totalCredits}
          </div>
        </div>
      </div>

      {/* Semester Rows */}
      <div className="space-y-3">
        <div className="hidden grid-cols-12 gap-3 px-1 text-xs font-semibold text-[#78716C] sm:grid dark:text-[#9E978B]">
          <div className="col-span-5">Semester / Term</div>
          <div className="col-span-3">SGPA (0–{scale})</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-1 text-right">Remove</div>
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-1 gap-3 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:bg-transparent sm:p-0 dark:border-[#2E2A26] dark:bg-[#141312] sm:dark:bg-transparent"
          >
            <div className="sm:col-span-5">
              <input
                type="text"
                value={row.name}
                onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                aria-label="Semester name"
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>
            <div className="sm:col-span-3">
              <input
                type="number"
                step="0.01"
                min="0"
                max={scale}
                value={row.sgpa}
                onChange={(e) => updateRow(row.id, 'sgpa', e.target.value)}
                placeholder={`0.0 – ${scale}.0`}
                aria-label="Semester GPA"
                className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>
            <div className="sm:col-span-3">
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={row.credits}
                onChange={(e) => updateRow(row.id, 'credits', e.target.value)}
                placeholder="Credits"
                aria-label="Credits"
                className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>
            <div className="flex justify-end sm:col-span-1">
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                disabled={rows.length <= 1}
                aria-label={`Remove ${row.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E2D8] text-[#78716C] hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40 dark:border-[#2E2A26] dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={addRow}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#A6411E]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Semester
        </button>

        <button
          type="button"
          onClick={() => setRows([{id: 1, name: 'Semester 1', sgpa: '', credits: '20'}])}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset All
        </button>
      </div>
    </div>
  );
}
