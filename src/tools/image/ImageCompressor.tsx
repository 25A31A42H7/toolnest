import {Download, RotateCcw, Upload} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import {canvasToBlob, formatBytes, loadImageFromFile, sanitizeBaseName} from './imageUtils';

export default function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeUrlsRef = useRef<Set<string>>(new Set());
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [originalDims, setOriginalDims] = useState<{w: number; h: number} | null>(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [outputDims, setOutputDims] = useState<{w: number; h: number} | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

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

  const handleFile = async (selected: File) => {
    setError('');
    setProcessing(true);
    try {
      const {img, objectUrl} = await loadImageFromFile(selected);
      registerUrl(objectUrl);
      setOriginalUrl((prev) => {
        if (prev && prev !== objectUrl) releaseUrl(prev);
        return objectUrl;
      });
      setFile(selected);
      setOriginalDims({w: img.naturalWidth, h: img.naturalHeight});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to read image.');
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!file || !originalUrl || !originalDims) return;
    let cancelled = false;

    const run = async () => {
      setProcessing(true);
      try {
        const img = new window.Image();
        img.src = originalUrl;
        await new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej(new Error('Failed to load preview.'));
        });

        let targetW = img.naturalWidth;
        let targetH = img.naturalHeight;
        if (maxWidth > 0 && targetW > maxWidth) {
          targetH = Math.max(1, Math.round((targetH * maxWidth) / targetW));
          targetW = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context is not supported in this browser.');

        if (format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetW, targetH);

        const blob = await canvasToBlob(canvas, format, quality / 100);
        if (cancelled) return;

        const outUrl = registerUrl(URL.createObjectURL(blob));
        setCompressedUrl((prev) => {
          if (prev && prev !== outUrl) releaseUrl(prev);
          return outUrl;
        });
        setCompressedSize(blob.size);
        setOutputDims({w: targetW, h: targetH});
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Compression failed.');
      } finally {
        if (!cancelled) setProcessing(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [file, originalUrl, originalDims, quality, maxWidth, format]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleReset = () => {
    releaseUrl(originalUrl);
    releaseUrl(compressedUrl);
    setFile(null);
    setOriginalUrl('');
    setOriginalDims(null);
    setCompressedUrl('');
    setCompressedSize(0);
    setOutputDims(null);
    setQuality(80);
    setMaxWidth(0);
    setFormat('image/jpeg');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const savedPct =
    file && compressedSize > 0
      ? Math.round(((file.size - compressedSize) / file.size) * 100)
      : 0;

  const downloadFile = () => {
    if (!compressedUrl || !file) return;
    const ext = format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `${sanitizeBaseName(file.name)}-compressed.${ext}`;
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
          Drop a JPG, PNG, or WebP image here
        </p>
        <p className="mt-1 text-xs text-[#78716C] dark:text-[#9E978B]">
          100% browser-based · Files never leave your device (max 50 MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const picked = e.target.files?.[0];
            if (picked) handleFile(picked);
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
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-4 sm:grid-cols-3 dark:border-[#2E2A26] dark:bg-[#141312]">
            <div>
              <div className="mb-1.5 flex justify-between text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]">
                <label htmlFor="comp-quality">Quality</label>
                <span className="font-mono tabular-nums text-[#C2522B] dark:text-[#E06D4B]">
                  {quality}%
                </span>
              </div>
              <input
                id="comp-quality"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-[#C2522B]"
              />
            </div>

            <div>
              <label
                htmlFor="comp-format"
                className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Output Format
              </label>
              <select
                id="comp-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as 'image/jpeg' | 'image/webp')}
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-xs font-medium text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
              >
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/webp">WebP (.webp — Smaller)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="comp-maxw"
                className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
              >
                Max Width Cap
              </label>
              <select
                id="comp-maxw"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="h-10 w-full rounded-lg border border-[#D6CFC2] bg-white px-3 text-xs font-medium text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#1D1B19] dark:text-[#F5F2EB]"
              >
                <option value={0}>Keep Original Width</option>
                <option value={1920}>1920 px (Full HD)</option>
                <option value={1600}>1600 px (Blog Hero)</option>
                <option value={1200}>1200 px (Web Standard)</option>
                <option value={800}>800 px (Thumbnail)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E7E2D8] bg-white p-4 dark:border-[#2E2A26] dark:bg-[#1D1B19]">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#57534E] dark:text-[#B8B2A6]">Original</span>
                <span className="font-mono tabular-nums text-[#1C1B19] dark:text-[#F5F2EB]">
                  {formatBytes(file.size)} · {originalDims?.w}×{originalDims?.h}
                </span>
              </div>
              {originalUrl && (
                <img
                  src={originalUrl}
                  alt="Original upload preview"
                  referrerPolicy="no-referrer"
                  className="h-48 w-full rounded-lg bg-[#FAF8F4] object-contain dark:bg-[#141312]"
                />
              )}
            </div>

            <div className="rounded-xl border border-[#E2B8A8] bg-white p-4 dark:border-[#5C3123] dark:bg-[#1D1B19]">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#C2522B] dark:text-[#E06D4B]">
                  Compressed {savedPct > 0 ? `(${savedPct}% smaller)` : ''}
                </span>
                <span className="font-mono tabular-nums text-[#1C1B19] dark:text-[#F5F2EB]">
                  {processing
                    ? 'Compressing...'
                    : `${formatBytes(compressedSize)} · ${outputDims?.w}×${outputDims?.h}`}
                </span>
              </div>
              {compressedUrl && (
                <img
                  src={compressedUrl}
                  alt="Compressed result preview"
                  referrerPolicy="no-referrer"
                  className="h-48 w-full rounded-lg bg-[#FAF8F4] object-contain dark:bg-[#141312]"
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#E7E2D8] bg-white px-4 py-2 text-xs font-medium text-[#57534E] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#25221F] dark:text-[#B8B2A6]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Remove Image
            </button>

            <button
              type="button"
              onClick={downloadFile}
              disabled={!compressedUrl || processing}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#C2522B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A6411E] disabled:opacity-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Compressed Image
            </button>
          </div>
        </>
      )}
    </div>
  );
}
