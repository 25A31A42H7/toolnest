import {describe, expect, test} from 'bun:test';
import {
  analyzeCharacters,
  analyzeTitleLength,
  analyzeWordText,
  buildYoutubeDescription,
  calculateAge,
  calculateAttendance,
  calculateBmi,
  calculateCgpa,
  calculateDateDifference,
  calculateDiscount,
  calculateGpa,
  calculateLoan,
  calculateMarks,
  calculatePercentage,
  calculateStatistics,
  calculateStudyPlan,
  calculateYoutubeEarnings,
  cleanExtraSpaces,
  deduplicateLines,
  generateHashtags,
  generateYoutubeTitles,
  makeSlug,
  reverseText,
  splitWordsForCode,
  toSentenceCase,
  toTitleCase,
  validateResizeDimensions,
} from '../src/utils/toolCalculations';
import {formatBytes, sanitizeBaseName} from '../src/tools/image/imageUtils';

describe('Text Tools', () => {
  test('Word Counter handles empty, normal, and multi-line text', () => {
    expect(analyzeWordText('').wordCount).toBe(0);
    expect(analyzeWordText('   \n  ').wordCount).toBe(0);
    const res = analyzeWordText('Hello world!\nSecond sentence here.');
    expect(res.wordCount).toBe(5);
    expect(res.sentences).toBe(2);
    expect(res.paragraphs).toBe(2);
    expect(res.lines).toBe(2);
  });

  test('Character Counter tracks UTF-8 bytes and spaces', () => {
    const res = analyzeCharacters('Hi 👋');
    expect(res.withSpaces).toBe(5); // JS UTF-16 length for surrogate pair
    expect(res.withoutSpaces).toBe(4);
    expect(res.utf8Bytes).toBe(7); // H(1)+i(1)+space(1)+emoji(4)
  });

  test('Case Converter handles Title Case, Sentence case, and code tokens', () => {
    expect(toTitleCase('how to build a tool in 2026')).toBe('How to Build a Tool in 2026');
    expect(toSentenceCase('HELLO WORLD. HOW ARE YOU?')).toBe('Hello world. How are you?');
    expect(splitWordsForCode('helloWorld! test_case-1')).toEqual(['hello', 'World', 'test', 'case', '1']);
  });

  test('Remove Extra Spaces collapses spaces, tabs, and optional blank lines', () => {
    const res = cleanExtraSpaces('  hello   world\t!\n\nline  2 ', {
      collapseSpaces: true,
      trimLines: true,
      removeBlankLines: true,
      convertTabs: true,
    });
    expect(res.output).toBe('hello world !\nline 2');
  });

  test('Text Reverser supports Unicode and word order safely', () => {
    expect(reverseText('abc 👋', 'chars')).toBe('👋 cba');
    expect(reverseText('one two three', 'words')).toBe('three two one');
    expect(reverseText('abc def', 'each-word')).toBe('cba fed');
    expect(reverseText('a\nb\nc', 'lines')).toBe('c\nb\na');
  });

  test('Duplicate Line Remover distinguishes duplicates from empty lines', () => {
    const res = deduplicateLines('apple\n\nApple\nbanana\napple ', {
      caseSensitive: false,
      trimLines: true,
      removeEmpty: true,
      sortOrder: 'asc',
    });
    expect(res.output).toBe('apple\nbanana');
    expect(res.duplicatesRemoved).toBe(2);
    expect(res.emptyRemoved).toBe(1);
  });

  test('Text to Slug strips accents, symbols, and optional stop words', () => {
    expect(makeSlug('Café & Croissant Guide 2026!', '-', false)).toBe('cafe-and-croissant-guide-2026');
    expect(makeSlug('The Best Tools for Students', '-', true)).toBe('best-tools-students');
    expect(makeSlug('!!!', '-', false)).toBe('');
  });
});

