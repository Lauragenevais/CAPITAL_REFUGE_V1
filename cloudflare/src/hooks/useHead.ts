import { useEffect } from "react";

type HeadOptions = {
  title: string;
  description: string;
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

/** Met à jour le <title> et les balises meta principales de la page courante. */
export function useHead({ title, description }: HeadOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
  }, [title, description]);
}
