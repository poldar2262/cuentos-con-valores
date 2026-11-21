import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
export { getAllStaticRoutes, getRouteSeoMeta, SITE_URL } from './data/seoRoutes';

export function render(pathname = '/'): string {
  return renderToString(
    <StrictMode>
      <App initialPathname={pathname} />
    </StrictMode>
  );
}
