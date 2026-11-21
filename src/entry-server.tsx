import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.tsx';
export { getAllStaticRoutes, getRouteSeoMeta, SITE_URL } from './data/seoRoutes';

export function render(pathname = '/'): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
