import {Download, RotateCcw, Trash2, Upload} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import {canvasToBlob, formatBytes, loadImageFromFile, sanitizeBaseName} from './imageUtils';

interface SourceFile {
  id: string;
  name: string;
  size: number;
  sourceUrl: string;
  width: number;
  height: number;
}

interface ConvertedJpg {
  id: string;
  name: string;
  originalSize: number;
  jpgUrl: string;
  jpgSize: number;
  width: number;
  height: number;
}

export default function PngToJpgConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sourceUrlsRef = useRef<Set<string>>(new Set());
  const outputUrlsRef = useRef<Set<string>>(new Set());
  const [sources, setSources] = useState<SourceFile[]>([]);
  const [outputs, setOutputs] = useState<ConvertedJpg[]>([]);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState(88);
  const [error, setError] = useState('');

  // Revoke remaining source & output Blob URLs only on unmount (prevents invalidating active items)
  useEffect(() => {
    const srcUrls = sourceUrlsRef.current;
    const outUrls = outputUrlsRef.current;
    return () => {
      srcUrls.forEach((u) => URL.revokeObjectURL(u));
      srcUrls.clear();
      outUrls.forEach((u) => URL.revokeObjectURL(u));
      outUrls.clear();
    };
  }, []);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError('');
    const added: SourceFile[] = [];
    const failedNames: string[] = [];

    for (const file of Array.from(fileList)) {
      try {
        const {img, objectUrl} = await loadImageFromFile(file);
        sourceUrlsRef.current.add(objectUrl);
        added.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          size: file.size,
          sourceUrl: objectUrl,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      } catch {
        failedNames.push(file.name);
      }
    }

    if (added.length > 0) {
      setSources((prev) => [...prev, ...added]);
    }
    if (failedNames.length > 0) {
      setError(`Could not read: ${failedNames.join(', ')}. Ensure files are valid images under 50 MB.`);
    }
  };

  useEffect(() => {
    if (sources.length === 0) {
      outputUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      outputUrlsRef.current.clear();
      setOutputs([]);
      return;
    }

    let cancelled = false;

    const convertAll = async () => {
      const next: ConvertedJpg[] = [];
      const createdUrls: string[] = [];

      try {
        for (const src of sources) {
          const img = new window.Image();
          img.src = src.sourceUrl;
          await new Promise<void>((res, rej) => {
            img.onload = () => res();
            img.onerror = () => rej(new Error(`Could not decode ${src.name}`));
          });

          const canvas = document.createElement('canvas');
          canvas.width = src.width;
          canvas.height = src.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, src.width, src.height);
          ctx.drawImage(img, 0, 0);

          const blob = await canvasToBlob(canvas, 'image/jpeg', quality / 100);
          if (cancelled) {
            createdUrls.forEach((u) => URL.revokeObjectURL(u));
            return;
          }
          const jpgUrl = URL.createObjectURL(blob);
          createdUrls.push(jpgUrl);
          next.push({
            id: src.id,
            name: src.name,
            originalSize: src.size,
            jpgUrl,
            jpgSize: blob.size,
            width: src.width,
            height: src.height,
          });
        }

        if (cancelled) {
          createdUrls.forEach((u) => URL.revokeObjectURL(u));
          return;
        }

        const oldUrls = Array.from(outputUrlsRef.current);
        outputUrlsRef.current = new Set(createdUrls);
        setOutputs(next);
        oldUrls.forEach((u) => URL.revokeObjectURL(u));
      } catch (err) {
        createdUrls.forEach((u) => URL.revokeObjectURL(u));
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Conversion failed.');
        }
      }
    };

    convertAll();
    return () => {
      cancelled = true;
    };
  }, [sources, bgColor, quality]);

  const removeSource = (id: string) => {
    setSources((prev) => {
      const t = prev.find((s) => s.id === id);
      if (t) {
        URL.revokeObjectURL(t.sourceUrl);
        sourceUrlsRef.current.delete(t.sourceUrl);
      }
      return prev.filter((s) => s.id !== id);
    });
  };

  const clearAll = () => {
    sources.forEach((s) => {
      URL.revokeObjectURL(s.sourceUrl);
      sourceUrlsRef.current.delete(s.sourceUrl);
    });
    outputUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    outputUrlsRef.current.clear();
    setSources([]);
    setOutputs([]);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D6CFC2] bg-[#FAF8F4] px-6 py-8 text-center transition-colors hover:border-[#C2522B] dark:border-[#3A3530] dark:bg-[#141312]"
      >
        <Upload className="h-8 w-8 text-[#C2522B] dark:text-[#E06D4B]" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
          Drop PNG files to convert to compact JPG
        </p>
        <p className="mt-1 text-xs text-[#78716C] dark:text-[#9E978B]">
          Transparent backgrounds fill cleanly with your selected color
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 min-h-10 rounded-lg bg-[#C2522B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A6411E]"
        >
          Select PNG Files
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

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 sm:grid-cols-2 dark:border-[#2E2A26] dark:bg-[#141312]">
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            Transparency Background Fill
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              {label: 'White', hex: '#FFFFFF'},
              {label: 'Warm Paper', hex: '#FAF8F4'},
              {label: 'Black', hex: '#000000'},
            ].map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setBgColor(c.hex)}
                className={`min-h-9 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                  bgColor.toUpperCase() === c.hex
                    ? 'border-[#C2522B] bg-[#FAF0EB] text-[#A6411E] dark:border-[#E06D4B] dark:bg-[#2A1B16] dark:text-[#E06D4B]'
                    : 'border-[#E7E2D8] bg-white text-[#57534E] dark:border-[#2E2A26] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
                }`}
              >
                {c.label}
              </button>
            ))}
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              aria-label="Custom background fill color"
              className="h-9 w-11 cursor-pointer rounded border border-[#D6CFC2] bg-white p-0.5 dark:border-[#3A3530] dark:bg-[#1D1B19]"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
            <label htmlFor="p2j-qual">JPEG Quality</label>
            <span className="font-mono tabular-nums text-[#C2522B] dark:text-[#E06D4B]">
              {quality}%
            </span>
          </div>
          <input
            id="p2j-qual"
            type="range"
            min="40"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-[#C2522B]"
          />
        </div>
      </div>

      {outputs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
              Converted Files ({outputs.length})
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

          {outputs.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-[#E7E2D8] bg-white p-4 sm:flex-row sm:items-center dark:border-[#2E2A26] dark:bg-[#1D1B19]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <img
                  src={item.jpgUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 shrink-0 rounded-lg border border-[#E7E2D8] bg-[#FAF8F4] object-cover dark:border-[#2E2A26] dark:bg-[#141312]"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                    {sanitizeBaseName(item.name)}.jpg
                  </div>
                  <div className="font-mono tabular-nums mt-0.5 text-xs text-[#78716C] dark:text-[#9E978B]">
                    {item.width}×{item.height} · {formatBytes(item.originalSize)} →{' '}
                    {formatBytes(item.jpgSize)}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={item.jpgUrl}
                  download={`${sanitizeBaseName(item.name)}.jpg`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A6411E]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download JPG
                </a>
                <button
                  type="button"
                  onClick={() => removeSource(item.id)}
                  aria-label={`Remove ${item.name}`}
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
