import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Amazon Capital" },
      {
        name: "description",
        content:
          "Politique de confidentialité du site Amazon Capital : données collectées, finalités, durée de conservation et exercice de vos droits RGPD.",
      },
      { property: "og:title", content: "Politique de confidentialité — Amazon Capital" },
      {
        property: "og:description",
        content: "Comment Amazon Capital collecte, utilise et protège vos données personnelles conformément au RGPD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PolitiqueConfidentialite,
});

const SECTIONS = [
  {
    title: "Responsable du traitement",
    content: [
      "La société Amazon Capital, éditrice du site, est responsable du traitement des données personnelles collectées via les formulaires présents sur ce site.",
    ],
  },
  {
    title: "Données collectées",
    content: [
      "Dans le cadre de la vérification d'éligibilité, nous collectons : votre nom, votre prénom, votre adresse email, votre numéro de téléphone et votre adresse IP.",
      "Aucune donnée bancaire ni aucun document d'identité n'est demandé via ce site.",
    ],
  },
  {
    title: "Finalités du traitement",
    content: [
      "Vos données sont utilisées exclusivement pour : vérifier votre éligibilité au programme présenté, vous mettre en relation avec un conseiller partenaire, et répondre à vos demandes.",
      "Vos données ne font l'objet d'aucune revente à des tiers à des fins commerciales.",
    ],
  },
  {
    title: "Durée de conservation",
    content: [
      "Vos données personnelles sont conservées pour une durée maximale de 3 ans à compter de votre dernière interaction avec nos services, conformément aux recommandations applicables à la prospection.",
    ],
  },
  {
    title: "Sécurité",
    content: [
      "Les informations transmises via les formulaires sont chiffrées et hébergées sur une infrastructure sécurisée située au sein de l'Union européenne.",
      "L'accès aux données est strictement limité aux personnes habilitées dans le cadre de leurs missions.",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité concernant vos données personnelles.",
      "Pour exercer ces droits, vous pouvez adresser votre demande par courrier au siège social de l'éditeur, accompagnée d'un justificatif d'identité.",
      "Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Ce site n'utilise pas de cookies publicitaires ni de traceurs de mesure d'audience tiers.",
    ],
  },
];

function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Amazon Capital</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
          Protection des données
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Politique de confidentialité</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Dernière mise à jour : septembre 2026
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-border/70 bg-card p-6"
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/60 bg-surface/60 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground">
          <span className="font-display text-base font-bold text-foreground">Amazon Capital</span>
          <nav className="flex gap-6">
            <Link to="/mentions-legales" className="transition-colors hover:text-primary">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-primary">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
