import {ChevronDown, ChevronUp, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateLoan} from '../../utils/toolCalculations';

const CURRENCY_OPTIONS = [
  {code: 'USD', symbol: '$', locale: 'en-US'},
  {code: 'GBP', symbol: '£', locale: 'en-GB'},
  {code: 'CAD', symbol: 'C$', locale: 'en-CA'},
  {code: 'AUD', symbol: 'A$', locale: 'en-AU'},
  {code: 'INR', symbol: '₹', locale: 'en-IN'},
];

export default function LoanCalculator() {
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [amount, setAmount] = useState('25000');
  const [rate, setRate] = useState('6.5');
  const [tenure, setTenure] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  const [showSchedule, setShowSchedule] = useState(false);

  const curr = CURRENCY_OPTIONS[currencyIdx];

  const calc = useMemo(
    () => calculateLoan(amount, rate, tenure, tenureUnit),
    [amount, rate, tenure, tenureUnit]
  );

  const fmt = (val: number) =>
    `${curr.symbol}${val.toLocaleString(curr.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleReset = () => {
    setAmount('25000');
    setRate('6.5');
    setTenure('5');
    setTenureUnit('years');
    setShowSchedule(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Currency:
          </span>
          {CURRENCY_OPTIONS.map((c, idx) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setCurrencyIdx(idx)}
              className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                currencyIdx === idx
                  ? 'bg-[#C2522B] text-white'
                  : 'border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]'
              }`}
            >
              {c.code} ({c.symbol})
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="loan-amt"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Loan Amount ({curr.symbol})
          </label>
          <input
            id="loan-amt"
            type="number"
            min="1"
            step="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <label
            htmlFor="loan-rate"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Annual Interest Rate (%)
          </label>
          <input
            id="loan-rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
          />
        </div>

        <div>
          <label
            htmlFor="loan-tenure"
            className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
          >
            Loan Tenure
          </label>
          <div className="flex gap-2">
            <input
              id="loan-tenure"
              type="number"
              min="1"
              max={tenureUnit === 'years' ? 50 : 600}
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="font-mono tabular-nums h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            />
            <select
              value={tenureUnit}
              onChange={(e) => setTenureUnit(e.target.value as 'years' | 'months')}
              aria-label="Tenure unit"
              className="h-11 rounded-xl border border-[#D6CFC2] bg-white px-3 text-xs font-semibold text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
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
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
              <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">
                Monthly Payment (EMI)
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {fmt(calc.emi)}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
                Total Interest Payable
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {fmt(calc.totalInterest)}
              </div>
            </div>
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
                Total Payment
              </div>
              <div className="font-display tabular-nums mt-1 text-2xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
                {fmt(calc.totalPayment)}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex justify-between text-xs text-[#57534E] dark:text-[#B8B2A6]">
              <span>Principal ({calc.principalPct.toFixed(1)}%)</span>
              <span>Interest ({(100 - calc.principalPct).toFixed(1)}%)</span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#D6CFC2] dark:bg-[#3A3530]">
              <div
                className="h-full bg-[#C2522B] transition-all duration-150 dark:bg-[#E06D4B]"
                style={{width: `${calc.principalPct}%`}}
              />
            </div>
          </div>

          {calc.yearly.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setShowSchedule((prev) => !prev)}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E7E2D8] bg-white px-4 py-2 text-xs font-semibold text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
              >
                {showSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {showSchedule ? 'Hide' : 'Show'} Yearly Amortization Schedule ({calc.yearly.length} yrs)
              </button>

              {showSchedule && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-[#E7E2D8] dark:border-[#2E2A26]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F4] text-[#57534E] dark:bg-[#141312] dark:text-[#B8B2A6]">
                      <tr>
                        <th className="px-4 py-2.5 font-semibold">Year</th>
                        <th className="px-4 py-2.5 text-right font-semibold">Principal Paid</th>
                        <th className="px-4 py-2.5 text-right font-semibold">Interest Paid</th>
                        <th className="px-4 py-2.5 text-right font-semibold">Ending Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E2D8] dark:divide-[#2E2A26]">
                      {calc.yearly.map((row) => (
                        <tr
                          key={row.year}
                          className="hover:bg-[#FAF8F4]/70 dark:hover:bg-[#141312]/50"
                        >
                          <td className="font-mono tabular-nums px-4 py-2.5 font-medium text-[#1C1B19] dark:text-[#F5F2EB]">
                            Year {row.year}
                          </td>
                          <td className="font-mono tabular-nums px-4 py-2.5 text-right text-[#57534E] dark:text-[#B8B2A6]">
                            {fmt(row.principal)}
                          </td>
                          <td className="font-mono tabular-nums px-4 py-2.5 text-right text-[#57534E] dark:text-[#B8B2A6]">
                            {fmt(row.interest)}
                          </td>
                          <td className="font-mono tabular-nums px-4 py-2.5 text-right font-medium text-[#1C1B19] dark:text-[#F5F2EB]">
                            {fmt(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
