import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateBmi} from '../../utils/toolCalculations';

type UnitSystem = 'metric' | 'imperial';

export default function BmiCalculator() {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('9');
  const [weightLbs, setWeightLbs] = useState('154');

  const analysis = useMemo(
    () => calculateBmi(unit, heightCm, weightKg, feet, inches, weightLbs),
    [unit, heightCm, weightKg, feet, inches, weightLbs]
  );

  const handleReset = () => {
    setHeightCm('175');
    setWeightKg('70');
    setFeet('5');
    setInches('9');
    setWeightLbs('154');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-1 dark:border-[#2E2A26] dark:bg-[#141312]">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`min-h-9 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              unit === 'metric'
                ? 'bg-[#C2522B] text-white'
                : 'text-[#57534E] dark:text-[#B8B2A6]'
            }`}
          >
            Metric (kg / cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`min-h-9 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              unit === 'imperial'
                ? 'bg-[#C2522B] text-white'
                : 'text-[#57534E] dark:text-[#B8B2A6]'
            }`}
          >
            Imperial (lbs / ft-in)
          </button>
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

      {unit === 'metric' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bmi-cm"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Height (cm)
            </label>
            <input
              id="bmi-cm"
              type="number"
              min="40"
              max="280"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>
          <div>
            <label
              htmlFor="bmi-kg"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Weight (kg)
            </label>
            <input
              id="bmi-kg"
              type="number"
              min="10"
              max="500"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="bmi-ft"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Height (Feet)
            </label>
            <input
              id="bmi-ft"
              type="number"
              min="1"
              max="9"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>
          <div>
            <label
              htmlFor="bmi-in"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Height (Inches)
            </label>
            <input
              id="bmi-in"
              type="number"
              min="0"
              max="11"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>
          <div>
            <label
              htmlFor="bmi-lbs"
              className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
            >
              Weight (lbs)
            </label>
            <input
              id="bmi-lbs"
              type="number"
              min="20"
              max="1000"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-base text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
          </div>
        </div>
      )}

      {!analysis.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {analysis.error}
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-5 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
                Your BMI Score
              </div>
              <div className="font-display tabular-nums mt-1 text-4xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {analysis.bmi.toFixed(1)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">Category</div>
              <div className="mt-1 text-lg font-bold text-[#C2522B] dark:text-[#E06D4B]">
                {analysis.category}
              </div>
            </div>
          </div>

          <div>
            <div className="relative flex h-3 w-full overflow-hidden rounded-full border border-[#E7E2D8] dark:border-[#2E2A26]">
              <div className="h-full w-[17.3%] bg-amber-300 dark:bg-amber-600/70" />
              <div className="h-full w-[25%] bg-emerald-600 dark:bg-emerald-500" />
              <div className="h-full w-[19.2%] bg-amber-500 dark:bg-amber-400" />
              <div className="h-full flex-1 bg-rose-600 dark:bg-rose-500" />
              <div
                className="absolute top-0 h-full w-1.5 -translate-x-1/2 bg-[#1C1B19] ring-2 ring-white dark:bg-[#F5F2EB] dark:ring-[#141312]"
                style={{left: `${analysis.gaugePct}%`}}
              />
            </div>
            <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-[11px] text-[#78716C] dark:text-[#9E978B]">
              <span>Underweight (&lt;18.5)</span>
              <span>Normal (18.5–24.9)</span>
              <span>Overweight (25–29.9)</span>
              <span>Obese (30+)</span>
            </div>
          </div>

          <p className="text-xs text-[#57534E] dark:text-[#B8B2A6]">
            Healthy weight range for your height:{' '}
            <strong className="text-[#1C1B19] dark:text-[#F5F2EB]">{analysis.healthyRange}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
