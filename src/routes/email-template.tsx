import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/email-template")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Template email — Amazon Coin" },
      {
        name: "description",
        content:
          "Aperçu et copie du template email promotionnel Amazon Coin : visuels, accroche et boutons d'inscription.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Template email — Amazon Coin" },
      {
        property: "og:description",
        content: "Aperçu et copie du template email promotionnel Amazon Coin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmailTemplatePage,
});

function EmailTemplatePage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/email/promo-amazon.html")
      .then((r) => r.text())
      .then((raw) =>
        setHtml(
          raw
            .replaceAll("{{BASE}}", window.location.origin)
            .replaceAll("{{UNSUBSCRIBE}}", "{{unsubscribe_url}}"),
        ),
      )
      .catch(() => toast.error("Impossible de charger le template"));
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(html);
    toast.success("HTML copié dans le presse-papier");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Template email promotionnel</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Fond uni, visuels intégrés et accroche orientée conversion. Les liens pointent vers le
        formulaire de pré-inscription. Remplacez <code>{"{{unsubscribe_url}}"}</code> par le lien de
        désinscription de votre outil d&apos;envoi.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={copy} disabled={!html}>
          Copier le HTML
        </Button>
        <Button variant="outline" asChild>
          <a href="/email/promo-amazon.html" target="_blank" rel="noreferrer">
            Ouvrir le fichier brut
          </a>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <iframe title="Aperçu email" srcDoc={html} className="h-[1400px] w-full bg-white" />
      </div>
    </main>
  );
}