describe('Student Tools', () => {
  test('CGPA Calculator computes weighted CGPA and flags invalid values', () => {
    const res = calculateCgpa(
      [
        {name: 'Sem 1', sgpa: '8.4', credits: '20'},
        {name: 'Sem 2', sgpa: '8.8', credits: '22'},
        {name: 'Sem 3', sgpa: '9.1', credits: '24'},
        {name: 'Sem 4', sgpa: '8.9', credits: '22'},
      ],
      10,
      '9.5'
    );
    expect(res.errors).toHaveLength(0);
    expect(res.totalCredits).toBe(88);
    expect(res.cgpa).toBeCloseTo(8.8159, 3);

    const invalid = calculateCgpa([{name: 'Sem 1', sgpa: '12', credits: '20'}], 10, '9.5');
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  test('GPA Calculator combines prior GPA and semester courses', () => {
    const res = calculateGpa(
      [
        {name: 'Math', grade: 'A', credits: '4'},
        {name: 'Eng', grade: 'B', credits: '4'},
      ],
      '3.0',
      '8'
    );
    expect(res.errors).toHaveLength(0);
    expect(res.semesterGpa).toBeCloseTo(3.5, 2);
    expect(res.cumulativeGpa).toBeCloseTo(3.25, 2);
  });

  test('Percentage Calculator handles all 4 modes and division by zero', () => {
    expect(calculatePercentage('percent-of', '25', '400').numeric).toBe(100);
    expect(calculatePercentage('what-percent', '50', '200').numeric).toBe(25);
    expect(calculatePercentage('percent-change', '100', '150').numeric).toBe(50);
    expect(calculatePercentage('what-percent', '50', '0').valid).toBe(false);
  });

  test('Attendance Calculator calculates safe misses and recovery classes', () => {
    const safe = calculateAttendance('32', '40', '75');
    expect(safe.valid).toBe(true);
    if (safe.valid) {
      expect(safe.status).toBe('safe');
      expect(safe.count).toBe(2);
    }

    const short = calculateAttendance('20', '40', '75');
    expect(short.valid).toBe(true);
    if (short.valid) {
      expect(short.status).toBe('short');
      expect(short.count).toBe(40);
    }

    expect(calculateAttendance('45', '40', '75').valid).toBe(false);
    expect(calculateAttendance('10', '20', '100').valid).toBe(false);
  });

  test('Study Time Calculator checks feasibility and Pomodoro sessions', () => {
    const plan = calculateStudyPlan('10', '2', '4', '6', '5', 25);
    expect(plan.valid).toBe(true);
    if (plan.valid) {
      expect(plan.totalHours).toBe(24);
      expect(plan.hoursPerDay).toBe(4);
      expect(plan.feasible).toBe(true);
    }
    expect(calculateStudyPlan('0', '2', '0', '5', '4', 25).valid).toBe(false);
  });

  test('Marks Calculator prevents obtained > max and computes division', () => {
    const ok = calculateMarks(
      [
        {name: 'Math', obtained: '90', max: '100'},
        {name: 'Lab', obtained: '45', max: '50'},
      ],
      '35'
    );
    expect(ok.errors).toHaveLength(0);
    expect(ok.overallPct).toBeCloseTo(90, 2);
    expect(ok.division).toBe('Distinction');

    const bad = calculateMarks([{name: 'Math', obtained: '105', max: '100'}], '35');
    expect(bad.errors.length).toBeGreaterThan(0);
  });
});

describe('YouTube Tools', () => {
  test('YouTube Title Generator validates empty topic and rotates titles', () => {
    expect(generateYoutubeTitles('   ', 'all', '2026', 0).valid).toBe(false);
    const res = generateYoutubeTitles('python automation', 'tutorial', '2026', 1);
    expect(res.valid).toBe(true);
    expect(res.titles).toHaveLength(3);
    expect(res.titles[0].title).toContain('Python Automation');
  });

  test('YouTube Description Generator tracks total length and 5000-char limit', () => {
    const res = buildYoutubeDescription({
      hook: 'Quick guide to tools.',
      keyPoints: '- Step 1',
      chapters: '00:00 Intro',
      links: '',
      hashtags: '#Tools',
    });
    expect(res.exceedsLimit).toBe(false);
    expect(res.text).toContain('Timestamps:\n00:00 Intro');

    const overflow = buildYoutubeDescription({
      hook: 'A'.repeat(5001),
      keyPoints: '',
      chapters: '',
      links: '',
      hashtags: '',
    });
    expect(overflow.exceedsLimit).toBe(true);
  });

  test('Hashtag Generator requires alphanumeric keyword and builds unique platform tags', () => {
    expect(generateHashtags('!!!', 'youtube').valid).toBe(false);
    const res = generateHashtags('home workout', 'youtube');
    expect(res.valid).toBe(true);
    expect(res.tags).toContain('#HomeWorkout');
    expect(res.tags).toContain('#YouTubeShorts');
  });

  test('YouTube Earnings Calculator computes daily/monthly/yearly estimates and validates inputs', () => {
    const res = calculateYoutubeEarnings('25000', '4.2');
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.daily).toBeCloseTo(105, 2);
      expect(res.monthly).toBeCloseTo(3150, 2);
      expect(res.yearly).toBeCloseTo(38325, 2);
    }
    expect(calculateYoutubeEarnings('-5', '4.2').valid).toBe(false);
    expect(calculateYoutubeEarnings('1000', '300').valid).toBe(false);
  });

  test('YouTube Title Character Counter flags mobile, SERP, and 100-char YouTube limits', () => {
    const short = analyzeTitleLength('Short SEO Title');
    expect(short.mobileTruncated).toBe(false);
    expect(short.ytMaxExceeded).toBe(false);

    const long = analyzeTitleLength('W'.repeat(105));
    expect(long.ytMaxExceeded).toBe(true);
    expect(long.serpTruncated).toBe(true);
  });
});

