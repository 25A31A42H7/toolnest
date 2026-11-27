import {useEffect} from 'react';
import {getCanonicalOrigin, isPlaceholderOrDevHost} from '../config/site';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function removeCanonical() {
  const el = document.querySelector('link[rel="canonical"]');
  if (el) el.remove();
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  structuredData,
  noIndex = false,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const origin = getCanonicalOrigin();
    const isDevRuntime =
      typeof window !== 'undefined' && isPlaceholderOrDevHost(window.location.hostname);
    const allowIndex = Boolean(origin) && !noIndex && !isDevRuntime;

    upsertMeta('name', 'robots', allowIndex ? 'index, follow' : 'noindex, nofollow');
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (origin && !noIndex) {
      const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath;
      const canonicalUrl = cleanPath === '/' ? `${origin}/` : `${origin}${cleanPath}`;
      upsertMeta('property', 'og:url', canonicalUrl);
      upsertCanonical(canonicalUrl);
    } else {
      removeMeta('property', 'og:url');
      removeCanonical();
    }

    const scriptId = 'toolnest-structured-data';
    let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (structuredData) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = scriptId;
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [title, description, canonicalPath, structuredData, noIndex]);

  return null;
}
