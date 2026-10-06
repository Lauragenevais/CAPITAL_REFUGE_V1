import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const TEMPLATES = [
  { id: "amazon", label: "Amazon Coin", path: "/email/promo-amazon.html" },
  { id: "chatgpt", label: "ChatGPT Capital", path: "/email/promo-chatgpt.html" },
  { id: "nvidia", label: "Nvidia Capital", path: "/email/promo-nvidia.html" },
  { id: "paypal", label: "PayPal Capital", path: "/email/promo-paypal.html" },
  { id: "google", label: "Google Capital", path: "/email/promo-google.html" },
] as const;

type TemplateId = (typeof TEMPLATES)[number]["id"];

export const Route = createFileRoute("/email-template")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Templates email — Pré-inscriptions" },
      {
        name: "description",
        content:
          "Aperçu et copie des templates email promotionnels (Amazon Coin, ChatGPT Capital, Nvidia Capital, PayPal Capital, Google Capital) : visuels, accroche et boutons d'inscription.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Templates email — Pré-inscriptions" },
      {
        property: "og:description",
        content: "Aperçu et copie des templates email promotionnels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmailTemplatePage,
});

function EmailTemplatePage() {
  const [selected, setSelected] = useState<TemplateId>("amazon");
  const [html, setHtml] = useState("");

  const template = TEMPLATES.find((t) => t.id === selected) ?? TEMPLATES[0];

  useEffect(() => {
    setHtml("");
    fetch(template.path)
      .then((r) => r.text())
      .then((raw) =>
        setHtml(
          raw
            .replaceAll("{{BASE}}", window.location.origin)
            .replaceAll("{{UNSUBSCRIBE}}", "{{unsubscribe_url}}"),
        ),
      )
      .catch(() => toast.error("Impossible de charger le template"));
  }, [template.path]);

  const copy = async () => {
    await navigator.clipboard.writeText(html);
    toast.success("HTML copié dans le presse-papier");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Templates email promotionnels</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Fond uni, visuels intégrés et accroche orientée conversion. Les liens pointent vers le
        formulaire de pré-inscription. Remplacez <code>{"{{unsubscribe_url}}"}</code> par le lien de
        désinscription de votre outil d&apos;envoi.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <Button
            key={t.id}
            variant={t.id === selected ? "default" : "outline"}
            onClick={() => setSelected(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={copy} disabled={!html}>
          Copier le HTML
        </Button>
        <Button variant="outline" asChild>
          <a href={template.path} target="_blank" rel="noreferrer">
            Ouvrir le fichier brut
          </a>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <iframe
          key={template.id}
          title={`Aperçu email ${template.label}`}
          srcDoc={html}
          className="h-[1400px] w-full bg-white"
        />
      </div>
    </main>
  );
}
