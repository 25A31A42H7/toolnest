/**
 * Pure, framework-free calculation & text-processing functions for ToolNest.
 * All functions handle empty, malformed, negative, decimal, and large inputs safely.
 */

// 1. Word Counter
const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'of', 'to', 'in', 'is', 'it', 'you', 'that', 'for', 'on', 'with',
  'as', 'are', 'was', 'be', 'by', 'or', 'this', 'from', 'at', 'your', 'our', 'can',
]);

export function analyzeWordText(text: string) {
  const normalized = text.replace(/\r\n/g, '\n');
  const trimmed = normalized.trim();
  const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const charCount = normalized.length;
  const charNoSpaces = normalized.replace(/\s/g, '').length;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const paragraphs = trimmed
    ? normalized.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;
  const lines = normalized.length > 0 ? normalized.split('\n').length : 0;

  const readSeconds = wordCount > 0 ? Math.ceil((wordCount / 200) * 60) : 0;
  const speakSeconds = wordCount > 0 ? Math.ceil((wordCount / 130) * 60) : 0;

  const freq = new Map<string, number>();
  for (const raw of wordsArray) {
    const clean = raw.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '');
    if (clean.length >= 3 && !STOP_WORDS.has(clean)) {
      freq.set(clean, (freq.get(clean) || 0) + 1);
    }
  }
  const topKeywords = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0.0',
    }));

  return {
    wordCount,
    charCount,
    charNoSpaces,
    sentences,
    paragraphs,
    lines,
    readSeconds,
    speakSeconds,
    topKeywords,
  };
}

// 2. Character Counter
export function analyzeCharacters(text: string) {
  const normalized = text.replace(/\r\n/g, '\n');
  const withSpaces = normalized.length;
  const withoutSpaces = normalized.replace(/\s/g, '').length;
  const trimmed = normalized.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const lines = normalized.length > 0 ? normalized.split('\n').length : 0;
  const utf8Bytes = new TextEncoder().encode(normalized).length;
  return {withSpaces, withoutSpaces, words, lines, utf8Bytes};
}

// 3. Case Converter
const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet',
]);

export function toTitleCase(input: string): string {
  return input
    .split('\n')
    .map((line) => {
      const tokens = line.toLowerCase().split(/(\s+)/);
      const wordIndices = tokens
        .map((t, idx) => (/^\s*$/.test(t) ? -1 : idx))
        .filter((idx) => idx !== -1);
      const firstWordIdx = wordIndices[0];
      const lastWordIdx = wordIndices[wordIndices.length - 1];

      return tokens
        .map((part, idx) => {
          if (/^\s*$/.test(part)) return part;
          if (idx !== firstWordIdx && idx !== lastWordIdx && MINOR_WORDS.has(part)) {
            return part;
          }
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join('');
    })
    .join('\n');
}

export function toSentenceCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, (match) => match.toUpperCase());
}

export function splitWordsForCode(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// 4. Remove Extra Spaces
export function cleanExtraSpaces(
  input: string,
  opts: {collapseSpaces: boolean; trimLines: boolean; removeBlankLines: boolean; convertTabs: boolean}
) {
  let result = input.replace(/\r\n/g, '\n');
  if (opts.convertTabs) {
    result = result.replace(/\t+/g, ' ').replace(/\u00A0/g, ' ');
  }
  let lines = result.split('\n');
  if (opts.collapseSpaces) {
    lines = lines.map((line) => line.replace(/ {2,}/g, ' '));
  }
  if (opts.trimLines) {
    lines = lines.map((line) => line.trim());
  }
  if (opts.removeBlankLines) {
    lines = lines.filter((line) => line.length > 0);
  }
  const output = lines.join('\n');
  return {
    output,
    removedChars: Math.max(0, input.replace(/\r\n/g, '\n').length - output.length),
  };
}

// 5. Text Reverser
export type ReverseMode = 'chars' | 'words' | 'each-word' | 'lines';

export function reverseText(input: string, mode: ReverseMode): string {
  if (!input) return '';
  const normalized = input.replace(/\r\n/g, '\n');
  switch (mode) {
    case 'chars':
      return Array.from(normalized).reverse().join('');
    case 'words':
      return normalized
        .split('\n')
        .map((line) => (line.trim() ? line.trim().split(/\s+/).reverse().join(' ') : ''))
        .join('\n');
    case 'each-word':
      return normalized
        .split(/(\s+)/)
        .map((token) => (/^\s+$/.test(token) ? token : Array.from(token).reverse().join('')))
        .join('');
    case 'lines':
      return normalized.split('\n').reverse().join('\n');
  }
}

// 6. Duplicate Line Remover
export type SortOrder = 'none' | 'asc' | 'desc';

export function deduplicateLines(
  input: string,
  opts: {caseSensitive: boolean; trimLines: boolean; removeEmpty: boolean; sortOrder: SortOrder}
) {
  if (!input) {
    return {output: '', totalLines: 0, uniqueLines: 0, duplicatesRemoved: 0, emptyRemoved: 0};
  }
  const rawLines = input.replace(/\r\n/g, '\n').split('\n');
  const seen = new Set<string>();
  const unique: string[] = [];
  let duplicatesRemoved = 0;
  let emptyRemoved = 0;

  for (const raw of rawLines) {
    const processed = opts.trimLines ? raw.trim() : raw;
    if (opts.removeEmpty && processed.length === 0) {
      emptyRemoved++;
      continue;
    }
    const key = opts.caseSensitive ? processed : processed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(processed);
    } else {
      duplicatesRemoved++;
    }
  }

  if (opts.sortOrder === 'asc') {
    unique.sort((a, b) => a.localeCompare(b));
  } else if (opts.sortOrder === 'desc') {
    unique.sort((a, b) => b.localeCompare(a));
  }

  return {
    output: unique.join('\n'),
    totalLines: rawLines.length,
    uniqueLines: unique.length,
    duplicatesRemoved,
    emptyRemoved,
  };
}

