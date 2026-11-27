import {Download, Lock, RotateCcw, Unlock, Upload} from 'lucide-react';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {validateResizeDimensions} from '../../utils/toolCalculations';
import {canvasToBlob, formatBytes, loadImageFromFile, sanitizeBaseName} from './imageUtils';

const PRESETS = [
  {label: 'YouTube (1280×720)', w: 1280, h: 720},
  {label: 'Open Graph (1200×630)', w: 1200, h: 630},
  {label: 'Square (1080×1080)', w: 1080, h: 1080},
  {label: 'Full HD (1920×1080)', w: 1920, h: 1080},
];

export default function ImageResizer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeUrlsRef = useRef<Set<string>>(new Set());
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [origDims, setOrigDims] = useState<{w: number; h: number}>({w: 0, h: 0});
  const [widthStr, setWidthStr] = useState('1200');
  const [heightStr, setHeightStr] = useState('800');
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [previewUrl, setPreviewUrl] = useState('');
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState('');

  const registerUrl = (url: string) => {
    activeUrlsRef.current.add(url);
    return url;
  };

  const releaseUrl = (url: string) => {
    if (!url) return;
    URL.revokeObjectURL(url);
    activeUrlsRef.current.delete(url);
  };

  useEffect(() => {
    const urls = activeUrlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.clear();
    };
  }, []);

  const dimValidation = useMemo(
    () => validateResizeDimensions(widthStr, heightStr),
    [widthStr, heightStr]
  );

  const handleFile = async (selected: File) => {
    setError('');
    try {
      const {img, objectUrl} = await loadImageFromFile(selected);
      registerUrl(objectUrl);
      setSourceUrl((prev) => {
        if (prev && prev !== objectUrl) releaseUrl(prev);
        return objectUrl;
      });
      setFile(selected);
      setOrigDims({w: img.naturalWidth, h: img.naturalHeight});
      setWidthStr(String(img.naturalWidth));
      setHeightStr(String(img.naturalHeight));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to read image.');
    }
  };

  const handleWidthChange = (val: string) => {
    setWidthStr(val);
    const parsed = Number(val);
    if (lockRatio && origDims.w > 0 && Number.isInteger(parsed) && parsed >= 1 && parsed <= 8000) {
      const scaledH = Math.max(1, Math.min(8000, Math.round((parsed * origDims.h) / origDims.w)));
      setHeightStr(String(scaledH));
    }
  };

  const handleHeightChange = (val: string) => {
    setHeightStr(val);
    const parsed = Number(val);
    if (lockRatio && origDims.h > 0 && Number.isInteger(parsed) && parsed >= 1 && parsed <= 8000) {
      const scaledW = Math.max(1, Math.min(8000, Math.round((parsed * origDims.w) / origDims.h)));
      setWidthStr(String(scaledW));
    }
  };

  useEffect(() => {
    if (!sourceUrl || !dimValidation.valid) return;
    let cancelled = false;

    const render = async () => {
      try {
        const img = new window.Image();
        img.src = sourceUrl;
        await new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej(new Error('Image decode error'));
        });

        const canvas = document.createElement('canvas');
        canvas.width = dimValidation.width;
        canvas.height = dimValidation.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, dimValidation.width, dimValidation.height);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, dimValidation.width, dimValidation.height);

        const blob = await canvasToBlob(canvas, format, 0.92);
        if (cancelled) return;
        const nextUrl = registerUrl(URL.createObjectURL(blob));
        setPreviewUrl((prev) => {
          if (prev && prev !== nextUrl) releaseUrl(prev);
          return nextUrl;
        });
        setOutSize(blob.size);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Resize failed.');
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [sourceUrl, dimValidation, format]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleResetDimensions = () => {
    if (origDims.w > 0 && origDims.h > 0) {
      setWidthStr(String(origDims.w));
      setHeightStr(String(origDims.h));
      setLockRatio(true);
    }
  };

  const downloadResized = () => {
    if (!previewUrl || !file || !dimValidation.valid) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `${sanitizeBaseName(file.name)}-${dimValidation.width}x${dimValidation.height}.${ext}`;
    a.click();
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
          Drop an image to resize in pixels
        </p>
        <p className="mt-1 text-xs text-[#78716C] dark:text-[#9E978B]">
          Supports JPG, PNG, and WebP · Processed locally in your browser (1–8,000 px)
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 min-h-10 rounded-lg bg-[#C2522B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A6411E]"
        >
          Choose Image
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

      {file && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
                Presets:
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setLockRatio(false);
                    setWidthStr(String(p.w));
                    setHeightStr(String(p.h));
                  }}
                  className="min-h-9 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#F5F2EB]"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleResetDimensions}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-3 py-1.5 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Original Size
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 sm:grid-cols-4 sm:items-end dark:border-[#2E2A26] dark:bg-[#141312]">
            <div>
              <label
                htmlFor="rz-w"
                className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Width (px)
              </label>
              <input
                id="rz-w"
                type="number"
                min="1"
                max="8000"
                step="1"
                value={widthStr}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
              />
            </div>

            <div>
              <label
                htmlFor="rz-h"
                className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Height (px)
              </label>
              <input
                id="rz-h"
                type="number"
                min="1"
                max="8000"
                step="1"
                value={heightStr}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="font-mono tabular-nums h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => setLockRatio((l) => !l)}
                className={`inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                  lockRatio
                    ? 'border-[#E2B8A8] bg-[#FAF0EB] text-[#A6411E] dark:border-[#5C3123] dark:bg-[#2A1B16] dark:text-[#E06D4B]'
                    : 'border-[#D6CFC2] bg-white text-[#57534E] dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#B8B2A6]'
                }`}
              >
                {lockRatio ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                {lockRatio ? 'Aspect Locked' : 'Free Aspect'}
              </button>
            </div>

            <div>
              <label
                htmlFor="rz-fmt"
                className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Format
              </label>
              <select
                id="rz-fmt"
                value={format}
                onChange={(e) =>
                  setFormat(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp')
                }
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-xs font-medium text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
          </div>

          {!dimValidation.valid && (
            <div
              role="alert"
              className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
            >
              {dimValidation.error}
            </div>
          )}

          {previewUrl && dimValidation.valid && (
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-4 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#57534E] dark:text-[#B8B2A6]">
                  Original:{' '}
                  <strong className="font-mono text-[#1C1B19] dark:text-[#F5F2EB]">
                    {origDims.w}×{origDims.h}
                  </strong>{' '}
                  → New:{' '}
                  <strong className="font-mono text-[#C2522B] dark:text-[#E06D4B]">
                    {dimValidation.width}×{dimValidation.height}
                  </strong>{' '}
                  ({formatBytes(outSize)})
                </span>
                <button
                  type="button"
                  onClick={downloadResized}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#C2522B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A6411E]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download Resized Image
                </button>
              </div>
              <img
                src={previewUrl}
                alt="Resized image preview"
                referrerPolicy="no-referrer"
                className="max-h-72 w-full rounded-lg bg-[#FAF8F4] object-contain dark:bg-[#141312]"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
