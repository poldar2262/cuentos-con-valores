import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeoMeta } from '../data/seoRoutes';
import { Story } from '../types';

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

interface SeoHeadProps {
  stories?: Story[];
}

export function SeoHead({ stories }: SeoHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const seo = getRouteSeoMeta(pathname, stories);

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);

    upsertMeta('property', 'og:type', seo.ogType);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.canonical);
    upsertMeta('property', 'og:image', seo.ogImage);
    upsertMeta('property', 'og:image:alt', seo.ogImageAlt);

    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', seo.ogImage);

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(seo.jsonLd);
  }, [pathname, stories]);

  return null;
}