// 7. Text to Slug
const SLUG_STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are',
]);

export function makeSlug(
  text: string,
  separator: '-' | '_' = '-',
  removeStopWords = false,
  maxLength = 0
): string {
  const normalized = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s_-]+/g, ' ')
    .trim();

  let parts = normalized.split(/[\s_-]+/).filter(Boolean);
  if (removeStopWords && parts.length > 2) {
    const filtered = parts.filter((word) => !SLUG_STOP_WORDS.has(word));
    if (filtered.length > 0) parts = filtered;
  }
  let slug = parts.join(separator);
  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(new RegExp(`${separator}+$`), '');
  }
  return slug;
}

// 8. CGPA Calculator
export interface CgpaRowInput {
  name: string;
  sgpa: string;
  credits: string;
}

export function calculateCgpa(rows: CgpaRowInput[], scale: 10 | 4, multiplierStr: string) {
  let totalPoints = 0;
  let totalCredits = 0;
  let validCount = 0;
  const errors: string[] = [];

  rows.forEach((row, idx) => {
    if (!row.sgpa.trim() && !row.credits.trim()) return;
    const sgpa = parseFloat(row.sgpa);
    const credits = parseFloat(row.credits);
    const label = row.name.trim() || `Semester ${idx + 1}`;

    if (isNaN(sgpa) || sgpa < 0 || sgpa > scale) {
      errors.push(`${label}: SGPA must be between 0 and ${scale}.`);
      return;
    }
    if (isNaN(credits) || credits <= 0) {
      errors.push(`${label}: Credits must be greater than 0.`);
      return;
    }
    totalPoints += sgpa * credits;
    totalCredits += credits;
    validCount++;
  });

  const mult = parseFloat(multiplierStr);
  if (scale === 10 && (isNaN(mult) || mult <= 0 || mult > 15)) {
    errors.push('Percentage multiplier must be greater than 0.');
  }

  const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const validMult = !isNaN(mult) && mult > 0 ? mult : 9.5;
  const percentage =
    scale === 10 ? Math.min(100, cgpa * validMult) : Math.min(100, (cgpa / 4) * 100);

  return {cgpa, totalCredits, validCount, percentage, errors};
}

// 9. GPA Calculator
export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  F: 0.0,
};

export interface GpaCourseInput {
  name: string;
  grade: string;
  credits: string;
}

export function calculateGpa(
  courses: GpaCourseInput[],
  priorGpaStr: string,
  priorCreditsStr: string
) {
  let semPoints = 0;
  let semCredits = 0;
  const errors: string[] = [];

  courses.forEach((c, idx) => {
    const cr = parseFloat(c.credits);
    const gp = GRADE_POINTS[c.grade];
    const label = c.name.trim() || `Course ${idx + 1}`;
    if (!c.credits.trim()) return;
    if (isNaN(cr) || cr <= 0) {
      errors.push(`${label}: Credits must be greater than 0.`);
      return;
    }
    if (gp === undefined) {
      errors.push(`${label}: Invalid letter grade.`);
      return;
    }
    semPoints += cr * gp;
    semCredits += cr;
  });

  const semesterGpa = semCredits > 0 ? semPoints / semCredits : 0;

  let hasPrior = false;
  let pGpa = 0;
  let pCr = 0;
  if (priorGpaStr.trim() || priorCreditsStr.trim()) {
    pGpa = parseFloat(priorGpaStr);
    pCr = parseFloat(priorCreditsStr);
    if (isNaN(pGpa) || pGpa < 0 || pGpa > 4) {
      errors.push('Previous Cumulative GPA must be between 0.0 and 4.0.');
    } else if (isNaN(pCr) || pCr <= 0) {
      errors.push('Previous Completed Credits must be greater than 0.');
    } else {
      hasPrior = true;
    }
  }

  const totalPoints = hasPrior ? semPoints + pGpa * pCr : semPoints;
  const totalCredits = hasPrior ? semCredits + pCr : semCredits;
  const cumulativeGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {semPoints, semCredits, semesterGpa, cumulativeGpa, totalCredits, hasPrior, errors};
}

