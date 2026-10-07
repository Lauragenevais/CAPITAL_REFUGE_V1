import type * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Coins, Globe2, Lock, Phone, ShieldCheck, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import goldHero from "@/assets/gold-hero.jpg";
import goldCoins from "@/assets/gold-coins.jpg";
import goldVault from "@/assets/gold-vault.jpg";
import goldBrochure from "@/assets/gold-brochure.jpg";

const NAV = [
  { label: "Lingots ou pièces", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Brochure", href: "#brochure" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "5 000 ans", label: "Valeur refuge reconnue" },
  { value: "LBMA", label: "Cours de référence" },
  { value: "24 carats", label: "Or pur 999,9 ‰" },
  { value: "60 s", label: "Pour faire sa demande" },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Une valeur refuge",
    text: "L'or protège votre patrimoine face à l'inflation et aux crises : il ne dépend d'aucune banque ni d'aucun État.",
  },
  {
    icon: Coins,
    title: "Lingots ou pièces",
    text: "Lingots, lingotins, Napoléon, Krugerrand… nous vous aidons à choisir le format adapté à votre projet.",
  },
  {
    icon: TrendingUp,
    title: "Au cours officiel",
    text: "Des prix indexés sur le cours de référence LBMA, transparents, pour acheter et revendre au juste prix.",
  },
  {
    icon: Globe2,
    title: "Une fiscalité claire",
    text: "Taxe forfaitaire ou régime des plus-values : un expert vous explique l'option la plus avantageuse.",
  },
];

const STEPS = [
  {
    title: "Complétez le formulaire",
    text: "Quelques informations suffisent pour décrire votre projet d'investissement dans l'or.",
  },
  {
    title: "Échangez avec un expert",
    text: "Un spécialiste des métaux précieux vous rappelle pour vous orienter : lingots, pièces, montant, fiscalité.",
  },
  {
    title: "Investissez sereinement",
    text: "Vous achetez au cours du jour, en toute sécurité, et conservez votre or comme vous le souhaitez.",
  },
];

const TESTIMONIALS = [
  {
    name: "Damien",
    meta: "45 ans — Nantes",
    text: "Je voulais sécuriser une partie de mon épargne. L'expert m'a expliqué la différence entre lingots et pièces, sans pression.",
  },
  {
    name: "Sophie",
    meta: "37 ans — Toulouse",
    text: "Démarche rapide et explications claires sur la fiscalité. J'ai commencé par quelques pièces, puis un lingotin.",
  },
  {
    name: "Marc",
    meta: "58 ans — Rennes",
    text: "Ce que j'ai apprécié : des prix basés sur le cours officiel et un vrai accompagnement pour la revente.",
  },
];

const FAQ = [
  {
    q: "Pourquoi investir dans l'or ?",
    a: "L'or est une valeur refuge reconnue depuis des millénaires. Il permet de diversifier son patrimoine et de le protéger face à l'inflation et aux crises financières.",
  },
  {
    q: "Lingots ou pièces : que choisir ?",
    a: "Les lingots conviennent aux montants importants avec une prime faible ; les pièces sont plus faciles à revendre par petites quantités. Votre expert vous aide à trouver le bon équilibre.",
  },
  {
    q: "Comment est fixé le prix de l'or ?",
    a: "Le prix suit le cours de référence LBMA (London Bullion Market Association), publié chaque jour. Le cours peut varier à la hausse comme à la baisse.",
  },
  {
    q: "Quelle est la fiscalité de l'or ?",
    a: "À la revente, vous choisissez entre la taxe forfaitaire sur le prix de cession et le régime des plus-values, avec abattement selon la durée de détention.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos informations restent confidentielles et servent uniquement à vous recontacter au sujet de votre projet.",
  },
];

const CONSENT =
  "J'accepte les conditions générales d'utilisation et d'être recontacté afin de recevoir des informations sur l'investissement dans l'or.";

