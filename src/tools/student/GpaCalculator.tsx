import {Plus, RotateCcw, Trash2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {calculateGpa, GRADE_POINTS} from '../../utils/toolCalculations';

interface CourseRow {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const DEFAULT_COURSES: CourseRow[] = [
  {id: 1, name: 'Calculus II', grade: 'A', credits: '4'},
  {id: 2, name: 'Physics I', grade: 'B+', credits: '3'},
  {id: 3, name: 'Academic Writing', grade: 'A-', credits: '3'},
  {id: 4, name: 'Computer Lab', grade: 'A', credits: '2'},
];

export default function GpaCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>(DEFAULT_COURSES);
  const [priorGpa, setPriorGpa] = useState('');
  const [priorCredits, setPriorCredits] = useState('');

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {id: Date.now(), name: `Course ${prev.length + 1}`, grade: 'A', credits: '3'},
    ]);
  };

  const removeCourse = (id: number) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof CourseRow, val: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? {...c, [field]: val} : c)));
  };

  const summary = useMemo(
    () => calculateGpa(courses, priorGpa, priorCredits),
    [courses, priorGpa, priorCredits]
  );

  return (
    <div className="space-y-6">
      {summary.errors.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          <ul className="list-disc space-y-1 pl-4">
            {summary.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2B8A8] bg-[#FAF0EB] p-4 dark:border-[#5C3123] dark:bg-[#2A1B16]">
          <div className="text-xs font-medium text-[#A6411E] dark:text-[#E06D4B]">Semester GPA</div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {summary.semesterGpa.toFixed(2)}{' '}
            <span className="text-base font-medium text-[#78716C]">/ 4.00</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
            {summary.hasPrior ? 'Updated Cumulative GPA' : 'Quality Points'}
          </div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {summary.hasPrior ? summary.cumulativeGpa.toFixed(2) : summary.semPoints.toFixed(1)}
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
          <div className="text-xs font-medium text-[#78716C] dark:text-[#9E978B]">
            {summary.hasPrior ? 'Total Combined Credits' : 'Semester Credits'}
          </div>
          <div className="font-display tabular-nums mt-1 text-3xl font-bold text-[#1C1B19] dark:text-[#F5F2EB]">
            {summary.totalCredits}
          </div>
        </div>
      </div>

      {/* Optional Prior Cumulative GPA */}
      <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 dark:border-[#2E2A26] dark:bg-[#141312]">
        <div className="mb-2.5 text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
          Optional: Include Prior Cumulative GPA
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="prior-gpa" className="mb-1 block text-xs text-[#78716C] dark:text-[#9E978B]">
              Previous Cumulative GPA (0.0 – 4.0)
            </label>
            <input
              id="prior-gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={priorGpa}
              onChange={(e) => setPriorGpa(e.target.value)}
              placeholder="e.g., 3.55"
              className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
            />
          </div>
          <div>
            <label htmlFor="prior-credits" className="mb-1 block text-xs text-[#78716C] dark:text-[#9E978B]">
              Previous Completed Credits
            </label>
            <input
              id="prior-credits"
              type="number"
              step="0.5"
              min="0"
              value={priorCredits}
              onChange={(e) => setPriorCredits(e.target.value)}
              placeholder="e.g., 45"
              className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
            />
          </div>
        </div>
      </div>

      {/* Course Table */}
      <div className="space-y-3">
        <div className="hidden grid-cols-12 gap-3 px-1 text-xs font-semibold text-[#78716C] sm:grid dark:text-[#9E978B]">
          <div className="col-span-5">Course Name</div>
          <div className="col-span-3">Letter Grade</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-1 text-right">Remove</div>
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-1 gap-3 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:bg-transparent sm:p-0 dark:border-[#2E2A26] dark:bg-[#141312] sm:dark:bg-transparent"
          >
            <div className="sm:col-span-5">
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                aria-label="Course name"
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>
            <div className="sm:col-span-3">
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                aria-label="Letter grade"
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm font-medium text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              >
                {Object.entries(GRADE_POINTS).map(([letter, pts]) => (
                  <option key={letter} value={letter}>
                    {letter} ({pts.toFixed(1)})
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3">
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                aria-label="Credits"
                className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
              />
            </div>
            <div className="flex justify-end sm:col-span-1">
              <button
                type="button"
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                aria-label={`Remove ${course.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E2D8] text-[#78716C] hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40 dark:border-[#2E2A26] dark:hover:bg-rose-950/40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={addCourse}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#A6411E]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Course
        </button>
        <button
          type="button"
          onClick={() => {
            setCourses([{id: 1, name: 'Course 1', grade: 'A', credits: '3'}]);
            setPriorGpa('');
            setPriorCredits('');
          }}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