// 10. Percentage Calculator
export type PercentageMode = 'percent-of' | 'what-percent' | 'percent-change' | 'marks';

export function calculatePercentage(mode: PercentageMode, aStr: string, bStr: string) {
  const x = parseFloat(aStr);
  const y = parseFloat(bStr);
  if (!aStr.trim() || !bStr.trim() || isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
    return {valid: false, value: '—', formula: 'Enter valid numbers in both fields.'};
  }

  switch (mode) {
    case 'percent-of': {
      const res = (x / 100) * y;
      return {
        valid: true,
        numeric: res,
        value: Number(res.toFixed(4)).toLocaleString(),
        formula: `(${x} ÷ 100) × ${y} = ${Number(res.toFixed(4))}`,
      };
    }
    case 'what-percent': {
      if (y === 0) return {valid: false, value: 'Undefined', formula: 'Whole value cannot be 0.'};
      const res = (x / y) * 100;
      return {
        valid: true,
        numeric: res,
        value: `${Number(res.toFixed(2))}%`,
        formula: `(${x} ÷ ${y}) × 100 = ${Number(res.toFixed(4))}%`,
      };
    }
    case 'percent-change': {
      if (x === 0) return {valid: false, value: 'Undefined', formula: 'Initial value cannot be 0.'};
      const diff = y - x;
      const res = (diff / Math.abs(x)) * 100;
      const sign = res > 0 ? '+' : '';
      return {
        valid: true,
        numeric: res,
        value: `${sign}${Number(res.toFixed(2))}%`,
        formula: `((${y} − ${x}) ÷ |${x}|) × 100 = ${sign}${Number(res.toFixed(2))}% (${diff >= 0 ? '+' : ''}${Number(diff.toFixed(4))} change)`,
      };
    }
    case 'marks': {
      if (y <= 0) return {valid: false, value: 'Undefined', formula: 'Maximum marks must be greater than 0.'};
      if (x < 0) return {valid: false, value: 'Invalid', formula: 'Obtained marks cannot be negative.'};
      const res = (x / y) * 100;
      return {
        valid: true,
        numeric: res,
        value: `${Number(res.toFixed(2))}%`,
        formula: `(${x} obtained ÷ ${y} maximum) × 100 = ${Number(res.toFixed(2))}%`,
      };
    }
  }
}

// 11. Attendance Calculator
export function calculateAttendance(
  attendedStr: string,
  totalStr: string,
  targetStr: string,
  plannedMissStr = '0'
) {
  const att = Number(attendedStr);
  const tot = Number(totalStr);
  const tgt = Number(targetStr);
  const missSim = Math.max(0, Math.floor(Number(plannedMissStr) || 0));

  if (
    !attendedStr.trim() ||
    !totalStr.trim() ||
    !targetStr.trim() ||
    isNaN(att) ||
    isNaN(tot) ||
    isNaN(tgt)
  ) {
    return {valid: false as const, message: 'Enter valid numbers for attended, total, and target.'};
  }
  if (!Number.isInteger(att) || !Number.isInteger(tot) || att < 0 || tot <= 0) {
    return {
      valid: false as const,
      message: 'Attended classes must be 0 or higher and total classes must be a positive whole number.',
    };
  }
  if (att > tot) {
    return {valid: false as const, message: 'Attended classes cannot exceed total classes conducted.'};
  }
  if (tgt <= 0 || tgt >= 100) {
    return {valid: false as const, message: 'Target percentage must be greater than 0% and less than 100%.'};
  }

  const currentPct = (att / tot) * 100;
  const ratio = tgt / 100;
  let status: 'safe' | 'short';
  let count = 0;

  if (currentPct >= tgt) {
    status = 'safe';
    count = Math.max(0, Math.floor(att / ratio - tot));
  } else {
    status = 'short';
    count = Math.max(0, Math.ceil((ratio * tot - att) / (1 - ratio)));
  }

  const simulatedPct = (att / (tot + missSim)) * 100;

  return {
    valid: true as const,
    currentPct,
    status,
    count,
    targetPct: tgt,
    simulatedPct,
    missSim,
  };
}

