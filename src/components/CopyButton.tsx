import {Check, Copy} from 'lucide-react';
import {useState} from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function CopyButton({
  text,
  label = 'Copy',
  className = '',
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1B19] whitespace-nowrap transition-colors hover:border-[#C2522B]/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB] dark:hover:border-[#E06D4B]/50 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
