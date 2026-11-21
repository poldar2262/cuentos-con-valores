import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const hasSsrContent =
  rootEl.firstElementChild !== null &&
  !rootEl.innerHTML.includes('<!--ssr-start-->');

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (hasSsrContent) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
