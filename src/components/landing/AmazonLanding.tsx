import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Coins,
  Globe2,
  Lock,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import heroPortrait from "@/assets/gold-hero.jpg";
import blockGrowth from "@/assets/gold-coins.jpg";
import blockGlobal from "@/assets/gold-vault.jpg";

const NAV = [
  { label: "Lingots ou pièces", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Avis", href: "#avis" },
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

export function AmazonLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Bandeau haut */}
      <div className="bg-surface/80 px-4 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
        <Coins className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
        Cap Refuge — investir et acheter de l’or physique en toute sérénité
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Cap Refuge</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>
          <Button variant="hero" size="lg" asChild>
            <a href="#formulaire">Être rappelé par un expert</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <img
          src={heroPortrait}
          alt="Lingots et pièces d’or sur un marbre sombre"
          width={1280}
          height={1280}
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] object-cover opacity-50 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              <Zap className="h-3.5 w-3.5" /> Accompagnement gratuit
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold md:text-6xl">
              Investir et acheter de <span className="text-gold">l’or</span> intelligemment
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Lingots, pièces, cours et fiscalité : nos experts vous accompagnent pour acheter de l&apos;or
              physique au cours officiel et protéger durablement votre patrimoine.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#formulaire">
                  Être rappelé par un expert <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="xl" asChild>
                <a href="#projet">Pourquoi l&apos;or ?</a>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-surface/70 p-4"
                >
                  <dt className="font-display text-xl font-bold text-primary">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] leading-tight text-muted-foreground uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:pt-6">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="border-t border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Avantages</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Pourquoi l&apos;or a sa place dans votre patrimoine
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Un actif tangible, universel et durable, pour diversifier votre épargne en dehors des
            marchés financiers.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section id="etapes" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Déroulement</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Trois étapes, aucune complexité</h2>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-border/70 p-6">
                <span className="font-display absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-lg font-bold text-primary-foreground shadow-gold">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bloc projet */}
      <section id="projet" className="border-y border-border/60 bg-surface/40 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Lingots ou pièces
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Choisir le bon format pour votre projet
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [
                  "Les lingots pour les montants importants",
                  "Une prime réduite et un or pur 999,9 ‰ certifié.",
                ],
                [
                  "Les pièces pour plus de souplesse",
                  "Napoléon, Krugerrand, Maple Leaf : faciles à revendre par petites quantités.",
                ],
                [
                  "Revendre au meilleur cours",
                  "Une estimation au cours du jour, toujours détaillée par écrit.",
                ],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={blockGrowth}
            alt="Pièces d’or d’investissement sur un velours sombre"
            width={1280}
            height={960}
            loading="lazy"
            className="animate-float rounded-3xl border border-border/70 shadow-panel"
          />
        </div>
      </section>

      {/* Bloc adoption */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <img
            src={blockGlobal}
            alt="Coffre-fort rempli de lingots d’or"
            width={1280}
            height={960}
            loading="lazy"
            className="order-2 rounded-3xl border border-border/70 shadow-panel lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Sécurité
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Acheter en toute sécurité
            </h2>
            <p className="mt-5 text-muted-foreground">
              Or certifié LBMA, prix transparents et conseils d&apos;experts : vous savez exactement ce
              que vous achetez, à quel prix, et comment le conserver ou le revendre.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["999,9 ‰", "or pur certifié"],
                ["LBMA", "cours officiel"],
                ["100 %", "gratuit, sans engagement"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-border/70 bg-card p-4">
                  <p className="font-display text-2xl font-bold text-primary">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="avis" className="border-y border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Témoignages</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Ils ont investi dans l’or</h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-border/70 bg-card p-6">
                <Quote className="h-6 w-6 text-primary/60" />
                <div className="mt-3 flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted-foreground">{item.meta}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-primary uppercase">
            FAQ
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold md:text-4xl">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-border/70">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-primary/30 bg-surface/70 p-10 text-center">
            <h2 className="text-3xl font-bold">Faites le premier pas vers l’or</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              L&apos;accompagnement est gratuit et sans engagement. Moins d&apos;une minute pour être
              rappelé par un expert des métaux précieux.
            </p>
            <Button variant="hero" size="xl" className="mt-8" asChild>
              <a href="#formulaire">
                Être rappelé par un expert <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Données chiffrées — aucune carte bancaire demandée
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-surface/60 py-12">
        <div className="mx-auto max-w-6xl space-y-6 px-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-display text-base font-bold text-foreground">
              Cap Refuge
            </span>
            <nav className="flex gap-6">
              <Link to="/mentions-legales" className="transition-colors hover:text-primary">
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
          <p className="max-w-3xl text-xs leading-relaxed">
            Les informations diffusées sur ce site sont fournies à titre indicatif et ne
            constituent pas un conseil en investissement. Les performances évoquées reposent sur des
            projections et ne préjugent pas des résultats futurs. Le cours de l&apos;or peut
            varier à la hausse comme à la baisse ; tout investissement comporte un risque de perte partielle ou totale du capital engagé.
          </p>
          <p className="text-xs">
            Données collectées : nom, prénom, email, téléphone, adresse IP — conservées 3 ans
            maximum, utilisées pour la vérification d&apos;éligibilité et la mise en relation avec
            un conseiller partenaire. Pour plus de détails et exercer vos droits d&apos;accès, de
            rectification et d&apos;opposition, consultez notre{" "}
            <Link
              to="/politique-confidentialite"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </footer>

      {/* Barre CTA mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a href="#formulaire">Être rappelé par un expert</a>
        </Button>
      </div>
    </div>
  );
}
