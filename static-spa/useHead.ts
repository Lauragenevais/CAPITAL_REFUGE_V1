// → à copier dans src/hooks/useHead.ts
// Remplace l'option head() de TanStack Router : met à jour <title> et
// <meta name="description"> quand la page est affichée.
import { useEffect } from "react";

export function useHead({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
  }, [title, description]);
}
