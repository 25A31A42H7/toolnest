import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

const BASE_PREFIX = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

export function normalizePath(raw: string): string {
  if (!raw || raw === '/') return '/';
  const withoutHtml = raw.replace(/\.html$/i, '');
  const cleaned = withoutHtml.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : '/' + cleaned;
}

export function stripBase(pathname: string): string {
  if (BASE_PREFIX && pathname.startsWith(BASE_PREFIX)) {
    const rest = pathname.slice(BASE_PREFIX.length);
    return normalizePath(rest || '/');
  }
  return normalizePath(pathname);
}

export function withBase(appPath: string): string {
  const normalized = normalizePath(appPath);
  if (!BASE_PREFIX) return normalized;
  return normalized === '/' ? `${BASE_PREFIX}/` : `${BASE_PREFIX}${normalized}`;
}

function restoreGitHubPagesRedirect(): string {
  if (typeof window === 'undefined') return '/';
  const {search, pathname, hash} = window.location;
  if (search.startsWith('?/')) {
    const decoded = search
      .slice(2)
      .split('&')
      .map((s) => s.replace(/~and~/g, '&'))
      .join('?');
    const appPath = normalizePath('/' + decoded.split('?')[0].replace(/^\/+/, ''));
    const queryIdx = decoded.indexOf('?');
    const restoredQuery = queryIdx >= 0 ? decoded.slice(queryIdx) : '';
    window.history.replaceState(null, '', withBase(appPath) + restoredQuery + hash);
    return appPath;
  }
  return stripBase(pathname || '/');
}

export function RouterProvider({
  children,
  initialPath,
}: {
  children: React.ReactNode;
  initialPath?: string;
}) {
  const [path, setPath] = useState<string>(() => {
    if (initialPath !== undefined) return normalizePath(initialPath);
    if (typeof window === 'undefined') return '/';
    return restoreGitHubPagesRedirect();
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPopState = () => {
      setPath(stripBase(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = normalizePath(to);
    if (typeof window === 'undefined') {
      setPath(target);
      return;
    }
    if (target === stripBase(window.location.pathname)) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    window.history.pushState(null, '', withBase(target));
    setPath(target);
    window.scrollTo({top: 0, behavior: 'auto'});
  }, []);

  return <RouterContext.Provider value={{path, navigate}}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({to, onClick, children, ...rest}: LinkProps) {
  const {navigate} = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={withBase(to)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
