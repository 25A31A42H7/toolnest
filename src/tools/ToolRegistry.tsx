import React, {lazy, Suspense} from 'react';

const TOOL_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'word-counter': lazy(() => import('./text/WordCounter')),
  'character-counter': lazy(() => import('./text/CharacterCounter')),
  'case-converter': lazy(() => import('./text/CaseConverter')),
  'remove-extra-spaces': lazy(() => import('./text/RemoveExtraSpaces')),
  'text-reverser': lazy(() => import('./text/TextReverser')),
  'duplicate-line-remover': lazy(() => import('./text/DuplicateLineRemover')),
  'text-to-slug-converter': lazy(() => import('./text/TextToSlugConverter')),

  'cgpa-calculator': lazy(() => import('./student/CgpaCalculator')),
  'gpa-calculator': lazy(() => import('./student/GpaCalculator')),
  'percentage-calculator': lazy(() => import('./student/PercentageCalculator')),
  'attendance-calculator': lazy(() => import('./student/AttendanceCalculator')),
  'study-time-calculator': lazy(() => import('./student/StudyTimeCalculator')),
  'marks-calculator': lazy(() => import('./student/MarksCalculator')),

  'youtube-title-generator': lazy(() => import('./youtube/YoutubeTitleGenerator')),
  'youtube-description-generator': lazy(() => import('./youtube/YoutubeDescriptionGenerator')),
  'hashtag-generator': lazy(() => import('./youtube/HashtagGenerator')),
  'youtube-earnings-calculator': lazy(() => import('./youtube/YoutubeEarningsCalculator')),
  'youtube-title-character-counter': lazy(() => import('./youtube/YoutubeTitleCharacterCounter')),

  'age-calculator': lazy(() => import('./calculator/AgeCalculator')),
  'bmi-calculator': lazy(() => import('./calculator/BmiCalculator')),
  'discount-calculator': lazy(() => import('./calculator/DiscountCalculator')),
  'loan-calculator': lazy(() => import('./calculator/LoanCalculator')),
  'date-difference-calculator': lazy(() => import('./calculator/DateDifferenceCalculator')),
  'average-calculator': lazy(() => import('./calculator/AverageCalculator')),

  'image-compressor': lazy(() => import('./image/ImageCompressor')),
  'image-resizer': lazy(() => import('./image/ImageResizer')),
  'jpg-to-png-converter': lazy(() => import('./image/JpgToPngConverter')),
  'png-to-jpg-converter': lazy(() => import('./image/PngToJpgConverter')),
};

export function ToolWorkspace({toolId}: {toolId: string}) {
  const Component = TOOL_COMPONENTS[toolId];
  if (!Component) {
    return (
      <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-6 text-sm text-[#57534E] dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#B8B2A6]">
        Tool interface not found.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="space-y-4 py-6" aria-busy="true" aria-label="Loading interactive tool">
          <div className="h-10 w-1/3 animate-pulse rounded-lg bg-[#EDE8DF] dark:bg-[#2E2A26]" />
          <div className="h-44 w-full animate-pulse rounded-xl bg-[#F4F0E8] dark:bg-[#191715]" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}
