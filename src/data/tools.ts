import {CategoryId} from './categories';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: CategoryId;
  iconName: string;
  popular?: boolean;
  recent?: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  intro: string;
  instructions: string[];
  example: {
    title: string;
    input: string;
    output: string;
  };
  benefits: string[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
}

export const TOOLS: ToolDefinition[] = [
  // ================= A. TEXT TOOLS =================
  {
    id: 'word-counter',
    slug: '/word-counter',
    name: 'Word Counter',
    shortDesc: 'Count words, characters, sentences, paragraphs, and reading time instantly.',
    category: 'text-tools',
    iconName: 'FileText',
    popular: true,
    keywords: ['word count', 'word counter online', 'essay word counter', 'reading time', 'keyword density'],
    seoTitle: 'Free Word Counter Online – Count Words & Reading Time | ToolNest',
    seoDescription:
      'Count words, characters, sentences, paragraphs, and estimated reading time in real time. Ideal for essays, blog posts, and SEO writing.',
    intro:
      'Whether you are drafting an academic essay with a strict word limit or optimizing an article for search engines, accurate text metrics keep your writing concise and well-paced. Our Word Counter calculates counts locally in your browser as you type.',
    instructions: [
      'Paste or type your essay, blog post, or notes into the main text editor.',
      'Review the live summary bar above the editor for words, characters, sentences, and paragraphs.',
      'Check estimated reading time (200 WPM) and speaking time (130 WPM) for presentations.',
      'Inspect the Top Keywords breakdown below to catch accidental word repetition.',
    ],
    example: {
      title: 'Blog Paragraph Check',
      input: 'ToolNest helps students and writers count words accurately. Fast, private, and free.',
      output: '13 words · 86 characters (with spaces) · 2 sentences · 1 paragraph · 4 sec read',
    },
    benefits: [
      'Real-time updates with zero page reloads or character caps.',
      'Tracks both reading time and speech presentation duration.',
      'Extracts top keyword frequency for natural SEO editing.',
      'Private browser execution—your drafts never leave your device.',
    ],
    faqs: [
      {
        question: 'How are words counted in the Word Counter?',
        answer:
          'Words are split by whitespace boundaries after normalizing extra spaces, hyphenated words count as single tokens unless separated by spaces, matching standard word processors.',
      },
      {
        question: 'Is there a maximum text length?',
        answer:
          'No artificial limit is enforced. Modern browsers easily handle full chapters or 50,000+ word manuscripts instantaneously.',
      },
      {
        question: 'Does ToolNest save or store my writing?',
        answer:
          'Never. All counting happens directly in JavaScript inside your browser tab with zero server transmission.',
      },
    ],
    relatedSlugs: ['/character-counter', '/case-converter', '/remove-extra-spaces', '/text-to-slug-converter'],
  },
  {
    id: 'character-counter',
    slug: '/character-counter',
    name: 'Character Counter',
    shortDesc: 'Measure exact character counts with and without spaces plus social platform limits.',
    category: 'text-tools',
    iconName: 'Hash',
    popular: true,
    keywords: ['character count', 'letter counter', 'tweet length', 'meta description length', 'utf8 bytes'],
    seoTitle: 'Character Counter Online – Check Spaces & Platform Limits | ToolNest',
    seoDescription:
      'Check exact character counts with and without spaces, UTF-8 byte size, and live progress bars for Google SEO, X, Instagram, and LinkedIn.',
    intro:
      'Digital platforms enforce strict character limits on headlines, meta descriptions, ad copy, and social captions. This Character Counter tracks your exact character count alongside visual limit bars for search snippets and social posts.',
    instructions: [
      'Type or paste your headline, caption, or meta description into the editor.',
      'Compare Characters (with spaces) and Characters (no spaces) in the top metric strip.',
      'Monitor the Platform Limits panel to ensure your text fits Google SEO titles (60 chars), meta descriptions (160 chars), or X posts (280 chars).',
      'Copy the finalized text directly to your clipboard when ready.',
    ],
    example: {
      title: 'SEO Meta Description Check',
      input: 'Calculate your semester GPA and cumulative CGPA quickly with our free online calculator.',
      output: '87 characters (with spaces) · 75 without spaces · 13 words · Fits Google 160-char limit',
    },
    benefits: [
      'Displays both with-spaces and without-spaces totals side by side.',
      'Includes UTF-8 byte length for database columns and SMS segments.',
      'Live visual indicators for SEO, X/Twitter, Instagram, and LinkedIn limits.',
      'One-click copy and clear controls for rapid iteration.',
    ],
    faqs: [
      {
        question: 'Do spaces and punctuation count as characters?',
        answer:
          'Yes, platforms like Google, X, and database fields count spaces and punctuation. We show both totals so you can verify either requirement.',
      },
      {
        question: 'Why does UTF-8 byte size matter?',
        answer:
          'Emojis and non-Latin characters take 2 to 4 bytes each in UTF-8. Knowing byte size helps developers stay inside SMS or SQL column limits.',
      },
      {
        question: 'What is the ideal length for a Google meta description?',
        answer:
          'Aim for 120 to 158 characters so your full summary displays cleanly without truncation on desktop and mobile search results.',
      },
    ],
    relatedSlugs: ['/word-counter', '/youtube-title-character-counter', '/case-converter', '/text-to-slug-converter'],
  },
  {
    id: 'case-converter',
    slug: '/case-converter',
    name: 'Case Converter',
    shortDesc: 'Switch text between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.',
    category: 'text-tools',
    iconName: 'CaseSensitive',
    popular: true,
    keywords: ['case converter', 'uppercase to lowercase', 'title case converter', 'camelcase', 'snake_case'],
    seoTitle: 'Online Case Converter – Title Case, Uppercase & CamelCase | ToolNest',
    seoDescription:
      'Convert text effortlessly between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.',
    intro:
      'Accidentally left Caps Lock on, or need to reformat headline capitalization and variable names? Our Case Converter transforms any block of text across nine editorial and programming naming conventions in one click.',
    instructions: [
      'Paste your unformatted text into the input area.',
      'Select your desired transformation button such as Title Case, Sentence case, UPPERCASE, or snake_case.',
      'Review the converted text immediately in the editor.',
      'Click Copy Text or Download TXT to save your formatted output.',
    ],
    example: {
      title: 'Headline Formatting',
      input: 'how to calculate cgpa from percentage in college',
      output: 'Title Case: How to Calculate Cgpa from Percentage in College · snake_case: how_to_calculate_cgpa_from_percentage_in_college',
    },
    benefits: [
      'Supports 9 formats covering editorial writing and software engineering.',
      'Smart Title Case keeps minor English conjunctions and prepositions lowercase.',
      'Instant Undo option if you want to test another format on your original text.',
      'Download results directly as a clean .txt file.',
    ],
    faqs: [
      {
        question: 'How does Sentence case work?',
        answer:
          'Sentence case converts all characters to lowercase and then capitalizes the first letter after sentence-ending punctuation (periods, question marks, exclamation points).',
      },
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer:
          'camelCase keeps the first word lowercase (myVariableName), while PascalCase capitalizes every word including the first (MyClassName).',
      },
      {
        question: 'Can I convert multi-paragraph documents?',
        answer:
          'Yes, line breaks and paragraph structure are preserved across editorial case conversions.',
      },
    ],
    relatedSlugs: ['/word-counter', '/remove-extra-spaces', '/text-to-slug-converter', '/duplicate-line-remover'],
  },
  {
    id: 'remove-extra-spaces',
    slug: '/remove-extra-spaces',
    name: 'Remove Extra Spaces',
    shortDesc: 'Strip double spaces, trailing whitespace, tabs, and unwanted blank lines cleanly.',
    category: 'text-tools',
    iconName: 'Space',
    keywords: ['remove extra spaces', 'whitespace remover', 'clean text', 'remove blank lines', 'trim spaces'],
    seoTitle: 'Remove Extra Spaces Online – Clean Whitespace & Blank Lines | ToolNest',
    seoDescription:
      'Clean messy copy-pasted text by removing duplicate spaces, leading/trailing spaces, tabs, and blank lines instantly in your browser.',
    intro:
      'Text copied from PDFs, emails, or web tables often carries hidden double spaces, awkward line breaks, and trailing tabs. This whitespace cleaner normalizes your formatting while showing exact character savings.',
    instructions: [
      'Paste messy text copied from a PDF, document, or webpage.',
      'Choose formatting toggles: collapse multiple spaces, trim line edges, or remove empty lines.',
      'Click Clean Whitespace to process the text immediately.',
      'Copy the clean result into your document or CMS.',
    ],
    example: {
      title: 'PDF Copy Cleanup',
      input: 'Free   online   tools   for   everyday    tasks.  ',
      output: 'Free online tools for everyday tasks.',
    },
    benefits: [
      'Fixes broken spacing from PDF copy-pasting in one click.',
      'Granular checkboxes let you keep or strip empty paragraph breaks.',
      'Converts irregular tabs into clean single spaces.',
      'Displays exact count of removed whitespace characters.',
    ],
    faqs: [
      {
        question: 'Will this delete paragraph breaks I want to keep?',
        answer:
          'Only if you enable "Remove all blank lines". Leaving that unchecked preserves intentional paragraph breaks while removing double spaces inside lines.',
      },
      {
        question: 'Does it remove non-breaking spaces (&nbsp;)?',
        answer:
          'Yes, the cleaner normalizes standard spaces, tabs, and Unicode non-breaking spaces into clean single ASCII spaces.',
      },
      {
        question: 'Can I clean code or CSV text with it?',
        answer:
          'Be careful with indentation-sensitive code like Python, as trimming leading spaces removes indentation.',
      },
    ],
    relatedSlugs: ['/duplicate-line-remover', '/case-converter', '/word-counter', '/text-reverser'],
  },
  {
    id: 'text-reverser',
    slug: '/text-reverser',
    name: 'Text Reverser',
    shortDesc: 'Reverse characters, flip word order, invert each word, or reverse list lines.',
    category: 'text-tools',
    iconName: 'ArrowLeftRight',
    keywords: ['reverse text', 'backwards text generator', 'reverse word order', 'reverse lines'],
    seoTitle: 'Text Reverser Online – Flip Characters, Words & Lines | ToolNest',
    seoDescription:
      'Reverse entire text strings, flip word order, reverse individual words, or invert line order instantly for puzzles, data lists, and testing.',
    intro:
      'Whether you are flipping a chronological list upside down, testing palindrome logic, or generating backwards text for creative formatting, our Text Reverser offers four precise reversal modes.',
    instructions: [
      'Enter or paste your text or multi-line list into the input box.',
      'Select a mode: Reverse All Characters, Reverse Word Order, Reverse Each Word, or Reverse Line Order.',
      'View the live output on the right panel.',
      'Copy the reversed output to your clipboard.',
    ],
    example: {
      title: 'Reverse Word Order',
      input: 'Build fast websites today',
      output: 'today websites fast Build (or "yadot setisbew tsaf dliuB" in full character mode)',
    },
    benefits: [
      'Four distinct reversal modes for lists, sentences, and character strings.',
      'Handles multi-byte Unicode characters and emojis safely.',
      'Instant side-by-side live preview without extra clicks.',
      'Useful for reversing chronological logs and testing UI layouts.',
    ],
    faqs: [
      {
        question: 'What is the difference between Reverse Word Order and Reverse Characters?',
        answer:
          'Reverse Word Order keeps each word readable while flipping their sequence ("Hello world" becomes "world Hello"). Reverse Characters flips every letter ("dlrow olleH").',
      },
      {
        question: 'Does Reverse Line Order work for numbered or bulleted lists?',
        answer:
          'Yes, it flips the top-to-bottom sequence of lines while leaving the text within each line intact.',
      },
      {
        question: 'Are emojis supported without garbling?',
        answer:
          'Yes, we split strings using Unicode code points (Array.from) so standard emojis reverse cleanly without corrupting surrogate pairs.',
      },
    ],
    relatedSlugs: ['/case-converter', '/duplicate-line-remover', '/remove-extra-spaces', '/word-counter'],
  },
  {
    id: 'duplicate-line-remover',
    slug: '/duplicate-line-remover',
    name: 'Duplicate Line Remover',
    shortDesc: 'Deduplicate lists, emails, keywords, and logs with optional alphabetical sorting.',
    category: 'text-tools',
    iconName: 'ListFilter',
    recent: true,
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'sort lines alphabetically'],
    seoTitle: 'Duplicate Line Remover – Deduplicate & Sort Lists Online | ToolNest',
    seoDescription:
      'Remove duplicate lines from keyword lists, emails, or logs instantly. Supports case-insensitive matching, whitespace trimming, and A-Z sorting.',
    intro:
      'Working with exported keyword lists, subscriber emails, or log files often leaves dozens of repeated entries. Paste your list here to extract unique lines, trim stray spaces, and optionally sort the final list alphabetically.',
    instructions: [
      'Paste your line-by-line list into the input box.',
      'Configure matching options: Case-sensitive comparison, Trim leading/trailing spaces, Remove empty lines, and Sort A–Z or Z–A.',
      'Inspect the deduplicated result and check how many duplicates were removed.',
      'Copy or download the clean unique list.',
    ],
    example: {
      title: 'Keyword List Cleanup',
      input: 'word counter\ncgpa calculator\nWord Counter\nbmi calculator',
      output: 'word counter\ncgpa calculator\nbmi calculator (1 duplicate removed)',
    },
    benefits: [
      'Preserves original first-seen order by default or sorts A–Z / Z–A.',
      'Reports exact original lines, unique lines, and duplicates removed.',
      'Handles thousands of lines smoothly inside the browser.',
      'Case-insensitive toggle catches capitalized duplicates automatically.',
    ],
    faqs: [
      {
        question: 'Does the tool preserve my original line order?',
        answer:
          'Yes! By default ("Keep Original Order"), it retains the very first occurrence of each line and drops later repeats.',
      },
      {
        question: 'What does "Trim whitespace before comparing" do?',
        answer:
          'It ensures "apple" and "apple " (with a trailing space) are recognized as identical duplicates rather than two different lines.',
      },
      {
        question: 'Can I use this for email lists or CSV columns?',
        answer:
          'Yes, any newline-separated data—emails, URLs, tags, or product SKUs—can be deduplicated cleanly.',
      },
    ],
    relatedSlugs: ['/remove-extra-spaces', '/text-to-slug-converter', '/case-converter', '/text-reverser'],
  },
  {
    id: 'text-to-slug-converter',
    slug: '/text-to-slug-converter',
    name: 'Text to Slug Converter',
    shortDesc: 'Turn article titles and headings into clean, SEO-friendly URL slugs.',
    category: 'text-tools',
    iconName: 'Link2',
    keywords: ['text to slug', 'url slug generator', 'seo friendly url', 'permalink generator'],
    seoTitle: 'Text to Slug Converter – SEO-Friendly URL Generator | ToolNest',
    seoDescription:
      'Convert article titles and phrases into clean, lowercase, SEO-friendly URL slugs with custom separators and stop-word removal.',
    intro:
      'Clean, descriptive URL slugs improve search engine readability and click-through rates. Our Text to Slug Converter strips special characters, transliterates accented letters, and formats concise permalinks ready for WordPress, Ghost, or custom sites.',
    instructions: [
      'Enter one or multiple titles (one per line for batch slug generation).',
      'Choose hyphen (-) or underscore (_) as your separator.',
      'Optionally enable "Remove common English stop words" (a, the, in, of) for shorter SEO URLs.',
      'Copy the generated slug or full batch list.',
    ],
    example: {
      title: 'Blog Post Title to URL Slug',
      input: '10 Best Ways to Improve Your Study Habits in 2026!',
      output: '10-best-ways-to-improve-your-study-habits-in-2026 (or 10-best-ways-improve-study-habits-2026 without stop words)',
    },
    benefits: [
      'Normalizes accented Latin characters (é → e, ü → u) cleanly.',
      'Supports batch conversion—paste 20 titles and get 20 slugs at once.',
      'Optional stop-word filter shortens URLs for stronger SEO.',
      'Prevents double hyphens and trailing punctuation.',
    ],
    faqs: [
      {
        question: 'Should I use hyphens or underscores in URL slugs?',
        answer:
          'Google recommends hyphens (-) because search engines treat hyphens as word separators, whereas underscores often join words together.',
      },
      {
        question: 'Why remove stop words from a URL slug?',
        answer:
          'Removing filler words like "a", "the", "and", or "for" keeps URLs shorter and focuses them on high-value keywords.',
      },
      {
        question: 'Can I generate slugs for multiple headlines at once?',
        answer:
          'Yes, enable or paste multiple lines and each line converts into its own clean slug.',
      },
    ],
    relatedSlugs: ['/case-converter', '/character-counter', '/word-counter', '/duplicate-line-remover'],
  },

  // ================= B. STUDENT TOOLS =================
  {
    id: 'cgpa-calculator',
    slug: '/cgpa-calculator',
    name: 'CGPA Calculator',
    shortDesc: 'Calculate Cumulative GPA across semesters on 10.0 or 4.0 grading scales.',
    category: 'student-tools',
    iconName: 'GraduationCap',
    popular: true,
    keywords: ['cgpa calculator', 'cumulative gpa', 'cgpa to percentage', 'semester cgpa', 'college cgpa'],
    seoTitle: 'CGPA Calculator Online – 10.0 & 4.0 Scale + Percentage | ToolNest',
    seoDescription:
      'Calculate your Cumulative Grade Point Average (CGPA) across multiple semesters on 10.0 or 4.0 scales and convert CGPA to percentage.',
    intro:
      'Tracking your Cumulative Grade Point Average (CGPA) across multiple university semesters is essential for scholarship applications, campus placements, and graduate admissions. Our CGPA Calculator supports both 10.0 (India/International) and 4.0 (US/Canada) credit-weighted systems.',
    instructions: [
      'Select your grading scale (10.0 Scale or 4.0 Scale).',
      'Enter the SGPA/GPA and total credit hours for each completed semester.',
      'Click "+ Add Semester" to include additional terms.',
      'View your weighted CGPA, total credits earned, and equivalent percentage conversion.',
    ],
    example: {
      title: 'Four-Semester Engineering CGPA',
      input: 'Sem 1: 8.4 (20 cr), Sem 2: 8.8 (22 cr), Sem 3: 9.1 (24 cr), Sem 4: 8.9 (22 cr)',
      output: 'CGPA: 8.81 / 10.0 · Total Credits: 88 · Est. Percentage (×9.5): 83.7%',
    },
    benefits: [
      'Accurate credit-weighted calculation—not a flawed simple average.',
      'Supports both 10-point and 4-point international grading scales.',
      'Includes customizable CGPA-to-Percentage multiplier (9.5 CBSE/VTU or 10.0).',
      'Instant addition or removal of semesters with zero sign-up.',
    ],
    faqs: [
      {
        question: 'How is CGPA calculated from semester GPAs?',
        answer:
          'CGPA = Sum of (Semester GPA × Semester Credits) divided by Total Credits across all semesters. Equal-credit semesters match a simple mean, while varied-credit terms require weighting.',
      },
      {
        question: 'How do I convert 10.0 CGPA to percentage?',
        answer:
          'Many Indian boards and universities (like CBSE and several engineering institutes) multiply CGPA by 9.5, while others use ×10 or subtract 0.75 first. You can adjust the multiplier in our converter.',
      },
      {
        question: 'Can I use this for UK or Australian grades?',
        answer:
          'Yes, if your transcript reports semester GPA on a 4.0 or 10.0 weighted scale, enter those credit weights directly.',
      },
    ],
    relatedSlugs: ['/gpa-calculator', '/percentage-calculator', '/attendance-calculator', '/marks-calculator'],
  },
  {
    id: 'gpa-calculator',
    slug: '/gpa-calculator',
    name: 'GPA Calculator',
    shortDesc: 'Compute semester and cumulative GPA using letter grades (A+ to F) and credits.',
    category: 'student-tools',
    iconName: 'BookOpen',
    popular: true,
    keywords: ['gpa calculator', 'college gpa calculator', 'high school gpa', '4.0 gpa scale', 'grade point average'],
    seoTitle: 'Free GPA Calculator – 4.0 Scale Letter Grades & Credits | ToolNest',
    seoDescription:
      'Calculate your semester and cumulative GPA with letter grades (A+ to F) and credit hours on the standard 4.0 US/Canadian grading scale.',
    intro:
      'Plan your semester targets or verify your transcript with a credit-weighted 4.0 GPA Calculator. Enter each course name, letter grade, and credit hours—plus optional prior cumulative GPA—to see where your academic standing lands.',
    instructions: [
      'Optionally enter your Prior Cumulative GPA and Prior Completed Credits if calculating a combined cumulative GPA.',
      'For each current course, choose the Letter Grade (A+ through F) and Credit Hours.',
      'Add more rows for additional classes.',
      'Review your Semester GPA, Updated Cumulative GPA, and Total Quality Points.',
    ],
    example: {
      title: 'Fall Semester (4 Courses)',
      input: 'Calculus (4 cr, A), Physics (3 cr, B+), English (3 cr, A-), CS Lab (2 cr, A)',
      output: 'Semester GPA: 3.74 / 4.00 · 12 Credits · 44.9 Quality Points',
    },
    benefits: [
      'Uses standard US/Canada 4.0 grade point weights (A=4.0, A-=3.7, B+=3.3, etc.).',
      'Combines current semester courses with prior cumulative GPA seamlessly.',
      'Displays quality points per course so you can spot which class impacts GPA most.',
      'Instant recalculation for "what-if" final grade scenarios.',
    ],
    faqs: [
      {
        question: 'Does an A+ count higher than 4.0?',
        answer:
          'Most US and Canadian colleges cap both A and A+ at 4.0 on an unweighted 4.0 scale, which is the standard used here.',
      },
      {
        question: 'How do credit hours affect GPA?',
        answer:
          'A 4-credit course carries twice the weight of a 2-credit course. Earning an A in a 4-credit class raises your GPA much more than a 1-credit seminar.',
      },
      {
        question: 'What are Quality Points?',
        answer:
          'Quality points equal (Course Grade Value × Course Credits). Your GPA is Total Quality Points divided by Total Credits.',
      },
    ],
    relatedSlugs: ['/cgpa-calculator', '/marks-calculator', '/percentage-calculator', '/study-time-calculator'],
  },
  {
    id: 'percentage-calculator',
    slug: '/percentage-calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Solve X% of Y, percentage ratios, % change, and exam mark percentages.',
    category: 'student-tools',
    iconName: 'Percent',
    popular: true,
    keywords: ['percentage calculator', 'percent increase', 'marks percentage', 'percent change calculator'],
    seoTitle: 'Percentage Calculator Online – Percent Change, Ratios & Marks | ToolNest',
    seoDescription:
      'Calculate percentages easily: find X% of a number, what percent X is of Y, percentage increase/decrease, and exam score percentages.',
    intro:
      'Percentages show up everywhere—from exam scorecards and retail discounts to financial growth reports. Our four-mode Percentage Calculator solves every common percentage formula in one clean interface.',
    instructions: [
      'Pick the calculation mode you need: "X% of Y", "X is what % of Y", "% Change", or "Exam Marks %".',
      'Enter your two numbers in the input fields.',
      'Read the exact formula breakdown and rounded result immediately.',
    ],
    example: {
      title: 'Percentage Growth',
      input: 'From 1,250 monthly visitors to 1,800 monthly visitors',
      output: '+44.00% increase (+550 change)',
    },
    benefits: [
      'Four dedicated everyday percentage formulas in one screen.',
      'Shows the exact step-by-step math formula used for transparency.',
      'Supports decimals, large financial figures, and negative changes.',
      'Mobile-friendly number inputs with instant updates.',
    ],
    faqs: [
      {
        question: 'How do I calculate percentage increase between two numbers?',
        answer:
          'Subtract the original value from the new value, divide by the original value, and multiply by 100: ((New - Old) / Old) × 100.',
      },
      {
        question: 'How do I calculate marks percentage?',
        answer:
          'Divide your obtained marks by the maximum possible marks and multiply by 100. For example, 435 out of 500 = 87%.',
      },
      {
        question: 'Can I use decimal values like 7.5%?',
        answer:
          'Yes, all input fields support decimal numbers and display results rounded cleanly up to 4 decimal places where needed.',
      },
    ],
    relatedSlugs: ['/marks-calculator', '/cgpa-calculator', '/discount-calculator', '/average-calculator'],
  },
  {
    id: 'attendance-calculator',
    slug: '/attendance-calculator',
    name: 'Attendance Calculator',
    shortDesc: 'Check current attendance % and exact classes you can miss or must attend.',
    category: 'student-tools',
    iconName: 'CalendarCheck',
    popular: true,
    keywords: ['attendance calculator', '75 percent attendance', 'bunk calculator', 'classes needed for 75%'],
    seoTitle: 'Attendance Calculator – Classes Needed or Safe to Miss | ToolNest',
    seoDescription:
      'Check your current attendance percentage and find out how many classes you must attend—or can safely miss—to meet your 75% or 80% target.',
    intro:
      'Most universities and colleges enforce strict 75% or 80% minimum attendance rules before final exams. Enter how many classes have happened so far to see your exact safety buffer or recovery plan.',
    instructions: [
      'Enter the number of classes you have attended so far.',
      'Enter the total number of classes conducted.',
      'Set your required minimum attendance percentage (e.g., 75%, 80%, or 85%).',
      'Read whether you are safe—and exactly how many classes you can miss or must attend consecutively.',
    ],
    example: {
      title: '75% Target Check',
      input: 'Attended: 32 · Total Conducted: 40 · Target: 75%',
      output: 'Current: 80.00% (Safe) · You can miss up to 2 upcoming classes and still stay ≥ 75%.',
    },
    benefits: [
      'Instant safe-miss buffer calculation when you are above target.',
      'Exact recovery count ("attend next N classes in a row") when below target.',
      'Customizable target threshold (65%, 75%, 80%, 85%, or any value).',
      'Project future attendance if you plan to miss upcoming lectures.',
    ],
    faqs: [
      {
        question: 'How is the "classes you can miss" number calculated?',
        answer:
          'It solves for the maximum integer B such that Attended / (Total + B) >= Target%. Remember that missing a class increases total conducted classes while attended stays constant.',
      },
      {
        question: 'How is the recovery count calculated when below 75%?',
        answer:
          'It solves for the smallest integer A such that (Attended + A) / (Total + A) >= Target%, assuming you attend every upcoming lecture without skipping.',
      },
      {
        question: 'Can I test missing specific upcoming days?',
        answer:
          'Yes! Use the "What-If Planner" slider or input inside the tool to preview your percentage after attending or skipping upcoming lectures.',
      },
    ],
    relatedSlugs: ['/cgpa-calculator', '/percentage-calculator', '/study-time-calculator', '/marks-calculator'],
  },
  {
    id: 'study-time-calculator',
    slug: '/study-time-calculator',
    name: 'Study Time Calculator',
    shortDesc: 'Plan daily study hours, Pomodoro blocks, and exam countdown schedules.',
    category: 'student-tools',
    iconName: 'Clock',
    recent: true,
    keywords: ['study time calculator', 'exam study planner', 'pomodoro planner', 'hours per day calculator'],
    seoTitle: 'Study Time Calculator – Daily Exam Prep & Pomodoro Planner | ToolNest',
    seoDescription:
      'Calculate daily study hours, Pomodoro focus sessions, and realistic exam preparation schedules based on your syllabus size and days remaining.',
    intro:
      'Cramming the night before exams creates unnecessary stress. Enter your remaining chapters or topics, estimated hours per topic, and days until exam day to generate a balanced daily study plan with Pomodoro focus intervals.',
    instructions: [
      'Enter the number of subjects, chapters, or modules you need to cover.',
      'Set average hours needed per unit and any extra revision buffer hours.',
      'Enter days remaining before your exam and your comfortable daily study capacity.',
      'Review required daily hours, Pomodoro blocks (25m focus / 5m break), and schedule feasibility.',
    ],
    example: {
      title: 'Finals Preparation Plan',
      input: '14 chapters × 2.5 hrs/chapter + 5 hrs revision · 10 days remaining · Max 5 hrs/day',
      output: 'Total: 40 hours · Daily Target: 4.0 hrs/day (8 Pomodoro sessions/day) · On Track',
    },
    benefits: [
      'Translates total syllabus workload into achievable daily targets.',
      'Converts study hours into 25-minute or 50-minute Pomodoro cycles.',
      'Flags unrealistic workloads early so you can trim scope or start sooner.',
      'Includes dedicated revision buffer time so review is never skipped.',
    ],
    faqs: [
      {
        question: 'What is a Pomodoro block?',
        answer:
          'The Pomodoro Technique splits focus into 25-minute deep work intervals followed by 5-minute breaks, helping retain concentration over multi-hour study days.',
      },
      {
        question: 'Should I include revision hours separately?',
        answer:
          'Yes. Adding 15–25% extra revision buffer ensures time for practice tests and flashcards after finishing initial readings.',
      },
      {
        question: 'What if required daily hours exceed my limit?',
        answer:
          'The calculator highlights the gap in hours so you can prioritize high-weight chapters or allocate extra weekend hours.',
      },
    ],
    relatedSlugs: ['/attendance-calculator', '/gpa-calculator', '/cgpa-calculator', '/date-difference-calculator'],
  },
  {
    id: 'marks-calculator',
    slug: '/marks-calculator',
    name: 'Marks Calculator',
    shortDesc: 'Sum multi-subject exam scores, find overall percentage, and view grade division.',
    category: 'student-tools',
    iconName: 'ClipboardCheck',
    keywords: ['marks calculator', 'exam marks percentage', 'subject wise marks', 'total marks calculator'],
    seoTitle: 'Exam Marks Calculator – Subject Totals, Percentage & Grade | ToolNest',
    seoDescription:
      'Calculate total obtained marks, maximum marks, subject-wise percentages, pass status, and overall grade division for school and college exams.',
    intro:
      'Add up report cards or semester mark sheets cleanly without manual arithmetic errors. Enter each subject’s obtained and maximum marks to see your total score, overall percentage, best subject, and pass/distinction classification.',
    instructions: [
      'Rename or keep default subject labels and enter Obtained Marks and Maximum Marks.',
      'Set your institution’s passing percentage threshold (default 33% or 40%).',
      'Click "+ Add Subject" for additional subjects.',
      'View your total marks, overall percentage, highest/lowest subject, and grade.',
    ],
    example: {
      title: '5-Subject High School Marksheet',
      input: 'Math 92/100, Science 88/100, English 84/100, History 79/100, CS 95/100',
      output: 'Total: 438 / 500 · Overall: 87.60% · Distinction · Best: CS (95%)',
    },
    benefits: [
      'Supports mixed maximum marks (e.g., 100-mark theory + 50-mark lab).',
      'Flags any individual subject below the passing threshold automatically.',
      'Highlights strongest and weakest subjects for targeted review.',
      'Calculates overall percentage and standard classification.',
    ],
    faqs: [
      {
        question: 'Can different subjects have different maximum marks?',
        answer:
          'Yes! Each subject row has its own Maximum Marks field, so you can mix 100-mark exams with 50-mark or 75-mark practicals.',
      },
      {
        question: 'How is Pass/Fail determined?',
        answer:
          'You pass when every subject meets or exceeds your chosen passing percentage threshold (commonly 33%, 35%, or 40%).',
      },
      {
        question: 'What grade classification does it use?',
        answer:
          'It maps overall percentage to standard international bands: 75%+ Distinction, 60–74.9% First Division, 50–59.9% Second Division, and Pass/Fail.',
      },
    ],
    relatedSlugs: ['/percentage-calculator', '/cgpa-calculator', '/gpa-calculator', '/average-calculator'],
  },

  // ================= C. YOUTUBE TOOLS =================
  {
    id: 'youtube-title-generator',
    slug: '/youtube-title-generator',
    name: 'YouTube Title Generator',
    shortDesc: 'Generate high-CTR, search-friendly YouTube video titles across 6 proven styles.',
    category: 'youtube-tools',
    iconName: 'Sparkles',
    popular: true,
    keywords: ['youtube title generator', 'video title ideas', 'high ctr youtube titles', 'youtube seo title'],
    seoTitle: 'YouTube Title Generator – High-CTR Video Title Ideas | ToolNest',
    seoDescription:
      'Generate clickable, SEO-optimized YouTube video title ideas tailored to tutorials, reviews, listicles, and vlogs with live character count checks.',
    intro:
      'Your video title and thumbnail determine whether viewers click or scroll past. Enter your core topic and video format to generate 12+ proven title frameworks—complete with character count indicators so headlines never get cut off in mobile feeds.',
    instructions: [
      'Enter your main video topic or target keyword (e.g., "Python Automation", "Budget Desk Setup").',
      'Choose a content format: Tutorial / How-To, Listicle, Honest Review, Comparison, Story / Case Study, or All Styles.',
      'Optionally add an audience or year modifier (e.g., "for Beginners", "2026").',
      'Click Generate Titles and copy any high-CTR title in one click.',
    ],
    example: {
      title: 'Tutorial Video Ideas',
      input: 'Topic: "Notion Productivity System" · Format: Tutorial · Modifier: "2026"',
      output: '"How to Build a Notion Productivity System in 2026 (Step-by-Step)" · "Stop Overcomplicating Notion: Simple Productivity System"',
    },
    benefits: [
      '100% instant browser generation—no AI credits or login required.',
      'Shows character length on every title against YouTube’s 60–70 char sweet spot.',
      'Covers curiosity, search-intent, contrarian, and outcome-driven hooks.',
      'One-click copy or test directly in the Title Character Counter.',
    ],
    faqs: [
      {
        question: 'What is the ideal YouTube title length?',
        answer:
          'Keep core keywords within the first 50–60 characters. YouTube allows up to 100 characters, but mobile feeds truncate titles past roughly 55–65 characters.',
      },
      {
        question: 'Should I put the keyword at the beginning of the title?',
        answer:
          'Yes, placing the primary search phrase near the front helps both YouTube search indexing and quick human scanning.',
      },
      {
        question: 'Can I customize the generated templates?',
        answer:
          'Yes—copy any generated idea and tweak specific numbers, brackets, or outcomes to fit your exact video.',
      },
    ],
    relatedSlugs: ['/youtube-title-character-counter', '/youtube-description-generator', '/hashtag-generator', '/youtube-earnings-calculator'],
  },
  {
    id: 'youtube-description-generator',
    slug: '/youtube-description-generator',
    name: 'YouTube Description Generator',
    shortDesc: 'Build structured, SEO-rich YouTube video descriptions with chapters and links.',
    category: 'youtube-tools',
    iconName: 'AlignLeft',
    keywords: ['youtube description generator', 'video description template', 'youtube chapters generator', 'youtube seo'],
    seoTitle: 'YouTube Description Generator – SEO Template & Chapters | ToolNest',
    seoDescription:
      'Create well-structured YouTube video descriptions with an engaging above-the-fold hook, timestamps/chapters, resource links, and hashtags.',
    intro:
      'A structured YouTube description boosts watch time with clickable chapters, helps YouTube understand your video topic, and converts viewers with clean resource links. Build a polished, copy-ready description in under a minute.',
    instructions: [
      'Fill in your Video Title/Topic and a punchy 1–2 sentence hook (appears before "Show more").',
      'Add bullet-point takeaways and timestamps/chapters (e.g., 00:00 Intro).',
      'Include optional website/affiliate links, social handles, and 3–5 hashtags.',
      'Copy the formatted description straight into YouTube Studio.',
    ],
    example: {
      title: 'Structured Tech Review Description',
      input: 'Topic: M4 MacBook Air Review · Chapters: 00:00 Intro, 02:15 Battery, 05:30 Verdict',
      output: 'Complete formatted description with 140-char hook, timestamps, gear links, and #MacBookAir hashtags.',
    },
    benefits: [
      'Keeps your strongest hook inside the first 150 visible characters.',
      'Formats timestamps cleanly so YouTube activates clickable video chapters.',
      'Live character counter against YouTube’s 5,000-character description limit.',
      'Remembers layout structure cleanly while keeping copy readable.',
    ],
    faqs: [
      {
        question: 'How do YouTube chapters work in descriptions?',
        answer:
          'Start your chapter list with "00:00" followed by at least three timestamps in ascending order, each at least 10 seconds apart.',
      },
      {
        question: 'How many hashtags should I put in a YouTube description?',
        answer:
          'Stick to 3 to 5 relevant hashtags at the bottom. YouTube ignores all hashtags if a video has more than 60, and typically shows the first 3 above the title.',
      },
      {
        question: 'Why are the first two lines so important?',
        answer:
          'Only the first ~140 characters show before the "More" button on desktop and mobile. Putting your main keyword and value promise there improves search and CTR.',
      },
    ],
    relatedSlugs: ['/youtube-title-generator', '/hashtag-generator', '/youtube-title-character-counter', '/word-counter'],
  },
  {
    id: 'hashtag-generator',
    slug: '/hashtag-generator',
    name: 'Hashtag Generator',
    shortDesc: 'Create balanced Broad, Niche, and Long-Tail hashtags for YouTube, Instagram, and TikTok.',
    category: 'youtube-tools',
    iconName: 'Hash',
    keywords: ['hashtag generator', 'youtube hashtags', 'instagram hashtags', 'tiktok tags', 'video tags'],
    seoTitle: 'Hashtag Generator – YouTube, Instagram & TikTok Tags | ToolNest',
    seoDescription:
      'Generate balanced Broad, Niche, and Long-Tail hashtags for YouTube, Shorts, Instagram Reels, TikTok, and LinkedIn with one-click copy.',
    intro:
      'Using only ultra-broad hashtags buries your content, while overly obscure tags get zero impressions. Enter your topic and target platform to generate a balanced mix of broad, mid-tier niche, and descriptive tags.',
    instructions: [
      'Enter your topic or keyword (e.g., "home workout", "web development", "travel vlog").',
      'Select your target platform: YouTube / Shorts, Instagram, TikTok, or LinkedIn.',
      'Click Generate Hashtags and toggle individual tags on or off.',
      'Copy as #hashtags or comma-separated YouTube Studio tags.',
    ],
    example: {
      title: 'Fitness Shorts Tags',
      input: 'Topic: "home workout" · Platform: YouTube',
      output: '#HomeWorkout #FitnessTips #NoEquipmentWorkout #DailyFitness #WorkoutRoutine',
    },
    benefits: [
      'Groups tags into Broad, Niche, and Actionable variations.',
      'Exports both #Hashtag format and comma-separated YouTube tag lists.',
      'Platform-aware count guidelines (3–5 for YouTube, 5–15 for Instagram).',
      'Click any tag to select or deselect before copying.',
    ],
    faqs: [
      {
        question: 'Should I put hashtags in YouTube titles or descriptions?',
        answer:
          'Place 3–5 hashtags at the very end of your video description. YouTube automatically surfaces the top 3 above your video title.',
      },
      {
        question: 'What is the difference between YouTube hashtags and video tags?',
        answer:
          'Hashtags (#tag) appear publicly in descriptions and create clickable topic feeds. Video tags are comma-separated metadata entered inside YouTube Studio.',
      },
      {
        question: 'How many hashtags work best on Instagram and TikTok?',
        answer:
          'Most creators see strong reach using 5–10 tightly relevant niche tags rather than stuffing 30 generic ones.',
      },
    ],
    relatedSlugs: ['/youtube-description-generator', '/youtube-title-generator', '/text-to-slug-converter', '/character-counter'],
  },
  {
    id: 'youtube-earnings-calculator',
    slug: '/youtube-earnings-calculator',
    name: 'YouTube Earnings Calculator',
    shortDesc: 'Estimate daily, monthly, and yearly YouTube ad revenue from views and RPM.',
    category: 'youtube-tools',
    iconName: 'DollarSign',
    popular: true,
    keywords: ['youtube earnings calculator', 'youtube money calculator', 'youtube rpm calculator', 'adsense estimator'],
    seoTitle: 'YouTube Earnings Calculator – Estimate AdSense RPM Revenue | ToolNest',
    seoDescription:
      'Estimate daily, monthly, and annual YouTube AdSense income based on daily video views, regional niche RPM/CPM rates, and Shorts vs Long-form.',
    intro:
      'Curious how much a YouTube channel can earn from AdSense? Adjust daily views, select your content niche and audience region (USA, UK, Canada, Australia, India, or Global), and model realistic low, average, and high monthly revenue estimates.',
    instructions: [
      'Enter or slide your expected Daily Video Views.',
      'Select Long-Form Video or YouTube Shorts format.',
      'Choose a Niche & Region RPM preset—or enter your own custom RPM ($ per 1,000 views).',
      'Review estimated daily, monthly, and annual creator earnings.',
    ],
    example: {
      title: 'Tech Channel (USA/UK Audience)',
      input: '25,000 daily views · Long-Form Tech · $6.50 est. RPM',
      output: '~$162.50 / day · ~$4,875 / month · ~$59,312 / year (Creator Net)',
    },
    benefits: [
      'Uses realistic RPM (Revenue Per Mille) benchmarks across 5 major regions.',
      'Separates Long-Form RPM from YouTube Shorts RPM accurately.',
      'Shows conservative, mid-range, and optimistic projection bands.',
      'Transparent breakdown of YouTube’s 55% creator share vs 45% platform share.',
    ],
    faqs: [
      {
        question: 'What is the difference between CPM and RPM on YouTube?',
        answer:
          'CPM (Cost Per Mille) is what advertisers pay per 1,000 monetized ad impressions. RPM (Revenue Per Mille) is what you actually earn per 1,000 total video views after YouTube’s 45% share and non-monetized views.',
      },
      {
        question: 'Why do USA, UK, Canada, and Australia earn higher RPMs than India?',
        answer:
          'Advertiser bidding competition and consumer purchasing power vary by country, making Tier-1 English-speaking markets typically carry 3× to 8× higher ad rates.',
      },
      {
        question: 'Does this include sponsorships or affiliate income?',
        answer:
          'No, this estimates YouTube Partner Program ad revenue only. Many creators earn additional income from sponsorships, memberships, and affiliate links.',
      },
    ],
    relatedSlugs: ['/youtube-title-generator', '/youtube-description-generator', '/percentage-calculator', '/loan-calculator'],
  },
  {
    id: 'youtube-title-character-counter',
    slug: '/youtube-title-character-counter',
    name: 'Character Counter for Titles',
    shortDesc: 'Test YouTube & Google SEO title lengths with live mobile/desktop truncation previews.',
    category: 'youtube-tools',
    iconName: 'MonitorPlay',
    keywords: ['youtube title length checker', 'seo title preview', 'title character counter', 'serp snippet checker'],
    seoTitle: 'Character Counter for Titles – YouTube & Google SERP Preview | ToolNest',
    seoDescription:
      'Check character counts and pixel truncation for YouTube video titles and Google SEO meta titles with live desktop and mobile previews.',
    intro:
      'Long titles get clipped with "..." right before your big hook on smartphones and Google search snippets. Test your headline here to verify exact character counts, estimated pixel width, and how it looks on YouTube Mobile, YouTube Desktop, and Google Search.',
    instructions: [
      'Type your YouTube video title or blog SEO title into the input box.',
      'Check the character meter against Mobile Safe (50 chars), Google SERP (60 chars), and YouTube Desktop (70 chars).',
      'Inspect the live Mobile Feed, Desktop Feed, and Google Search preview cards below.',
      'Trim filler words until your core message displays without clipping.',
    ],
    example: {
      title: 'Mobile-Safe Title Check',
      input: 'How to Build a Fast Portfolio Website in 20 Minutes',
      output: '52 characters · Fits YouTube Mobile, Desktop, and Google SERP without truncation',
    },
    benefits: [
      'Simulates YouTube Mobile, YouTube Desktop, and Google Search snippets simultaneously.',
      'Estimates pixel width (~580px SERP limit) in addition to character count.',
      'Flags uppercase-heavy titles that consume extra horizontal pixels.',
      'Built specifically for creators, bloggers, and SEO specialists.',
    ],
    faqs: [
      {
        question: 'Why did my 58-character title still get cut off on Google?',
        answer:
          'Google truncates by pixel width (~580–600px), not just character count. Wide uppercase letters (W, M) take far more space than lowercase letters (i, l).',
      },
      {
        question: 'What is the maximum YouTube title length?',
        answer:
          'YouTube accepts up to 100 characters, but keeping the vital hook inside the first 50–60 characters prevents cutoffs on mobile home feeds.',
      },
      {
        question: 'Are brackets like [2026 Guide] helpful?',
        answer:
          'Yes, concise brackets often lift click-through rates, provided they stay within the safe preview width.',
      },
    ],
    relatedSlugs: ['/youtube-title-generator', '/character-counter', '/text-to-slug-converter', '/youtube-description-generator'],
  },

  // ================= D. CALCULATOR TOOLS =================
  {
    id: 'age-calculator',
    slug: '/age-calculator',
    name: 'Age Calculator',
    shortDesc: 'Find exact age in years, months, days, total weeks, and next birthday countdown.',
    category: 'calculator-tools',
    iconName: 'Cake',
    popular: true,
    keywords: ['age calculator', 'date of birth calculator', 'exact age in days', 'birthday countdown'],
    seoTitle: 'Age Calculator Online – Exact Age in Years, Months & Days | ToolNest',
    seoDescription:
      'Calculate your exact chronological age in years, months, weeks, days, and hours from your date of birth, plus your next birthday countdown.',
    intro:
      'Need your exact age in years, months, and days for passport applications, school admissions, or milestone celebrations? Select your birth date and any target date to see a complete chronological breakdown.',
    instructions: [
      'Select your Date of Birth using the date picker.',
      'Keep today’s date as the "Calculate Age As Of" date—or choose any past or future date.',
      'View your exact age breakdown, day of the week born, and countdown to your next birthday.',
    ],
    example: {
      title: 'Chronological Age Breakdown',
      input: 'DOB: May 14, 1998 · Target Date: November 27, 2026',
      output: '28 years, 6 months, 13 days · Born on a Thursday · 168 days until next birthday',
    },
    benefits: [
      'Accounts accurately for leap years and varying 28/30/31-day months.',
      'Calculates total months, total weeks, total days, and approximate hours lived.',
      'Displays the weekday you were born and your next birthday’s weekday.',
      'Works for future dates (e.g., checking age on an upcoming exam or retirement date).',
    ],
    faqs: [
      {
        question: 'How does the Age Calculator handle leap-year birthdays (Feb 29)?',
        answer:
          'Calendar-month arithmetic counts February 29 cleanly and calculates exact elapsed days across every leap year since birth.',
      },
      {
        question: 'Can I calculate someone’s age on a past or future date?',
        answer:
          'Yes, simply change the "Age at the Date of" picker to any historical or future year.',
      },
      {
        question: 'Is my birth date stored anywhere?',
        answer:
          'No, calculations happen entirely in your browser and vanish when you close or reset the page.',
      },
    ],
    relatedSlugs: ['/date-difference-calculator', '/bmi-calculator', '/percentage-calculator', '/average-calculator'],
  },
  {
    id: 'bmi-calculator',
    slug: '/bmi-calculator',
    name: 'BMI Calculator',
    shortDesc: 'Calculate Body Mass Index in Metric or Imperial units with healthy weight ranges.',
    category: 'calculator-tools',
    iconName: 'Activity',
    popular: true,
    keywords: ['bmi calculator', 'body mass index', 'healthy weight range', 'metric imperial bmi'],
    seoTitle: 'BMI Calculator – Metric & Imperial Body Mass Index | ToolNest',
    seoDescription:
      'Calculate your Body Mass Index (BMI) in kg/cm or lbs/ft-in. View your WHO weight category, visual BMI gauge, and healthy weight range.',
    intro:
      'Body Mass Index (BMI) is a widely used screening metric relating weight to height. Switch smoothly between Metric (kg, cm) and Imperial (lbs, ft/in) units to check your BMI score and recommended healthy weight range.',
    instructions: [
      'Select Metric (kg / cm) or US/Imperial (lbs / ft & in).',
      'Enter your height and current body weight.',
      'Review your BMI value, category label, visual scale position, and healthy weight range for your height.',
    ],
    example: {
      title: 'Metric BMI Check',
      input: 'Height: 175 cm · Weight: 70 kg',
      output: 'BMI: 22.9 · Category: Normal Weight (18.5–24.9) · Healthy Range: 56.7–76.3 kg',
    },
    benefits: [
      'Supports both Metric (cm/kg) and US/UK Imperial (ft/in/lbs) inputs.',
      'Shows your exact healthy weight target band for your height.',
      'Visual color-and-label spectrum bar for instant clarity.',
      'Includes clear clinical context about BMI limitations (muscle mass, age).',
    ],
    faqs: [
      {
        question: 'What is a healthy BMI range for adults?',
        answer:
          'According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal/healthy for most adults aged 20 and older.',
      },
      {
        question: 'Is BMI accurate for athletes or bodybuilders?',
        answer:
          'BMI does not distinguish between muscle and fat mass, so muscular athletes may show an "Overweight" BMI despite having low body fat.',
      },
      {
        question: 'What formula does the BMI Calculator use?',
        answer:
          'Metric: weight (kg) ÷ [height (m)]². Imperial: 703 × weight (lbs) ÷ [height (in)]².',
      },
    ],
    relatedSlugs: ['/age-calculator', '/percentage-calculator', '/average-calculator', '/discount-calculator'],
  },
  {
    id: 'discount-calculator',
    slug: '/discount-calculator',
    name: 'Discount Calculator',
    shortDesc: 'Compute sale price, stacked promo discounts, tax/GST, and total savings.',
    category: 'calculator-tools',
    iconName: 'Tag',
    keywords: ['discount calculator', 'sale price calculator', 'percent off calculator', 'double discount'],
    seoTitle: 'Discount Calculator – Sale Price, Stacked Coupons & Tax | ToolNest',
    seoDescription:
      'Calculate final sale prices, total money saved, stacked second coupon discounts, and optional sales tax/GST instantly while shopping.',
    intro:
      'Retail sales often advertise "40% off + extra 15% off at checkout" before tax. Use this Discount Calculator to see the true final price, combined effective discount percentage, and total savings across any currency.',
    instructions: [
      'Select your currency symbol ($, £, C$, A$, ₹, €) and enter the Original Price.',
      'Enter the primary Discount % (and optional Extra Stacked Discount %).',
      'Optionally add Sales Tax / VAT / GST % to preview your true checkout total.',
      'View Final Price, Total Savings, and Effective Discount %.',
    ],
    example: {
      title: 'Stacked Holiday Sale',
      input: 'Original: $120 · Discount: 30% · Extra Coupon: 10% · Tax: 8%',
      output: 'Subtotal: $75.60 · Tax: $6.05 · Final Price: $81.65 (Saved $44.40 before tax)',
    },
    benefits: [
      'Correctly stacks sequential discounts (30% + 10% = 37% effective, not 40%).',
      'Supports USD, GBP, CAD, AUD, INR, and EUR symbols.',
      'Includes optional post-discount sales tax / GST calculation.',
      'Quick-tap preset buttons (10%, 20%, 25%, 50%) for fast mobile shopping.',
    ],
    faqs: [
      {
        question: 'Why is 30% off plus an extra 10% off equal to 37% instead of 40%?',
        answer:
          'The second 10% coupon applies to the already-reduced 70% price, not the original price: 0.70 × 0.90 = 0.63 (a 37% total reduction).',
      },
      {
        question: 'Is sales tax calculated before or after the discount?',
        answer:
          'In most countries (USA, UK, Canada, Australia, India), sales tax/VAT/GST is applied to the discounted selling price, which is how our calculator computes it.',
      },
      {
        question: 'Can I also find the original price from a sale price?',
        answer:
          'Yes—check the effective percentage breakdown or use our Percentage Calculator for reverse markup checks.',
      },
    ],
    relatedSlugs: ['/percentage-calculator', '/loan-calculator', '/average-calculator', '/youtube-earnings-calculator'],
  },
  {
    id: 'loan-calculator',
    slug: '/loan-calculator',
    name: 'Loan Calculator',
    shortDesc: 'Calculate monthly EMI payments, total interest, and full amortization schedules.',
    category: 'calculator-tools',
    iconName: 'Landmark',
    popular: true,
    keywords: ['loan calculator', 'emi calculator', 'mortgage payment calculator', 'amortization schedule'],
    seoTitle: 'Loan & EMI Calculator – Monthly Payment & Amortization | ToolNest',
    seoDescription:
      'Calculate monthly loan or EMI payments, total interest payable, principal vs. interest split, and yearly amortization schedules in USD, GBP, CAD, AUD, or INR.',
    intro:
      'Compare car loans, student loans, personal loans, or mortgages before signing any agreement. Enter your principal, annual interest rate, and tenure to see your monthly installment (EMI), total interest cost, and year-by-year payoff schedule.',
    instructions: [
      'Pick your currency (USD $, GBP £, CAD C$, AUD A$, INR ₹).',
      'Enter the Loan Amount, Annual Interest Rate (%), and Tenure (in Years or Months).',
      'Inspect your Monthly Payment (EMI), Total Interest, and Principal-to-Interest visual split.',
      'Expand the Yearly Amortization Schedule table to track balance reduction.',
    ],
    example: {
      title: 'Auto Loan Estimate',
      input: 'Principal: $25,000 · Rate: 6.5% p.a. · Tenure: 5 Years (60 months)',
      output: 'Monthly EMI: $489.15 · Total Interest: $4,349.22 · Total Payment: $29,349.22',
    },
    benefits: [
      'Standard reducing-balance EMI formula used by international banks.',
      'Interactive multi-currency display for USA, UK, Canada, Australia, and India.',
      'Visual bar comparing Principal vs. Total Interest cost.',
      'Complete year-by-year amortization breakdown with remaining balance.',
    ],
    faqs: [
      {
        question: 'What formula does the Loan / EMI Calculator use?',
        answer:
          'It uses the standard reducing-balance installment formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P is principal, r is monthly rate, and n is total months.',
      },
      {
        question: 'How can I reduce total interest paid on a loan?',
        answer:
          'Choosing a shorter loan tenure, negotiating a lower interest rate, or making occasional extra principal prepayments dramatically lowers total interest.',
      },
      {
        question: 'Does this account for variable interest rates or lender fees?',
        answer:
          'It models fixed-rate amortization without origination fees or insurance. Check your lender’s APR disclosure for closing costs.',
      },
    ],
    relatedSlugs: ['/discount-calculator', '/percentage-calculator', '/average-calculator', '/youtube-earnings-calculator'],
  },
  {
    id: 'date-difference-calculator',
    slug: '/date-difference-calculator',
    name: 'Date Difference Calculator',
    shortDesc: 'Count exact days, weeks, months, and business days between any two dates.',
    category: 'calculator-tools',
    iconName: 'CalendarRange',
    recent: true,
    keywords: ['date difference calculator', 'days between dates', 'business days calculator', 'working days count'],
    seoTitle: 'Date Difference Calculator – Days & Business Days Between Dates | ToolNest',
    seoDescription:
      'Calculate the exact number of days, weeks, months, years, and weekdays (Monday–Friday) between two calendar dates.',
    intro:
      'Planning project deadlines, visa timelines, notice periods, or vacation countdowns requires exact calendar math. Select a start and end date to measure total calendar days alongside business weekdays and weekend days.',
    instructions: [
      'Select your Start Date and End Date.',
      'Toggle "Include end date (+1 day)" if counting inclusive project or rental days.',
      'View the breakdown in Years/Months/Days, Total Days, Total Weeks, and Business Weekdays.',
    ],
    example: {
      title: '90-Day Project Sprint',
      input: 'March 1, 2026 to May 30, 2026',
      output: '2 months, 29 days · 90 total days · 65 weekdays · 25 weekend days',
    },
    benefits: [
      'Separates Monday–Friday business days from Saturday/Sunday weekends.',
      'Optional inclusive end-date toggle for contracts and hotel stays.',
      'Handles multi-year spans and leap years accurately.',
      'Instant swap button to reverse start and end dates.',
    ],
    faqs: [
      {
        question: 'When should I check "Include end date"?',
        answer:
          'Check it when both the start and end dates count as active days—such as leave requests, event schedules, or billing periods.',
      },
      {
        question: 'Do business days exclude public holidays?',
        answer:
          'The calculator counts standard Monday-through-Friday weekdays. Because public holidays vary by country and state, subtract your local holidays separately.',
      },
      {
        question: 'Can I calculate dates from past decades?',
        answer:
          'Yes, any valid Gregorian calendar dates work seamlessly.',
      },
    ],
    relatedSlugs: ['/age-calculator', '/study-time-calculator', '/attendance-calculator', '/loan-calculator'],
  },
  {
    id: 'average-calculator',
    slug: '/average-calculator',
    name: 'Average Calculator',
    shortDesc: 'Compute Mean, Median, Mode, Range, Min, Max, Sum, and Standard Deviation.',
    category: 'calculator-tools',
    iconName: 'BarChart3',
    keywords: ['average calculator', 'mean median mode', 'standard deviation', 'statistics calculator'],
    seoTitle: 'Average Calculator – Mean, Median, Mode & Standard Deviation | ToolNest',
    seoDescription:
      'Calculate Mean (average), Median, Mode, Range, Sum, Count, and Standard Deviation from any comma- or space-separated list of numbers.',
    intro:
      'A single arithmetic average rarely tells the full story when outliers exist. Paste any list of grades, expenses, or lab measurements to compute Mean, Median, Mode, Min/Max Range, and Standard Deviation all at once.',
    instructions: [
      'Type or paste your numbers separated by commas, spaces, or new lines.',
      'Inspect the complete statistical summary instantaneously—no submit button needed.',
      'View the sorted dataset below to spot outliers or check the middle median value.',
    ],
    example: {
      title: 'Quiz Score Dataset',
      input: '78, 85, 92, 85, 90, 88',
      output: 'Mean: 86.33 · Median: 86.5 · Mode: 85 · Range: 14 · Sum: 518 · Count: 6',
    },
    benefits: [
      'Accepts flexible delimiters: commas, spaces, tabs, or pasted spreadsheet columns.',
      'Calculates both sample and population standard deviation.',
      'Identifies single or multiple modes (bimodal/multimodal) accurately.',
      'Displays sorted ascending values for quick verification.',
    ],
    faqs: [
      {
        question: 'When is Median better than Mean?',
        answer:
          'Median is less distorted by extreme outliers. For example, one very high salary raises the Mean significantly while Median shows the true middle value.',
      },
      {
        question: 'Can I paste a column directly from Excel or Google Sheets?',
        answer:
          'Yes! Newline-separated columns pasted from spreadsheets parse cleanly.',
      },
      {
        question: 'What happens if every number appears only once?',
        answer:
          'The Mode field clearly reports "No repeating mode" instead of misleadingly picking the first number.',
      },
    ],
    relatedSlugs: ['/percentage-calculator', '/marks-calculator', '/gpa-calculator', '/loan-calculator'],
  },

  // ================= E. IMAGE TOOLS =================
  {
    id: 'image-compressor',
    slug: '/image-compressor',
    name: 'Image Compressor',
    shortDesc: 'Reduce JPG, PNG, and WebP file sizes locally in your browser with quality control.',
    category: 'image-tools',
    iconName: 'Minimize2',
    popular: true,
    keywords: ['image compressor', 'compress jpg online', 'reduce image size', 'optimize web images'],
    seoTitle: 'Free Image Compressor Online – Reduce JPG & WebP Size | ToolNest',
    seoDescription:
      'Compress JPG, PNG, and WebP images directly in your browser without uploading files. Adjust quality, resize max width, and see exact KB saved.',
    intro:
      'Oversized photos slow down websites, trigger email attachment limits, and fail government or college portal upload caps. Compress your images locally using HTML5 Canvas with real-time file size comparison—zero server uploads required.',
    instructions: [
      'Drag and drop a JPG, PNG, or WebP image (or click to browse your device).',
      'Adjust the Quality slider (75–85% typically cuts file size by 60%+ with minimal visual loss).',
      'Optionally set a Max Width cap and choose JPEG or WebP output.',
      'Compare Original vs. Compressed size and click Download Compressed Image.',
    ],
    example: {
      title: 'Web Blog Hero Compression',
      input: 'Original Photo: 2.4 MB (4000×3000 JPG)',
      output: 'Compressed at 80% quality + 1600px max width: 215 KB (91% smaller)',
    },
    benefits: [
      '100% client-side privacy—sensitive IDs or personal photos never leave your device.',
      'Supports modern WebP output alongside universal JPEG.',
      'Live before/after size and percentage reduction readout.',
      'Instant re-compression whenever you move the quality slider.',
    ],
    faqs: [
      {
        question: 'Are my photos uploaded to a server during compression?',
        answer:
          'No. Everything runs locally inside your browser using the HTML5 Canvas API. Even if you go offline after loading the page, compression still works.',
      },
      {
        question: 'Why does compressing a PNG as PNG sometimes keep it large?',
        answer:
          'PNG uses lossless compression. To shrink large photographic PNGs dramatically, switch the output format to JPEG or WebP inside the tool.',
      },
      {
        question: 'What quality setting is best for websites and Core Web Vitals?',
        answer:
          '75% to 82% in WebP or JPEG offers the ideal balance of crisp visual detail and fast page load speeds.',
      },
    ],
    relatedSlugs: ['/image-resizer', '/png-to-jpg-converter', '/jpg-to-png-converter'],
  },
  {
    id: 'image-resizer',
    slug: '/image-resizer',
    name: 'Image Resizer',
    shortDesc: 'Resize images to exact pixel dimensions or social media presets with aspect lock.',
    category: 'image-tools',
    iconName: 'Maximize2',
    popular: true,
    keywords: ['image resizer', 'resize photo pixels', 'instagram size', 'youtube thumbnail resizer'],
    seoTitle: 'Online Image Resizer – Exact Pixels & Aspect Ratio Lock | ToolNest',
    seoDescription:
      'Resize JPG, PNG, and WebP images to exact pixel width and height or one-click social presets locally in your browser.',
    intro:
      'Need a 1280×720 YouTube thumbnail, 1200×630 Open Graph banner, or exact passport portal dimensions? Resize any photo cleanly with aspect-ratio lock and high-quality smoothing directly inside your browser.',
    instructions: [
      'Upload any JPG, PNG, or WebP image from your device.',
      'Enter your target Width and Height in pixels—or pick a preset (YouTube 1280×720, OG 1200×630, Square 1080×1080).',
      'Toggle Lock Aspect Ratio to prevent stretching or unlock for exact dimensions.',
      'Select output format and download your resized image.',
    ],
    example: {
      title: 'YouTube Thumbnail Resize',
      input: 'Camera Photo: 4032×2268 (4.1 MB)',
      output: 'Resized: 1280×720 JPG · Crisp aspect-locked thumbnail ready for upload',
    },
    benefits: [
      'Lock Aspect Ratio prevents accidental squishing or stretching.',
      'Built-in presets for YouTube thumbnails, Instagram squares, HD 1080p, and OG tags.',
      'Uses high-quality bicubic image smoothing on Canvas.',
      'Zero file size limits or watermarks.',
    ],
    faqs: [
      {
        question: 'Will resizing an image smaller reduce its file size too?',
        answer:
          'Yes! Reducing pixel dimensions (for example from 4000px down to 1200px wide) drastically lowers both memory usage and file size.',
      },
      {
        question: 'Can I preserve transparent backgrounds when resizing a PNG?',
        answer:
          'Yes, choose PNG or WebP as your output format to keep alpha transparency intact.',
      },
      {
        question: 'What happens if I enter a width larger than the original image?',
        answer:
          'The tool will upscale to your requested dimensions, though upscaling too far can appear soft—downscaling always gives the sharpest results.',
      },
    ],
    relatedSlugs: ['/image-compressor', '/jpg-to-png-converter', '/png-to-jpg-converter'],
  },
  {
    id: 'jpg-to-png-converter',
    slug: '/jpg-to-png-converter',
    name: 'JPG to PNG Converter',
    shortDesc: 'Convert JPG/JPEG photos into lossless PNG images instantly without uploading.',
    category: 'image-tools',
    iconName: 'FileImage',
    keywords: ['jpg to png', 'jpeg to png converter', 'convert jpg to png free', 'browser image converter'],
    seoTitle: 'JPG to PNG Converter Online – Free & Private Browser Tool | ToolNest',
    seoDescription:
      'Convert JPG and JPEG images to lossless PNG format right in your browser. Batch convert multiple files with instant download and zero uploads.',
    intro:
      'Converting JPEG files to PNG prevents further lossy compression artifacts when editing graphics, diagrams, or logos. Drop one or multiple JPG files below for instant browser-based PNG conversion.',
    instructions: [
      'Drag and drop one or more .jpg / .jpeg images into the upload zone.',
      'Preview the image dimensions and converted PNG size.',
      'Click Download PNG next to any image.',
    ],
    example: {
      title: 'Graphic Asset Conversion',
      input: 'product-banner.jpg (1200×800)',
      output: 'product-banner.png (1200×800 lossless PNG)',
    },
    benefits: [
      'Batch-friendly—drop multiple JPG files and convert them all at once.',
      'Zero quality loss during conversion via lossless PNG encoding.',
      'Private local conversion with no queue wait times.',
      'Preserves original pixel width and height automatically.',
    ],
    faqs: [
      {
        question: 'Why is the converted PNG larger in KB than the original JPG?',
        answer:
          'PNG uses lossless compression so every pixel is stored without discarding visual data, whereas JPG uses lossy compression. That size increase is normal for photographs.',
      },
      {
        question: 'Does converting JPG to PNG automatically make the background transparent?',
        answer:
          'No—JPG files do not contain an alpha channel. Converting creates a lossless PNG ready for transparent editing in a graphics editor.',
      },
      {
        question: 'How many files can I convert at once?',
        answer:
          'You can select multiple JPG files in one batch; your browser processes them sequentially in milliseconds.',
      },
    ],
    relatedSlugs: ['/png-to-jpg-converter', '/image-compressor', '/image-resizer'],
  },
  {
    id: 'png-to-jpg-converter',
    slug: '/png-to-jpg-converter',
    name: 'PNG to JPG Converter',
    shortDesc: 'Convert heavy PNGs to lightweight JPGs with custom background fill and quality.',
    category: 'image-tools',
    iconName: 'Image',
    recent: true,
    keywords: ['png to jpg', 'convert png to jpeg', 'transparent png background', 'reduce png size'],
    seoTitle: 'PNG to JPG Converter – Custom Background & Quality Control | ToolNest',
    seoDescription:
      'Convert PNG images to smaller JPG files in your browser. Choose white, black, or custom background fill for transparent PNGs and adjust JPEG quality.',
    intro:
      'Screenshots and exported PNG graphics are often several megabytes too large for web pages or online forms that only accept JPG. Convert your PNG files to compact JPGs while controlling transparency background color and compression quality.',
    instructions: [
      'Drop one or more PNG images into the converter.',
      'Pick a background color (White #FFFFFF is default) for any transparent areas, since JPG does not support transparency.',
      'Adjust JPEG Quality (85%–92% recommended for crisp text and photos).',
      'Download your lightweight .jpg file immediately.',
    ],
    example: {
      title: 'Screenshot Optimization',
      input: 'dashboard-screenshot.png (1.8 MB)',
      output: 'dashboard-screenshot.jpg at 88% quality · White background · 240 KB (87% smaller)',
    },
    benefits: [
      'Custom background color picker prevents ugly black boxes behind transparent icons.',
      'Adjustable JPEG quality slider balances crispness and file size.',
      'Supports multiple files in a single batch.',
      '100% browser-based—screenshots remain completely private.',
    ],
    faqs: [
      {
        question: 'Why do I need to pick a background color when converting PNG to JPG?',
        answer:
          'The JPEG format does not support transparency. Filling transparent pixels with white (or your chosen color) ensures icons and logos look clean instead of turning solid black.',
      },
      {
        question: 'How much smaller will my file become?',
        answer:
          'Photographic PNGs and detailed screenshots frequently shrink by 60% to 85% when saved as 85% quality JPGs.',
      },
      {
        question: 'Is there any watermark added to converted JPGs?',
        answer:
          'Never. Your converted images are 100% clean and ready for commercial or personal use.',
      },
    ],
    relatedSlugs: ['/jpg-to-png-converter', '/image-compressor', '/image-resizer'],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  const normalized = slug.startsWith('/') ? slug : '/' + slug;
  return TOOLS.find((t) => t.slug === normalized);
}

export function getToolsByCategory(category: CategoryId): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}