// 12. Study Time Calculator
export function calculateStudyPlan(
  unitsStr: string,
  hoursPerUnitStr: string,
  revisionHoursStr: string,
  daysLeftStr: string,
  maxDailyHoursStr: string,
  pomodoroMinutes: 25 | 50
) {
  const u = parseFloat(unitsStr);
  const hpu = parseFloat(hoursPerUnitStr);
  const rev = revisionHoursStr.trim() ? parseFloat(revisionHoursStr) : 0;
  const days = parseFloat(daysLeftStr);
  const cap = parseFloat(maxDailyHoursStr);

  if (isNaN(u) || u <= 0) return {valid: false as const, error: 'Chapters/topics must be greater than 0.'};
  if (isNaN(hpu) || hpu <= 0) return {valid: false as const, error: 'Hours per chapter must be greater than 0.'};
  if (isNaN(rev) || rev < 0) return {valid: false as const, error: 'Revision buffer cannot be negative.'};
  if (isNaN(days) || days < 1) return {valid: false as const, error: 'Days until exam must be at least 1.'};
  if (isNaN(cap) || cap <= 0 || cap > 24) {
    return {valid: false as const, error: 'Max daily hours must be between 0.5 and 24.'};
  }

  const totalHours = u * hpu + rev;
  const hoursPerDay = totalHours / days;
  const sessionsPerDay = Math.ceil((hoursPerDay * 60) / pomodoroMinutes);
  const weeklyHours = hoursPerDay * Math.min(7, days);
  const feasible = hoursPerDay <= cap;

  return {valid: true as const, totalHours, hoursPerDay, sessionsPerDay, weeklyHours, feasible, cap, days};
}

// 13. Marks Calculator
export interface MarksSubjectInput {
  name: string;
  obtained: string;
  max: string;
}

export function calculateMarks(subjects: MarksSubjectInput[], passThresholdStr: string) {
  let totalObtained = 0;
  let totalMax = 0;
  let allPassed = true;
  const errors: string[] = [];

  const passPct = parseFloat(passThresholdStr);
  if (isNaN(passPct) || passPct < 0 || passPct > 100) {
    errors.push('Pass threshold must be between 0% and 100%.');
  }
  const effectivePass = !isNaN(passPct) && passPct >= 0 && passPct <= 100 ? passPct : 35;

  let best: {name: string; pct: number} | null = null;
  let lowest: {name: string; pct: number} | null = null;

  for (let idx = 0; idx < subjects.length; idx++) {
    const s = subjects[idx];
    if (!s.obtained.trim() && !s.max.trim()) continue;
    const obt = parseFloat(s.obtained);
    const max = parseFloat(s.max);
    const label = s.name.trim() || `Subject ${idx + 1}`;

    if (isNaN(max) || max <= 0) {
      errors.push(`${label}: Maximum marks must be greater than 0.`);
      continue;
    }
    if (isNaN(obt) || obt < 0) {
      errors.push(`${label}: Obtained marks cannot be negative.`);
      continue;
    }
    if (obt > max) {
      errors.push(`${label}: Obtained marks (${obt}) cannot exceed maximum marks (${max}).`);
      continue;
    }

    totalObtained += obt;
    totalMax += max;
    const pct = (obt / max) * 100;
    if (pct < effectivePass) allPassed = false;
    if (!best || pct > best.pct) best = {name: label, pct};
    if (!lowest || pct < lowest.pct) lowest = {name: label, pct};
  }

  const overallPct = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  let division = 'No Marks Entered';
  if (totalMax > 0) {
    if (!allPassed) division = 'Fail (Below threshold in one or more subjects)';
    else if (overallPct >= 75) division = 'Distinction';
    else if (overallPct >= 60) division = 'First Division';
    else if (overallPct >= 50) division = 'Second Division';
    else if (overallPct >= effectivePass) division = 'Pass';
    else division = 'Needs Improvement';
  }

  return {
    totalObtained,
    totalMax,
    overallPct,
    division,
    allPassed,
    best,
    lowest,
    passPct: effectivePass,
    errors,
  };
}

