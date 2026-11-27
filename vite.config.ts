import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function resolveBasePath(): string {
  const explicit = (process.env.VITE_BASE_PATH || '').trim();
  if (explicit) {
    const trimmed = explicit.replace(/^\/+|\/+$/g, '');
    return trimmed ? `/${trimmed}/` : '/';
  }
  const siteUrl = (process.env.VITE_SITE_URL || '').trim();
  if (siteUrl) {
    try {
      const pathname = new URL(siteUrl).pathname.replace(/^\/+|\/+$/g, '');
      return pathname ? `/${pathname}/` : '/';
    } catch {
      // Fallback to root path if VITE_SITE_URL is not a full URL
    }
  }
  return '/';
}

export default defineConfig(({isSsrBuild}) => {
  return {
    base: resolveBasePath(),
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error || isSsrBuild) {
            return;
          }
          const distDir = path.resolve(import.meta.dirname, 'dist');
          const srcAssets = path.resolve(import.meta.dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    build: isSsrBuild
      ? undefined
      : {
          rolldownOptions: {
            output: {
              manualChunks(id: string) {
                if (
                  id.includes('/node_modules/react/') ||
                  id.includes('/node_modules/react-dom/')
                ) {
                  return 'react-vendor';
                }
                if (id.includes('/node_modules/lucide-react/')) {
                  return 'icons-vendor';
                }
                return undefined;
              },
            },
          },
        },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
