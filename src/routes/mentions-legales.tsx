import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Amazon Capital" },
      {
        name: "description",
        content:
          "Mentions légales du site Amazon Capital : éditeur, hébergement, propriété intellectuelle et limites de responsabilité.",
      },
      { property: "og:title", content: "Mentions légales — Amazon Capital" },
      {
        property: "og:description",
        content: "Informations légales relatives à l'éditeur et à l'hébergement du site Amazon Capital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MentionsLegales,
});

const SECTIONS = [
  {
    title: "Éditeur du site",
    content: [
      "Le présent site est édité par la société Amazon Capital, société par actions simplifiée au capital de 50 000 €, immatriculée au registre du commerce et des sociétés de Paris sous le numéro 912 345 678.",
      "Siège social : 24 avenue de l'Opéra, 75001 Paris, France.",
      "Directeur de la publication : le représentant légal de la société.",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Le site est hébergé par Lovable Cloud, dont l'infrastructure repose sur des centres de données situés au sein de l'Union européenne.",
      "Les données transmises via les formulaires sont traitées dans le respect du Règlement général sur la protection des données (RGPD).",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble des éléments constituant ce site (textes, illustrations, logos, mise en page) est protégé par le droit de la propriété intellectuelle.",
      "Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable écrite est interdite et constituerait une contrefaçon.",
    ],
  },
  {
    title: "Limites de responsabilité",
    content: [
      "Les informations diffusées sur ce site sont fournies à titre indicatif et ne constituent en aucun cas un conseil en investissement, une offre d'achat ou de vente d'instruments financiers.",
      "Les performances évoquées reposent sur des projections et ne préjugent pas des résultats futurs. Tout investissement en cryptomonnaies comporte un risque de perte partielle ou totale du capital engagé.",
      "L'éditeur ne saurait être tenu responsable des décisions prises sur la base des contenus publiés sur ce site.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera porté devant les tribunaux compétents du ressort du siège social de l'éditeur.",
    ],
  },
];

function MentionsLegales() {
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
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Informations légales</p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Mentions légales</h1>
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
            <Link to="/mentions-legales" className="text-primary">
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite"
              className="transition-colors hover:text-primary"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