// 19. Age Calculator
export function calculateAge(dobStr: string, asOfStr: string) {
  if (!dobStr || !asOfStr) {
    return {valid: false as const, error: 'Select both Date of Birth and target date.'};
  }
  const [by, bm, bd] = dobStr.split('-').map(Number);
  const [ty, tm, td] = asOfStr.split('-').map(Number);
  if (!by || !bm || !bd || !ty || !tm || !td) {
    return {valid: false as const, error: 'Please enter valid calendar dates.'};
  }

  const birthDate = new Date(by, bm - 1, bd);
  const targetDate = new Date(ty, tm - 1, td);
  if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
    return {valid: false as const, error: 'Invalid calendar date provided.'};
  }
  if (targetDate < birthDate) {
    return {valid: false as const, error: 'Target date must be on or after the Date of Birth.'};
  }

  let years = ty - by;
  let months = tm - bm;
  let days = td - bd;

  if (days < 0) {
    const prevMonthLastDay = new Date(ty, tm - 1, 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = Math.round((targetDate.getTime() - birthDate.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const bornWeekday = weekdays[birthDate.getDay()];

  // Leap-year safe next birthday (Feb 29 celebrates on Feb 28 in non-leap years)
  const makeBirthdayInYear = (yr: number) => {
    const lastDayOfBirthMonth = new Date(yr, bm, 0).getDate();
    return new Date(yr, bm - 1, Math.min(bd, lastDayOfBirthMonth));
  };

  let nextBirthday = makeBirthdayInYear(ty);
  if (nextBirthday <= targetDate) {
    nextBirthday = makeBirthdayInYear(ty + 1);
  }
  const daysUntilBirthday = Math.round((nextBirthday.getTime() - targetDate.getTime()) / 86400000);
  const nextBdayWeekday = weekdays[nextBirthday.getDay()];

  return {
    valid: true as const,
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    bornWeekday,
    daysUntilBirthday,
    nextBdayWeekday,
  };
}

// 20. BMI Calculator
export function calculateBmi(
  unit: 'metric' | 'imperial',
  heightCmStr: string,
  weightKgStr: string,
  feetStr: string,
  inchesStr: string,
  weightLbsStr: string
) {
  let heightMeters = 0;
  let kg = 0;

  if (unit === 'metric') {
    const cm = parseFloat(heightCmStr);
    const w = parseFloat(weightKgStr);
    if (isNaN(cm) || isNaN(w) || cm <= 0 || w <= 0) {
      return {valid: false as const, error: 'Please enter positive values for height (cm) and weight (kg).'};
    }
    if (cm < 40 || cm > 280) {
      return {valid: false as const, error: 'Height should be between 40 cm and 280 cm.'};
    }
    if (w < 10 || w > 500) {
      return {valid: false as const, error: 'Weight should be between 10 kg and 500 kg.'};
    }
    heightMeters = cm / 100;
    kg = w;
  } else {
    const ft = parseFloat(feetStr);
    const inc = inchesStr.trim() ? parseFloat(inchesStr) : 0;
    const lbs = parseFloat(weightLbsStr);
    if (isNaN(ft) || isNaN(inc) || isNaN(lbs) || ft <= 0 || inc < 0 || lbs <= 0) {
      return {valid: false as const, error: 'Please enter valid positive values for feet, inches, and weight (lbs).'};
    }
    const totalInches = ft * 12 + inc;
    if (totalInches < 16 || totalInches > 110) {
      return {valid: false as const, error: 'Total height should be between 16 and 110 inches.'};
    }
    heightMeters = totalInches * 0.0254;
    kg = lbs * 0.45359237;
  }

  const bmi = kg / (heightMeters * heightMeters);
  let category = 'Normal Weight';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal Weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obesity';

  const minHealthyKg = 18.5 * heightMeters * heightMeters;
  const maxHealthyKg = 24.9 * heightMeters * heightMeters;
  const healthyRange =
    unit === 'metric'
      ? `${minHealthyKg.toFixed(1)} – ${maxHealthyKg.toFixed(1)} kg`
      : `${(minHealthyKg / 0.45359237).toFixed(0)} – ${(maxHealthyKg / 0.45359237).toFixed(0)} lbs`;

  const gaugePct = Math.min(100, Math.max(0, ((bmi - 14) / (40 - 14)) * 100));

  return {valid: true as const, bmi, category, healthyRange, gaugePct};
}

// 21. Discount Calculator
export function calculateDiscount(
  priceStr: string,
  discount1Str: string,
  discount2Str: string,
  taxRateStr: string
) {
  const p = parseFloat(priceStr);
  const d1 = discount1Str.trim() ? parseFloat(discount1Str) : 0;
  const d2 = discount2Str.trim() ? parseFloat(discount2Str) : 0;
  const tax = taxRateStr.trim() ? parseFloat(taxRateStr) : 0;

  if (isNaN(p) || p < 0) {
    return {valid: false as const, error: 'Original price must be 0 or greater.'};
  }
  if (isNaN(d1) || d1 < 0 || d1 > 100 || isNaN(d2) || d2 < 0 || d2 > 100) {
    return {valid: false as const, error: 'Discount percentages must be between 0% and 100%.'};
  }
  if (isNaN(tax) || tax < 0 || tax > 100) {
    return {valid: false as const, error: 'Tax / GST rate must be between 0% and 100%.'};
  }

  const afterFirst = p * (1 - d1 / 100);
  const afterSecond = afterFirst * (1 - d2 / 100);
  const totalSaved = p - afterSecond;
  const effectiveDiscount = p > 0 ? (totalSaved / p) * 100 : 0;
  const taxAmount = afterSecond * (tax / 100);
  const finalTotal = afterSecond + taxAmount;

  return {valid: true as const, afterSecond, totalSaved, effectiveDiscount, taxAmount, finalTotal};
}

// 22. Loan Calculator
export function calculateLoan(
  amountStr: string,
  rateStr: string,
  tenureStr: string,
  tenureUnit: 'years' | 'months'
) {
  const P = parseFloat(amountStr);
  const annualRate = parseFloat(rateStr);
  const rawTenure = parseInt(tenureStr, 10);

  if (isNaN(P) || P <= 0) {
    return {valid: false as const, error: 'Loan amount must be greater than 0.'};
  }
  if (isNaN(annualRate) || annualRate < 0 || annualRate > 100) {
    return {valid: false as const, error: 'Interest rate must be between 0% and 100%.'};
  }
  if (isNaN(rawTenure) || rawTenure <= 0) {
    return {valid: false as const, error: 'Loan tenure must be at least 1.'};
  }

  const n = tenureUnit === 'years' ? rawTenure * 12 : rawTenure;
  if (n > 600) {
    return {valid: false as const, error: 'Maximum supported loan tenure is 50 years (600 months).'};
  }

  const r = annualRate / 12 / 100;
  let emi = 0;
  if (r === 0) {
    emi = P / n;
  } else {
    const factor = Math.pow(1 + r, n);
    emi = (P * r * factor) / (factor - 1);
  }

  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - P);
  const principalPct = totalPayment > 0 ? (P / totalPayment) * 100 : 100;

  const yearly: Array<{year: number; principal: number; interest: number; balance: number}> = [];
  let balance = P;
  let yrPrincipal = 0;
  let yrInterest = 0;

  for (let m = 1; m <= n; m++) {
    const interestMonth = balance * r;
    const principalMonth = Math.min(balance, emi - interestMonth);
    balance = Math.max(0, balance - principalMonth);
    yrPrincipal += principalMonth;
    yrInterest += interestMonth;

    if (m % 12 === 0 || m === n) {
      yearly.push({
        year: Math.ceil(m / 12),
        principal: yrPrincipal,
        interest: yrInterest,
        balance,
      });
      yrPrincipal = 0;
      yrInterest = 0;
    }
  }

  return {valid: true as const, emi, totalPayment, totalInterest, principalPct, yearly, months: n};
}

// 23. Date Difference Calculator (O(1) weekday calculation!)
export function calculateDateDifference(startStr: string, endStr: string, inclusive: boolean) {
  if (!startStr || !endStr) {
    return {valid: false as const, error: 'Select both start and end dates.'};
  }
  const [sy, sm, sd] = startStr.split('-').map(Number);
  const [ey, em, ed] = endStr.split('-').map(Number);
  if (!sy || !sm || !sd || !ey || !em || !ed) {
    return {valid: false as const, error: 'Invalid date format.'};
  }

  let d1 = new Date(sy, sm - 1, sd);
  let d2 = new Date(ey, em - 1, ed);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return {valid: false as const, error: 'Invalid calendar date.'};
  }

  let swapped = false;
  if (d2 < d1) {
    swapped = true;
    const tmp = d1;
    d1 = d2;
    d2 = tmp;
  }

  const totalDaysRaw = Math.round((d2.getTime() - d1.getTime()) / 86400000);
  const totalDays = inclusive ? totalDaysRaw + 1 : totalDaysRaw;

  // Calendar Y/M/D using shifted d2 when inclusive (+1 day)
  const endAdjusted = new Date(d2.getTime());
  if (inclusive) {
    endAdjusted.setDate(endAdjusted.getDate() + 1);
  }

  let years = endAdjusted.getFullYear() - d1.getFullYear();
  let months = endAdjusted.getMonth() - d1.getMonth();
  let days = endAdjusted.getDate() - d1.getDate();

  if (days < 0) {
    const prevMonthDays = new Date(endAdjusted.getFullYear(), endAdjusted.getMonth(), 0).getDate();
    days += prevMonthDays;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // O(1) weekday count across [d1, d1 + totalDays)
  const fullWeeks = Math.floor(totalDays / 7);
  const rem = totalDays % 7;
  let extraWeekdays = 0;
  let extraWeekends = 0;
  const startDow = d1.getDay();
  for (let i = 0; i < rem; i++) {
    const dow = (startDow + i) % 7;
    if (dow === 0 || dow === 6) extraWeekends++;
    else extraWeekdays++;
  }
  const weekdays = fullWeeks * 5 + extraWeekdays;
  const weekends = fullWeeks * 2 + extraWeekends;

  return {
    valid: true as const,
    swapped,
    years,
    months,
    days,
    totalDays,
    weeks: fullWeeks,
    remDays: rem,
    weekdays,
    weekends,
    hours: totalDays * 24,
  };
}

// 24. Average Calculator
export function calculateStatistics(rawInput: string) {
  const tokens = rawInput
    .split(/[\s,;]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const nums: number[] = [];
  const invalidTokens: string[] = [];

  for (const tok of tokens) {
    const n = Number(tok);
    if (!isNaN(n) && isFinite(n)) {
      nums.push(n);
    } else {
      invalidTokens.push(tok);
    }
  }

  if (nums.length === 0) {
    return {valid: false as const, invalidTokens};
  }

  const count = nums.length;
  const sum = nums.reduce((acc, n) => acc + n, 0);
  const mean = sum / count;
  const sorted = [...nums].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const freq = new Map<number, number>();
  let maxFreq = 0;
  for (const n of nums) {
    const f = (freq.get(n) || 0) + 1;
    freq.set(n, f);
    if (f > maxFreq) maxFreq = f;
  }
  const modes =
    maxFreq > 1
      ? Array.from(freq.entries())
          .filter(([, f]) => f === maxFreq)
          .map(([val]) => val)
      : [];

  const sqDiffSum = nums.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0);
  const stdDevPop = Math.sqrt(sqDiffSum / count);
  const stdDevSample = count > 1 ? Math.sqrt(sqDiffSum / (count - 1)) : 0;

  return {
    valid: true as const,
    count,
    sum,
    mean,
    median,
    modes,
    min,
    max,
    range,
    stdDevPop,
    stdDevSample,
    invalidTokens,
  };
}

// 14. YouTube Title Generator
export type VideoStyle = 'all' | 'tutorial' | 'listicle' | 'review' | 'comparison' | 'story';

export function toTitleHeading(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function generateYoutubeTitles(
  topic: string,
  style: VideoStyle,
  modifier: string,
  seed: number
) {
  const clean = toTitleHeading(topic);
  if (!clean) {
    return {
      valid: false as const,
      error: 'Enter a video topic or keyword to generate title ideas.',
      titles: [] as Array<{style: VideoStyle; title: string; angle: string}>,
    };
  }

  const mod = modifier.trim();
  const modSuffix = mod ? ` (${mod})` : '';
  const modFor = mod ? ` ${mod}` : '';

  const pool: Array<{style: VideoStyle; title: string; angle: string}> = [
    {style: 'tutorial', title: `How to Build a ${clean} Step-by-Step${modSuffix}`, angle: 'Search & How-To'},
    {style: 'tutorial', title: `${clean} for Beginners: Complete Setup Guide${modFor}`, angle: 'Beginner Search'},
    {style: 'tutorial', title: `The Fastest Way to Master ${clean} in 15 Minutes`, angle: 'Speed & Efficiency'},
    {style: 'listicle', title: `7 ${clean} Mistakes You Need to Stop Making${modFor}`, angle: 'Negativity Bias'},
    {style: 'listicle', title: `5 ${clean} Tricks That Actually Save Hours`, angle: 'Listicle Hook'},
    {style: 'listicle', title: `10 Underrated ${clean} Features Worth Trying`, angle: 'Discovery'},
    {style: 'review', title: `${clean}: Honest Review After 30 Days`, angle: 'Credibility'},
    {style: 'review', title: `Is ${clean} Still Worth It${mod ? ` in ${mod}` : ''}?`, angle: 'Decision Intent'},
    {style: 'review', title: `Everything Nobody Tells You About ${clean}`, angle: 'Curiosity Gap'},
    {style: 'comparison', title: `Why I Switched My ${clean} (And What Changed)`, angle: 'Contrarian'},
    {style: 'comparison', title: `Simple vs. Advanced ${clean}: Which Wins?`, angle: 'Comparison'},
    {style: 'story', title: `I Tested ${clean} for 14 Days — Here’s What Happened`, angle: 'Experiment Story'},
    {style: 'story', title: `How ${clean} Completely Fixed My Daily Workflow`, angle: 'Outcome Proof'},
  ];

  const filtered = style === 'all' ? pool : pool.filter((item) => item.style === style);
  const offset = filtered.length > 0 ? seed % filtered.length : 0;
  const rotated =
    offset === 0 ? filtered : [...filtered.slice(offset), ...filtered.slice(0, offset)];

  return {valid: true as const, titles: rotated};
}

// 15. YouTube Description Generator
export function buildYoutubeDescription(parts: {
  hook: string;
  keyPoints: string;
  chapters: string;
  links: string;
  hashtags: string;
}) {
  const sections: string[] = [];
  if (parts.hook.trim()) sections.push(parts.hook.trim());
  if (parts.keyPoints.trim()) sections.push(`In this video, you'll learn:\n${parts.keyPoints.trim()}`);
  if (parts.chapters.trim()) sections.push(`Timestamps:\n${parts.chapters.trim()}`);
  if (parts.links.trim()) sections.push(`Resources & Links:\n${parts.links.trim()}`);
  if (parts.hashtags.trim()) sections.push(parts.hashtags.trim());

  const text = sections.join('\n\n');
  const charCount = text.length;
  const hookLen = parts.hook.trim().length;
  return {
    text,
    charCount,
    hookLen,
    hookExceedsLimit: hookLen > 150,
    exceedsLimit: charCount > 5000,
  };
}

// 16. Hashtag Generator
export type SocialPlatform = 'youtube' | 'instagram' | 'tiktok' | 'linkedin';

export function generateHashtags(topic: string, platform: SocialPlatform) {
  const raw = topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (raw.length === 0) {
    return {
      valid: false as const,
      error: 'Enter at least one alphanumeric keyword to generate hashtags.',
      tags: [] as string[],
    };
  }

  const pascal = raw.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const primaryWord = raw[0].charAt(0).toUpperCase() + raw[0].slice(1);
  const year = new Date().getFullYear();

  const common = [
    `#${pascal}`,
    `#${pascal}Tips`,
    `#${pascal}Guide`,
    `#${pascal}Tutorial`,
    `#${pascal}Ideas`,
    `#${pascal}${year}`,
    `#${primaryWord}`,
    `#${primaryWord}Community`,
    `#${primaryWord}Daily`,
    `#Learn${pascal}`,
    `#Best${pascal}`,
    `#${pascal}Routine`,
  ];

  const platformSpecific: Record<SocialPlatform, string[]> = {
    youtube: ['#YouTubeShorts', '#HowTo', '#VideoTutorial'],
    instagram: ['#Reels', '#InstaDaily', '#ExplorePage', '#CreatorTips'],
    tiktok: ['#TikTokTips', '#LearnOnTikTok', '#ForYou', '#DailyRoutine'],
    linkedin: ['#CareerGrowth', '#Productivity', '#ProfessionalTips', '#IndustryInsights'],
  };

  return {
    valid: true as const,
    tags: Array.from(new Set([...common, ...platformSpecific[platform]])),
  };
}

// 17. YouTube Earnings Calculator
export const RPM_PRESETS = [
  {id: 'us-finance', label: 'USA / UK — Finance & Business ($12.00 RPM)', rpm: 12.0},
  {id: 'us-tech', label: 'USA / UK / CA / AU — Tech & Software ($6.50 RPM)', rpm: 6.5},
  {id: 'global-edu', label: 'Global — Education & Tutorials ($4.20 RPM)', rpm: 4.2},
  {id: 'global-ent', label: 'Global — Gaming & Entertainment ($2.10 RPM)', rpm: 2.1},
  {id: 'in-general', label: 'India — General / Education ($0.90 RPM)', rpm: 0.9},
  {id: 'shorts', label: 'YouTube Shorts — Blended ($0.07 RPM)', rpm: 0.07},
];

export function calculateYoutubeEarnings(dailyViewsStr: string, rpmStr: string) {
  const views = Number(dailyViewsStr);
  const rpm = Number(rpmStr);
  if (!dailyViewsStr.trim() || isNaN(views) || !isFinite(views) || views < 0) {
    return {valid: false as const, error: 'Daily views must be 0 or greater.'};
  }
  if (!rpmStr.trim() || isNaN(rpm) || !isFinite(rpm) || rpm < 0 || rpm > 250) {
    return {valid: false as const, error: 'RPM must be between $0.00 and $250.00.'};
  }
  const daily = (views / 1000) * rpm;
  const monthly = daily * 30;
  const yearly = daily * 365;
  return {
    valid: true as const,
    views,
    rpm,
    daily,
    monthly,
    yearly,
    lowMonthly: monthly * 0.7,
    highMonthly: monthly * 1.35,
  };
}

// 18. YouTube Title Character Counter
export function estimatePixelWidth(text: string): number {
  let px = 0;
  for (const ch of text) {
    if ("ilI.,!|':; ".includes(ch)) px += 4.2;
    else if ('mwMW@%'.includes(ch)) px += 12.5;
    else if (ch >= 'A' && ch <= 'Z') px += 9.8;
    else px += 7.6;
  }
  return Math.round(px);
}

export function analyzeTitleLength(title: string) {
  const chars = title.length;
  const pixels = estimatePixelWidth(title);
  return {
    chars,
    pixels,
    mobileTruncated: chars > 55,
    serpTruncated: chars > 60 || pixels > 580,
    ytDesktopTruncated: chars > 70,
    ytMaxExceeded: chars > 100,
    mobilePreview: chars > 55 ? title.slice(0, 52).trimEnd() + '...' : title,
    serpPreview: chars > 60 ? title.slice(0, 57).trimEnd() + '...' : title,
    desktopPreview: chars > 70 ? title.slice(0, 67).trimEnd() + '...' : title,
  };
}

// 26. Image Resizer dimension validation
export function validateResizeDimensions(wStr: string, hStr: string) {
  const w = Number(wStr);
  const h = Number(hStr);
  if (!wStr.trim() || !hStr.trim() || !Number.isInteger(w) || !Number.isInteger(h)) {
    return {valid: false as const, error: 'Enter whole pixel integers for width and height.'};
  }
  if (w < 1 || w > 8000 || h < 1 || h > 8000) {
    return {valid: false as const, error: 'Width and height must be between 1 px and 8,000 px.'};
  }
  return {valid: true as const, width: w, height: h};
}

