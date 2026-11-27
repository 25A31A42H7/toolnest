export type CategoryId =
  | 'text-tools'
  | 'student-tools'
  | 'youtube-tools'
  | 'calculator-tools'
  | 'image-tools';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  accentColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'text-tools',
    name: 'Text Tools',
    shortName: 'Text',
    slug: '/category/text-tools',
    description:
      'Analyze, format, clean, and transform text in seconds. Built for writers, students, SEO editors, and developers.',
    seoTitle: 'Free Online Text Tools – Word Counter, Case Converter & Formatters | ToolNest',
    seoDescription:
      'Use free browser-based text utilities including Word Counter, Character Counter, Case Converter, Extra Space Remover, and URL Slug Generator.',
    accentColor: 'blue',
  },
  {
    id: 'student-tools',
    name: 'Student Tools',
    shortName: 'Student',
    slug: '/category/student-tools',
    description:
      'Plan semesters, convert grades, track class attendance, and organize exam preparation across 10.0 and 4.0 grading scales.',
    seoTitle: 'Free Student Calculators – CGPA, GPA, Attendance & Marks | ToolNest',
    seoDescription:
      'Calculate CGPA, semester GPA, attendance buffers, study schedules, and exam percentages instantly with free online student tools.',
    accentColor: 'indigo',
  },
  {
    id: 'youtube-tools',
    name: 'YouTube Tools',
    shortName: 'YouTube',
    slug: '/category/youtube-tools',
    description:
      'Craft clickable video titles, structure SEO descriptions, research hashtags, and estimate channel ad revenue.',
    seoTitle: 'Free YouTube Creator Tools – Title, Description & Earnings | ToolNest',
    seoDescription:
      'Optimize YouTube videos with free title generators, structured description builders, hashtag tools, and RPM earnings estimators.',
    accentColor: 'purple',
  },
  {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    shortName: 'Calculators',
    slug: '/category/calculator-tools',
    description:
      'Fast, accurate everyday calculators for age, BMI, retail discounts, loan EMI schedules, date intervals, and statistics.',
    seoTitle: 'Free Everyday Calculators – Age, BMI, Loan EMI & Discounts | ToolNest',
    seoDescription:
      'Run accurate calculations for exact age, BMI health range, shopping discounts, monthly loan EMI, date differences, and averages.',
    accentColor: 'blue',
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    shortName: 'Images',
    slug: '/category/image-tools',
    description:
      'Compress, resize, and convert JPG and PNG files locally in your browser without uploading photos to any server.',
    seoTitle: 'Free Browser Image Tools – Compress, Resize & Convert JPG/PNG | ToolNest',
    seoDescription:
      'Compress images, resize dimensions, and convert between JPG and PNG privately inside your browser with zero file uploads.',
    accentColor: 'violet',
  },
];

export function getCategoryById(id: CategoryId): CategoryInfo {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}