describe('Calculator Tools', () => {
  test('Age Calculator handles standard and Feb 29 leap-year birthdays', () => {
    const res = calculateAge('2000-02-29', '2026-03-01');
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.years).toBe(26);
      expect(res.daysUntilBirthday).toBeGreaterThan(360);
    }
    expect(calculateAge('2030-01-01', '2026-01-01').valid).toBe(false);
  });

  test('BMI Calculator supports metric and imperial accurately', () => {
    const metric = calculateBmi('metric', '175', '70', '', '', '');
    expect(metric.valid).toBe(true);
    if (metric.valid) {
      expect(metric.bmi).toBeCloseTo(22.86, 1);
      expect(metric.category).toBe('Normal Weight');
    }
    const imp = calculateBmi('imperial', '', '', '5', '9', '154');
    expect(imp.valid).toBe(true);
    if (imp.valid) {
      expect(imp.bmi).toBeCloseTo(22.7, 1);
    }
    expect(calculateBmi('metric', '-10', '70', '', '', '').valid).toBe(false);
  });

  test('Discount Calculator stacks discounts and applies tax accurately', () => {
    const res = calculateDiscount('100', '30', '10', '10');
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.afterSecond).toBeCloseTo(63, 2);
      expect(res.effectiveDiscount).toBeCloseTo(37, 2);
      expect(res.finalTotal).toBeCloseTo(69.3, 2);
    }
    expect(calculateDiscount('100', '120', '0', '0').valid).toBe(false);
  });

  test('Loan Calculator computes EMI, zero-interest loans, and rejects invalid tenure', () => {
    const res = calculateLoan('25000', '6.5', '5', 'years');
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.emi).toBeCloseTo(489.15, 2);
      expect(res.yearly[res.yearly.length - 1].balance).toBeCloseTo(0, 2);
    }
    const zeroRate = calculateLoan('12000', '0', '12', 'months');
    expect(zeroRate.valid).toBe(true);
    if (zeroRate.valid) {
      expect(zeroRate.emi).toBeCloseTo(1000, 2);
    }
    expect(calculateLoan('10000', '5', '100', 'years').valid).toBe(false);
  });

  test('Date Difference Calculator handles inclusive dates and O(1) weekday counts', () => {
    const res = calculateDateDifference('2026-03-02', '2026-03-08', true);
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.totalDays).toBe(7);
      expect(res.weekdays).toBe(5);
      expect(res.weekends).toBe(2);
    }

    const century = calculateDateDifference('1926-01-01', '2026-01-01', false);
    expect(century.valid).toBe(true);
    if (century.valid) {
      expect(century.years).toBe(100);
    }
  });

  test('Average Calculator computes Mean, Median, Mode, and flags invalid tokens', () => {
    const res = calculateStatistics('10, 20, 20, abc, 30');
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.count).toBe(4);
      expect(res.mean).toBe(20);
      expect(res.median).toBe(20);
      expect(res.modes).toEqual([20]);
      expect(res.invalidTokens).toEqual(['abc']);
    }
  });
});

describe('Image Tool Helpers', () => {
  test('formatBytes and sanitizeBaseName format filenames cleanly', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(2 * 1024 * 1024)).toBe('2.00 MB');
    expect(sanitizeBaseName('My Photo (Final).jpg')).toBe('My-Photo-Final');
    expect(sanitizeBaseName('...png')).toBe('image');
  });

  test('validateResizeDimensions enforces integer pixel bounds (1–8000)', () => {
    expect(validateResizeDimensions('1280', '720').valid).toBe(true);
    expect(validateResizeDimensions('0', '720').valid).toBe(false);
    expect(validateResizeDimensions('1280.5', '720').valid).toBe(false);
    expect(validateResizeDimensions('9000', '720').valid).toBe(false);
  });
});

