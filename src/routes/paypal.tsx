import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CreditCard,
  Globe2,
  LineChart,
  Lock,
  PieChart,
  Quote,
  WalletCards,
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
import heroPaypal from "@/assets/hero-paypal.jpg";
import blockPaypal from "@/assets/block-paypal.jpg";

export const Route = createFileRoute("/paypal")({
  head: () => ({
    meta: [
      { title: "Action PayPal (PYPL) : testez votre éligibilité en 60 s" },
      {
        name: "description",
        content:
          "PayPal, pionnier mondial du paiement numérique : découvrez l'action PYPL, ses perspectives et ses risques, puis vérifiez gratuitement votre éligibilité en 60 secondes.",
      },
      {
        property: "og:title",
        content: "Action PayPal (PYPL) : le paiement numérique en portefeuille",
      },
      {
        property: "og:description",
        content:
          "Paiement en ligne, portefeuille mobile et actifs numériques : découvrez PayPal et testez votre éligibilité en 60 secondes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "PayPal Capital" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "https://amazoncapital.lovable.app/paypal" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Action PayPal (PYPL) : la nouvelle star des cryptos" },
      {
        name: "twitter:description",
        content: "Testez votre éligibilité à l'action PayPal en 60 secondes avec PayPal Capital.",
      },
    ],
    links: [{ rel: "canonical", href: "https://amazoncapital.lovable.app/paypal" }],
  }),
  component: PaypalLanding,
});

const NAV = [
  { label: "L'entreprise", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "1998", label: "Année de création" },
  { value: "200+", label: "Marchés desservis" },
  { value: "PYPL", label: "Action cotée au Nasdaq" },
  { value: "60 s", label: "Pour vérifier son profil" },
];

const BENEFITS = [
  {
    icon: CreditCard,
    title: "Un pionnier du paiement en ligne",
    text: "PayPal connecte depuis plus de vingt-cinq ans consommateurs, commerçants et plateformes dans le monde entier.",
  },
  {
    icon: Globe2,
    title: "Une présence internationale",
    text: "Le groupe accompagne les paiements numériques sur plus de 200 marchés et bénéficie d'une marque largement reconnue.",
  },
  {
    icon: PieChart,
    title: "Un écosystème diversifié",
    text: "PayPal, Venmo, Braintree et ses services marchands couvrent plusieurs usages du commerce numérique.",
  },
  {
    icon: WalletCards,
    title: "Des relais d'innovation",
    text: "Portefeuille mobile, paiements sans contact et actifs numériques ouvrent de nouvelles pistes de développement, sans garantie de résultat.",
  },
];

const STEPS = [
  {
    title: "Complétez le formulaire",
    text: "Quatre informations suffisent. Nous vérifions immédiatement si votre profil entre dans le programme.",
  },
  {
    title: "Échangez avec un spécialiste",
    text: "Un conseiller vous rappelle sous 24h pour construire une stratégie adaptée à vos objectifs.",
  },
  {
    title: "Prenez position",
    text: "Vous placez le montant que vous décidez et suivez l'évolution de votre portefeuille en temps réel.",
  },
];

const TESTIMONIALS = [
  {
    name: "Claire",
    meta: "42 ans — Rennes",
    text: "Je connaissais PayPal comme utilisatrice, mais pas comme actionnaire potentiel. L'échange m'a aidée à distinguer la marque de la réalité financière.",
  },
  {
    name: "Mehdi",
    meta: "36 ans — Montpellier",
    text: "Le conseiller a présenté les opportunités mais aussi la concurrence et la volatilité du titre. J'ai pu réfléchir avec des éléments concrets.",
  },
  {
    name: "François",
    meta: "55 ans — Dijon",
    text: "La démarche a été rapide et sans pression. J'ai apprécié qu'aucun rendement ne soit présenté comme garanti.",
  },
];

const FAQ = [
  {
    q: "PayPal est-elle déjà cotée en bourse ?",
    a: "Oui. L'action PayPal Holdings est cotée au Nasdaq sous le symbole PYPL. Son cours peut évoluer à la hausse comme à la baisse.",
  },
  {
    q: "PayPal propose-t-elle une cryptomonnaie ?",
    a: "PayPal développe des services liés aux actifs numériques, notamment le stablecoin PYUSD. Cela ne transforme pas l'action PYPL en cryptomonnaie : il s'agit de deux produits distincts.",
  },
  {
    q: "Un rendement de 12 % est-il garanti ?",
    a: "Non. Toute estimation ou simulation évoquée dans une communication commerciale reste hypothétique. Aucun rendement n'est garanti et un investissement en actions peut entraîner une perte partielle ou totale du capital.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos informations sont transmises de manière chiffrée et utilisées uniquement pour la vérification d'éligibilité et la mise en relation avec un conseiller partenaire.",
  },
];

function PaypalLanding() {
  return (
    <div className="theme-paypal min-h-screen bg-background">
      {/* Bandeau haut */}
      <div className="bg-surface/80 px-4 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
        <Cpu className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
        PayPal Capital — le paiement numérique au cœur du commerce mondial
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">PayPal Capital</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>
          <Button variant="hero" size="lg" asChild>
            <a href="#formulaire">Vérifier mon éligibilité</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <img
          src={heroPaypal}
          alt="Investisseur utilisant un paiement numérique sécurisé devant un graphique de marché"
          width={1280}
          height={1280}
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] object-cover opacity-50 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              <Zap className="h-3.5 w-3.5" /> Action PayPal — PYPL
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold md:text-6xl">
              <span className="text-gold">PayPal</span>, le pionnier du paiement numérique
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Présente dans le commerce en ligne depuis 1998, PayPal fait évoluer son modèle entre portefeuille numérique, services aux marchands et actifs digitaux. Vérifiez si votre profil est éligible à notre programme d&apos;accompagnement sur l&apos;action PYPL.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#formulaire">
                  Tester mon éligibilité <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="xl" asChild>
                <a href="#projet">Comprendre l&apos;entreprise</a>
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
            <LeadForm
              operation="PAYPAL"
              consentLabel="J'accepte les conditions générales d'utilisation et d'être recontacté par nos partenaires afin de recevoir des informations sur l'action PayPal."
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="border-t border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Avantages</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Pourquoi PayPal reste une valeur suivie
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            PayPal bénéficie d&apos;une notoriété mondiale et d&apos;un vaste réseau, tout en affrontant une concurrence intense dans les paiements et les portefeuilles numériques.
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

      {/* Bloc entreprise */}
      <section id="projet" className="border-y border-border/60 bg-surface/40 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              L&apos;entreprise
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Du bouton de paiement à un écosystème mondial
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [
                  "Une marque familière",
                  "PayPal s'est imposée comme l'un des repères historiques du paiement en ligne auprès du grand public et des commerçants.",
                ],
                [
                  "Un réseau à grande échelle",
                  "L'entreprise opère sur plus de 200 marchés et relie consommateurs, plateformes et professionnels.",
                ],
                [
                  "Un secteur en transformation",
                  "Paiement mobile, concurrence des banques et actifs numériques obligent le groupe à innover en permanence.",
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
            src={blockPaypal}
            alt="Paiement mobile sans contact connecté au commerce mondial"
            width={1280}
            height={960}
            loading="lazy"
            className="animate-float rounded-3xl border border-border/70 shadow-panel"
          />
        </div>
      </section>

      {/* Bloc marché */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              L&apos;action PYPL
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Une action connue, mais exposée à une forte concurrence
            </h2>
            <p className="mt-5 text-muted-foreground">
              La force de la marque ne suffit pas à garantir la performance de l&apos;action. Un conseiller peut vous aider à examiner la valorisation, les perspectives du secteur et votre tolérance au risque avant toute décision.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["1998", "création de PayPal"],
                ["200+", "marchés desservis"],
                ["PYPL", "symbole au Nasdaq"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-border/70 bg-card p-4">
                  <p className="font-display text-2xl font-bold text-primary">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-2 rounded-3xl border border-primary/30 bg-surface/70 p-8 lg:order-1">
            <LineChart className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold">À garder en tête</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              PayPal évolue face aux cartes bancaires, aux portefeuilles mobiles, aux fintechs et aux contraintes réglementaires. Les projections de rendement ne sont jamais garanties : l&apos;action peut baisser et entraîner une perte en capital.
            </p>
            <Button variant="hero" size="lg" className="mt-6" asChild>
              <a href="#formulaire">
                En parler à un conseiller <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="avis" className="border-y border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Témoignages</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Ils ont clarifié leur projet</h2>

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
            <h2 className="text-3xl font-bold">Places limitées pour cette phase</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              La vérification est gratuite et sans engagement. Il vous faut moins d&apos;une minute
              pour savoir si votre profil est retenu.
            </p>
            <Button variant="hero" size="xl" className="mt-8" asChild>
              <a href="#formulaire">
                Vérifier mon éligibilité <ArrowRight className="h-5 w-5" />
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
            <span className="font-display text-base font-bold text-foreground">PayPal Capital</span>
            <nav className="flex gap-6">
              <Link to="/mentions-legales-paypal" className="transition-colors hover:text-primary">
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite-paypal"
                className="transition-colors hover:text-primary"
              >
                Politique de confidentialité
              </Link>
            </nav>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed">
            <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5" />
            Les informations diffusées sur ce site sont fournies à titre indicatif et ne constituent
            pas un conseil en investissement. Les éléments présentés ne constituent ni une promesse de rendement ni un conseil personnalisé. Tout investissement en bourse comporte un risque de perte partielle ou totale du capital engagé. PayPal, Venmo, PYUSD et PYPL sont cités à titre informatif ; ce site n&apos;est ni affilié à PayPal Holdings, Inc., ni approuvé par elle.
          </p>
          <p className="text-xs">
            Données collectées : nom, prénom, email, téléphone, adresse IP — conservées 3 ans
            maximum, utilisées pour la vérification d&apos;éligibilité et la mise en relation avec
            un conseiller partenaire. Pour plus de détails et exercer vos droits d&apos;accès, de
            rectification et d&apos;opposition, consultez notre{" "}
            <Link
              to="/politique-confidentialite-paypal"
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
          <a href="#formulaire">Vérifier mon éligibilité</a>
        </Button>
      </div>
    </div>
  );
}
