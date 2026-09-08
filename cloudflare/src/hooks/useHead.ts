import { useEffect } from "react";

type HeadOptions = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  siteName?: string;
  canonical?: string;
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Met à jour le <title> et les balises meta principales de la page courante. */
export function useHead({
  title,
  description,
  ogTitle,
  ogDescription,
  siteName,
  canonical,
}: HeadOptions) {
  useEffect(() => {
    const social = ogTitle ?? title;
    const socialDesc = ogDescription ?? description;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: social });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: socialDesc,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "fr_FR" });
    if (siteName) {
      upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName });
    }
    const url = canonical ?? window.location.href.split("#")[0];
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertCanonical(url);
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: social });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: socialDesc,
    });
  }, [title, description, ogTitle, ogDescription, siteName, canonical]);
}
