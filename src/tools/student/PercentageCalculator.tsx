import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculatePercentage, PercentageMode} from '../../utils/toolCalculations';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<PercentageMode>('percent-of');
  const [a, setA] = useState('25');
  const [b, setB] = useState('480');

  const calc = useMemo(() => calculatePercentage(mode, a, b), [mode, a, b]);

  const modes: Array<{id: PercentageMode; label: string; labelA: string; labelB: string}> = [
    {id: 'percent-of', label: 'X% of Y', labelA: 'Percentage (X%)', labelB: 'Of Value (Y)'},
    {id: 'what-percent', label: 'X is what % of Y', labelA: 'Part Value (X)', labelB: 'Whole Value (Y)'},
    {id: 'percent-change', label: '% Increase / Decrease', labelA: 'Initial Value', labelB: 'New Value'},
    {id: 'marks', label: 'Exam Marks %', labelA: 'Marks Obtained', labelB: 'Total / Max Marks'},
  ];

  const activeMeta = modes.find((m) => m.id === mode)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Percentage calculation mode">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`min-h-10 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                mode === m.id
                  ? 'bg-[#C2522B] text-white'
                  : 'border border-[#E7E2D8] bg-white text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setA('');
            setB('');
          }}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pct-a" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            {activeMeta.labelA}
          </label>
          <input
            id="pct-a"
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="font-mono tabular-nums h-12 w-full rounded-xl border border-[#D6CFC2] bg-white px-4 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label htmlFor="pct-b" className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            {activeMeta.labelB}
          </label>
          <input
            id="pct-b"
            type="number"
            step="any"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="font-mono tabular-nums h-12 w-full rounded-xl border border-[#D6CFC2] bg-white px-4 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      <div
        className={`rounded-xl border p-5 ${
          calc.valid
            ? 'border-[#E2B8A8] bg-[#FAF0EB] dark:border-[#5C3123] dark:bg-[#2A1B16]'
            : 'border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30'
        }`}
      >
        <div
          className={`text-xs font-medium ${
            calc.valid ? 'text-[#A6411E] dark:text-[#E06D4B]' : 'text-amber-800 dark:text-amber-300'
          }`}
        >
          {calc.valid ? 'Calculated Result' : 'Input Notice'}
        </div>
        <div className="font-display tabular-nums mt-1 text-4xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
          {calc.value}
        </div>
        <p className="font-mono mt-2 text-xs text-[#57534E] dark:text-[#B8B2A6]">{calc.formula}</p>
      </div>
    </div>
  );
}
