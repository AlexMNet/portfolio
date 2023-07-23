'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

/**
 *
 * Need to use useEffect to prevent error:
 * p-index.js:32 Warning: Prop `id` did not match. Server: "radix-:Rl6cq:" Client: "radix-:R2kpj9:"
    at button
    at _c (webpack-internal:///(app-pages-browser)/./components/ui/button.tsx:40:11)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:46:23)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:20:23)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-primitive/dist/index.mjs:44:26)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:46:23)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:20:23)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-primitive/dist/index.mjs:44:26)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-popper/dist/index.mjs:80:28)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-menu/dist/index.mjs:211:26)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs:110:34)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-context/dist/index.mjs:47:28)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-context/dist/index.mjs:47:28)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-context/dist/index.mjs:47:28)
    at $cf1ac5d9fe0e8206$export$badac9ada3a0bdf9 (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-popper/dist/index.mjs:65:28)
    at $6cc32821e9371a1c$export$d9b273488cd8ce6f (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-menu/dist/index.mjs:150:26)
    at Provider (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-context/dist/index.mjs:47:28)
    at $d08ef79370b62062$export$e44a253a59704894 (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs:75:34)
    at ModeToggle (webpack-internal:///(app-pages-browser)/./components/mode-toggle.tsx:22:86)
    at div
    at div
    at div
    at div
    at f (webpack-internal:///(app-pages-browser)/./node_modules/next-themes/dist/index.module.js:8:597)
    at $ (webpack-internal:///(app-pages-browser)/./node_modules/next-themes/dist/index.module.js:8:348)
    at ThemeProvider (webpack-internal:///(app-pages-browser)/./components/theme-provder.tsx:13:11)
    at body
    at html
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:73:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:81:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:54:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:62:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:32:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/internal/ReactDevOverlay.js:66:9)
    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/hot-reloader-client.js:326:11)
    at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:148:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:77:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:104:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:396:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:166:11)
    at RSCComponent
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/internal/ReactDevOverlay.js:66:9)
    at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:183:11)
w
 *
 */
