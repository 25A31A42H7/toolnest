/**
 * Site-wide domain and contact configuration.
 *
 * Set `VITE_SITE_URL` in your `.env` (or GitHub Actions build environment)
 * before building for production (e.g. `https://toolnest.org`).
 *
 * Set `VITE_CONTACT_FORM_ENDPOINT` to a Formspree / Web3Forms HTTPS endpoint
 * (e.g. `https://formspree.io/f/xxxxxxxx`) to enable live contact form delivery.
 */

const PLACEHOLDER_OR_DEV_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'example.com',
  'www.example.com',
  'example.org',
  'www.example.org',
  'example.net',
  'www.example.net',
]);

export function isPlaceholderOrDevHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase();
  if (!host) return true;
  if (PLACEHOLDER_OR_DEV_HOSTS.has(host)) return true;
  if (
    host.endsWith('.local') ||
    host.endsWith('.example.com') ||
    host.endsWith('.example.org') ||
    host.endsWith('.run.app')
  ) {
    return true;
  }
  return false;
}

export function isValidProductionSiteUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }
    return !isPlaceholderOrDevHost(parsed.hostname);
  } catch {
    return false;
  }
}

const rawSiteUrl = (import.meta.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const configuredUrl = isValidProductionSiteUrl(rawSiteUrl) ? rawSiteUrl : '';
const rawContactEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '').trim();

export function getCanonicalOrigin(): string {
  return configuredUrl;
}

export function isValidHttpsEndpoint(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const SITE_CONFIG = {
  name: 'ToolNest',
  tagline: 'Free Online Tools for Everyone',
  configuredUrl,
  contactFormEndpoint: isValidHttpsEndpoint(rawContactEndpoint) ? rawContactEndpoint : '',
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL || '').trim(),
};
