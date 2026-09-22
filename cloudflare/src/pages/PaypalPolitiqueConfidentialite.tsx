import { Link } from "react-router-dom";

import { useHead } from "@/hooks/useHead";
import { ArrowLeft, TrendingUp } from "lucide-react";

const SECTIONS = [
  {
    title: "Responsable du traitement",
    content: [
      "ROBUSTRANQUILITY",
      "Rua Joaquim António de Aguiar 43, 1070-150 Lisboa - Portugal",
      "Contact : jonathan@easy-borne.com",
    ],
  },
  {
    title: "Collecte des données personnelles",
    content: [
      "Nous collectons les informations que vous nous fournissez volontairement via le formulaire PayPal Capital : nom, prénom, email, téléphone, adresse IP, ainsi que l'opération concernée (PayPal).",
    ],
  },
  {
    title: "Utilisation des données",
    content: [
      "Vos données sont utilisées uniquement pour :",
      "- Vous recontacter suite à votre demande d'information sur l'action PayPal (PYPL) et son écosystème de paiement numérique",
      "- Vous envoyer la documentation demandée",
      "- Vous tenir informé de nos offres (avec votre consentement)",
      "- Transmettre vos coordonnées à nos partenaires commerciaux dans le cadre du programme PayPal Capital",
    ],
  },
  {
    title: "Conservation des données",
    content: [
      "Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact avec nous.",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à jonathan@easy-borne.com.",
    ],
  },
  {
    title: "Sécurité",
    content: [
      "Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé.",
    ],
  },
  {
    title: "Politique des cookies",
    content: [
      "Qu'est-ce qu'un cookie ? Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.",
      "Cookies utilisés sur ce site : cookies essentiels (nécessaires au fonctionnement du site), cookies analytiques (ils nous aident à comprendre comment vous utilisez le site), cookies marketing (utilisés pour vous proposer des publicités pertinentes).",
      "Gestion des cookies : vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur.",
      "Durée de conservation : les cookies sont conservés pour une durée maximale de 13 mois.",
    ],
  },
];

export default function PaypalPolitiqueConfidentialite() {
  useHead({
    title: "Politique de confidentialité — PayPal Capital",
    description:
      "Politique de confidentialité du site PayPal Capital : données collectées, finalités, durée de conservation et exercice de vos droits RGPD.",
  });

  return (
    <div className="theme-paypal min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/paypal" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">PayPal Capital</span>
          </Link>
          <Link
            to="/paypal"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la page PayPal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Confidentialité</p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Politique de confidentialité</h1>
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
          <span className="font-display text-base font-bold text-foreground">PayPal Capital</span>
          <nav className="flex gap-6">
            <Link to="/mentions-legales-paypal" className="transition-colors hover:text-primary">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite-paypal" className="text-primary">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
