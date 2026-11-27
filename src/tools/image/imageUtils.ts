export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function sanitizeBaseName(filename: string): string {
  const dotIdx = filename.lastIndexOf('.');
  const base = dotIdx > 0 ? filename.slice(0, dotIdx) : filename;
  return base.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
}

export function loadImageFromFile(file: File): Promise<{
  img: HTMLImageElement;
  objectUrl: string;
}> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPG, PNG, or WebP).'));
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      reject(new Error('File is larger than 50 MB. Please choose a smaller image.'));
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => resolve({img, objectUrl});
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not decode this image file. Please try another file.'));
    };
    img.src = objectUrl;
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to encode output image.'));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}
