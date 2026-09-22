import { Link } from "react-router-dom";

import { useHead } from "@/hooks/useHead";
import { ArrowLeft, TrendingUp } from "lucide-react";

const SECTIONS = [
  {
    title: "Éditeur du site",
    content: [
      "Le site Google Capital est édité par la société ROBUSTRANQUILITY, dont le siège social est situé au Rua Joaquim António de Aguiar 43, 1070-150 Lisboa - Portugal.",
    ],
  },
  {
    title: "Hébergeur",
    content: [
      "Le site est hébergé par Scaleway, Société par actions simplifiée au capital de 214 410,50 €, dont le siège social est situé au 8 rue de la Ville l'Évêque, 75008 Paris, France.",
    ],
  },
  {
    title: "Contact",
    content: ["Email : jonathan@easy-borne.com"],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble des éléments du site (textes, images, graphismes, logos, structure, code HTML/CSS/JS, etc.) sont protégés par le droit d'auteur et demeurent la propriété exclusive de ROBUSTRANQUILITY ou de ses partenaires.",
      "Les marques Google, Alphabet, YouTube, Android, GOOGL et GOOG appartiennent à leurs propriétaires respectifs et sont mentionnées à titre informatif. Ce site n'est ni affilié à Google Holdings, Inc., ni approuvé par elle.",
    ],
  },
  {
    title: "Responsabilités",
    content: [
      "Le contenu du site est fourni à titre informatif et ne constitue pas un conseil en investissement. Les informations citées au sujet de Google, de l'action GOOGL et GOOG et de ses activités technologiques ne préjugent pas des résultats futurs et ne constituent aucune promesse de rendement.",
      "Tout investissement en actions comporte un risque de perte partielle ou totale du capital engagé. Malgré le soin apporté à sa rédaction, ROBUSTRANQUILITY ne saurait être tenu responsable d'éventuelles erreurs, omissions ou d'une indisponibilité temporaire des informations.",
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "Les données collectées sur le site font l'objet d'un traitement conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés ». Vous disposez d'un droit d'accès, de rectification, d'opposition, d'effacement, de limitation et de portabilité de vos données. Pour exercer ces droits, contactez-nous à jonathan@easy-borne.com.",
    ],
  },
];

export default function GoogleMentionsLegales() {
  useHead({
    title: "Mentions légales — Google Capital",
    description:
      "Mentions légales du site Google Capital : éditeur, hébergement, propriété intellectuelle et limites de responsabilité.",
  });

  return (
    <div className="theme-google min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/google" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Google Capital</span>
          </Link>
          <Link
            to="/google"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la page Google
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Informations légales</p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Mentions légales</h1>
        <p className="mt-4 text-sm text-muted-foreground">Dernière mise à jour : septembre 2026</p>

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
          <span className="font-display text-base font-bold text-foreground">Google Capital</span>
          <nav className="flex gap-6">
            <Link to="/mentions-legales-google" className="text-primary">
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite-google"
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