export function CapRefugeLanding() {
  return (
    <div className="theme-caprefuge min-h-screen bg-background font-sans text-foreground">
      {/* En-tête */}
      <header className="on-navy sticky top-0 z-40 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.12em] uppercase">Cap Refuge</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#formulaire" className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex">
            <Phone className="h-4 w-4" /> Être rappelé
          </a>
        </div>
      </header>

      {/* Hero : photo pleine largeur, texte à gauche, formulaire à droite */}
      <section id="top" className="on-navy relative overflow-hidden">
        <img
          src={goldHero}
          alt="Lingots et pièces d'or sur un marbre sombre"
          width={1280}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Or physique · Cours LBMA</p>
            <h1 className="font-display mt-6 text-4xl leading-[1.08] font-semibold md:text-6xl">
              Investir et acheter de <span className="text-primary">l&apos;or</span>, en toute sérénité
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Lingots, pièces, cours et fiscalité : nos experts vous accompagnent gratuitement pour protéger
              durablement votre patrimoine.
            </p>
            <ul className="mt-8 space-y-3">
              {["Lingots ou pièces : le bon choix", "Comprendre le cours de l'or (LBMA)", "Fiscalité et revente au meilleur cours"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <dt className="font-display text-lg font-semibold text-primary">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] text-muted-foreground uppercase">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="w-full max-w-xl justify-self-center lg:justify-self-end">
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Bienvenue ! Laissez-nous vos coordonnées, un expert vous rappelle pour répondre à toutes vos questions.
            </p>
            <LeadForm
              enhanced
              sheetTab="Or"
              operation="OR"
              consentLabel={CONSENT}
              badge="Accompagnement gratuit"
              title="Être rappelé par un expert"
              subtitle="Gratuit et sans engagement, en moins d'une minute"
              amountQuestion="Quel montant envisagez-vous d'investir dans l'or ?"
            />
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
              <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">
                Le cours de l'or a progressé de <strong className="text-primary">+4,6 % sur 12 mois</strong> et de{" "}
                <strong className="text-primary">+126 % sur 3 ans</strong>.
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  Cours de l'once en USD, au 7 octobre 2026 (source : Boursorama). Les performances passées ne préjugent pas des performances futures.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <a
        href="#formulaire"
        className="fixed inset-x-4 bottom-4 z-50 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gold font-bold text-primary-foreground shadow-gold lg:hidden"
      >
        <Phone className="h-5 w-5" /> Être rappelé gratuitement
      </a>

      {/* Avantages */}
      <section id="avantages" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Pourquoi l'or" title="Un pilier pour votre patrimoine" text="Un actif tangible, universel et durable pour diversifier votre épargne en dehors des marchés financiers." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <article key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lingots ou pièces */}
      <section id="projet" className="bg-surface py-24">
        <SplitSection image={goldCoins} alt="Pièces d'or d'investissement">
          <SectionHeading eyebrow="Lingots ou pièces" title="Le bon format pour votre projet" />
          <ul className="mt-8 space-y-4">
            {[
              ["Les lingots pour les montants importants", "Une prime réduite et un or pur 999,9 ‰ certifié."],
              ["Les pièces pour plus de souplesse", "Napoléon, Krugerrand, Maple Leaf : faciles à revendre par petites quantités."],
              ["Revendre au meilleur cours", "Une estimation au cours du jour, toujours détaillée par écrit."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </SplitSection>
      </section>

      {/* Brochure */}
      <section id="brochure" className="py-24">
        <SplitSection image={goldBrochure} alt="Brochure Cap Refuge sur l'investissement dans l'or" reverse>
          <SectionHeading eyebrow="Brochure gratuite" title="Demandez votre brochure" text="Tout ce qu'il faut savoir pour investir dans l'or physique, réuni dans un guide clair :" />
          <ul className="mt-6 space-y-3">
            {["Pourquoi l'or dans un patrimoine", "Lingots ou pièces : le bon choix", "Comprendre le cours de l'or (LBMA)", "La fiscalité et la revente expliquées"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Button variant="hero" size="xl" className="mt-8" asChild>
            <a href="#formulaire">Recevoir ma brochure <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </SplitSection>
      </section>

      {/* Étapes */}
      <section id="etapes" className="on-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Déroulement" title="Trois étapes, simplement" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 font-display font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sécurité */}
      <section className="py-24">
        <SplitSection image={goldVault} alt="Coffre-fort rempli de lingots d'or">
          <SectionHeading eyebrow="Sécurité" title="Acheter en toute confiance" text="Or certifié LBMA, prix transparents et conseils d'experts : vous savez exactement ce que vous achetez, à quel prix, et comment le conserver ou le revendre." />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[["999,9 ‰", "or pur"], ["LBMA", "cours officiel"], ["100 %", "sans engagement"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-4">
                <p className="font-display text-xl font-semibold text-primary">{v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </SplitSection>
      </section>

      {/* Avis */}
      <section id="avis" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Témoignages" title="Ils ont investi dans l'or" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <blockquote className="text-muted-foreground">« {t.text} »</blockquote>
                <figcaption className="mt-5 text-sm font-semibold">
                  {t.name} <span className="font-normal text-muted-foreground">— {t.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Questions fréquentes</h2>
        <Accordion type="single" collapsible>
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="on-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Faites le premier pas vers l&apos;or</h2>
            <p className="mt-2 text-muted-foreground">Gratuit, sans engagement - un expert vous rappelle.</p>
          </div>
          <Button variant="hero" size="xl" asChild>
            <a href="#formulaire">Être rappelé par un expert <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl space-y-5 px-6 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-display font-semibold tracking-[0.12em] text-foreground uppercase">Cap Refuge</span>
            <nav className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="hover:text-primary">Politique de confidentialité</Link>
            </nav>
          </div>
          <p className="flex items-start gap-2 text-xs">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Les informations de ce site sont fournies à titre indicatif et ne constituent pas un conseil en
            investissement. Le cours de l&apos;or peut varier à la hausse comme à la baisse ; tout investissement
            comporte un risque de perte en capital.
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a href="#formulaire">Être rappelé par un expert</a>
        </Button>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">{eyebrow}</p>
      <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
      {text && <p className="mt-5 text-muted-foreground">{text}</p>}
    </div>
  );
}

function SplitSection({ image, alt, reverse, children }: { image: string; alt: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
      <img src={image} alt={alt} width={1280} height={960} loading="lazy" className={`aspect-[4/3] w-full rounded-3xl object-cover ${reverse ? "lg:order-2" : ""}`} />
      <div>{children}</div>
    </div>
  );
}
