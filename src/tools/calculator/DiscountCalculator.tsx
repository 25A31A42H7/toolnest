import {RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateDiscount} from '../../utils/toolCalculations';

const CURRENCIES = ['$', '£', 'C$', 'A$', '₹', '€'];

export default function DiscountCalculator() {
  const [currency, setCurrency] = useState('$');
  const [price, setPrice] = useState('120');
  const [discount1, setDiscount1] = useState('30');
  const [discount2, setDiscount2] = useState('10');
  const [taxRate, setTaxRate] = useState('0');

  const calc = useMemo(
    () => calculateDiscount(price, discount1, discount2, taxRate),
    [price, discount1, discount2, taxRate]
  );

  const handleReset = () => {
    setPrice('120');
    setDiscount1('30');
    setDiscount2('10');
    setTaxRate('0');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Currency:
          </span>
          {CURRENCIES.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => setCurrency(sym)}
              className={`h-9 min-w-9 rounded-lg px-2.5 text-xs font-semibold transition-colors ${
                currency === sym
                  ? 'bg-[#C2522B] text-white'
                  : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]'
              }`}
            >
              {sym}
            </button>
          ))}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="dc-price"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Original Price ({currency})
          </label>
          <input
            id="dc-price"
            type="number"
            min="0"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label
            htmlFor="dc-d1"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Discount (%)
          </label>
          <input
            id="dc-d1"
            type="number"
            min="0"
            max="100"
            step="any"
            value={discount1}
            onChange={(e) => setDiscount1(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
          <div className="mt-1.5 flex gap-1">
            {['10', '20', '25', '50'].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setDiscount1(pct)}
                className="rounded border border-[#E7E2D8] bg-[#FAF8F4] px-2 py-1 text-[11px] font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="dc-d2"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Extra Coupon (%)
          </label>
          <input
            id="dc-d2"
            type="number"
            min="0"
            max="100"
            step="any"
            value={discount2}
            onChange={(e) => setDiscount2(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
        <div>
          <label
            htmlFor="dc-tax"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Sales Tax / GST (%)
          </label>
          <input
            id="dc-tax"
            type="number"
            min="0"
            max="100"
            step="any"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      {!calc.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {calc.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
            <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">Final Price</div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {currency}
              {calc.finalTotal.toFixed(2)}
            </div>
            {calc.taxAmount > 0 && (
              <div className="font-mono mt-1 text-xs text-[#57534E] dark:text-[#B8B2A6]">
                Includes {currency}
                {calc.taxAmount.toFixed(2)} tax
              </div>
            )}
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/25">
            <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
              You Save
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {currency}
              {calc.totalSaved.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
            <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
              Effective Discount
            </div>
            <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
              {calc.effectiveDiscount.toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
