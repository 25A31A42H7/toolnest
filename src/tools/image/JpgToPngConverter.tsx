import {Download, RotateCcw, Trash2, Upload} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import {canvasToBlob, formatBytes, loadImageFromFile, sanitizeBaseName} from './imageUtils';

interface ConvertedItem {
  id: string;
  originalName: string;
  originalSize: number;
  pngUrl: string;
  pngSize: number;
  width: number;
  height: number;
}

export default function JpgToPngConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const [items, setItems] = useState<ConvertedItem[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Revoke remaining Blob URLs ONLY on component unmount (fixes batch revocation bug)
  useEffect(() => {
    const urls = blobUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError('');
    setBusy(true);

    const converted: ConvertedItem[] = [];
    const failedNames: string[] = [];

    for (const file of Array.from(fileList)) {
      try {
        const {img, objectUrl} = await loadImageFromFile(file);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas not supported');
          ctx.drawImage(img, 0, 0);
          const blob = await canvasToBlob(canvas, 'image/png');
          const pngUrl = URL.createObjectURL(blob);
          blobUrlsRef.current.add(pngUrl);
          converted.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            originalName: file.name,
            originalSize: file.size,
            pngUrl,
            pngSize: blob.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      } catch {
        failedNames.push(file.name);
      }
    }

    if (converted.length > 0) {
      setItems((prev) => [...prev, ...converted]);
    }
    if (failedNames.length > 0) {
      setError(`Could not convert: ${failedNames.join(', ')}. Ensure files are valid images under 50 MB.`);
    }
    setBusy(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.pngUrl);
        blobUrlsRef.current.delete(target.pngUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.pngUrl);
      blobUrlsRef.current.delete(item.pngUrl);
    });
    setItems([]);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D6CFC2] bg-[#FAF8F4] px-6 py-8 text-center transition-colors hover:border-[#C2522B] dark:border-[#3A3530] dark:bg-[#141312]"
      >
        <Upload className="h-8 w-8 text-[#C2522B] dark:text-[#E06D4B]" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
          Drop JPG / JPEG files to convert to PNG
        </p>
        <p className="mt-1 text-xs text-[#78716C] dark:text-[#9E978B]">
          Supports batch selection · Lossless PNG conversion in your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/webp"
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="mt-4 min-h-10 rounded-lg bg-[#C2522B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A6411E] disabled:opacity-50"
        >
          {busy ? 'Converting...' : 'Select JPG Files'}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
        >
          {error}
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Converted Files ({items.length})
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#78716C] hover:text-[#C2522B] dark:text-[#9E978B] dark:hover:text-[#E06D4B]"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Clear All
            </button>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-[#E7E2D8] bg-white p-4 sm:flex-row sm:items-center dark:border-[#2E2A26] dark:bg-[#1D1B19]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <img
                  src={item.pngUrl}
                  alt={item.originalName}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 shrink-0 rounded-lg border border-[#E7E2D8] bg-[#FAF8F4] object-cover dark:border-[#2E2A26] dark:bg-[#141312]"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                    {sanitizeBaseName(item.originalName)}.png
                  </div>
                  <div className="font-mono tabular-nums mt-0.5 text-xs text-[#78716C] dark:text-[#9E978B]">
                    {item.width}×{item.height} · {formatBytes(item.originalSize)} →{' '}
                    {formatBytes(item.pngSize)}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={item.pngUrl}
                  download={`${sanitizeBaseName(item.originalName)}.png`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A6411E]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download PNG
                </a>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.originalName}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E2D8] text-[#78716C] hover:bg-rose-50 hover:text-rose-700 dark:border-[#2E2A26] dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
