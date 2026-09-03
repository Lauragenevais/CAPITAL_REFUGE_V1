import { createFileRoute, Link } from "@tanstack/react-router";
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
import heroPortrait from "@/assets/hero-portrait.jpg";
import blockGrowth from "@/assets/block-growth.jpg";
import blockGlobal from "@/assets/block-global.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amazon Coin : vérifiez votre éligibilité avant le lancement" },
      {
        name: "description",
        content:
          "L'Amazon Coin arrive. Vérifiez votre éligibilité en 60 secondes et positionnez-vous avant le grand public avec l'accompagnement d'un conseiller crypto.",
      },
      { property: "og:title", content: "Amazon Coin : prenez position avant le lancement" },
      {
        property: "og:description",
        content:
          "Analyse gratuite en 60 secondes : découvrez si votre profil est éligible au programme de pré-inscription Amazon Coin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "Le projet", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "+312 %", label: "Progression modélisée" },
  { value: "300 M+", label: "Clients Amazon actifs" },
  { value: "24/7", label: "Marché toujours ouvert" },
  { value: "60 s", label: "Pour se pré-inscrire" },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Un potentiel rarement vu",
    text: "L'Amazon Coin s'appuierait sur un écosystème déjà rentable et sur des centaines de millions d'acheteurs réguliers.",
  },
  {
    icon: Globe2,
    title: "Une adoption immédiate",
    text: "Des millions de marchands connectés au réseau Amazon pourraient accepter la monnaie dès son ouverture.",
  },
  {
    icon: BrainCircuit,
    title: "Pilotage assisté par IA",
    text: "Des algorithmes analysent la volatilité en continu pour ajuster votre exposition selon votre profil.",
  },
  {
    icon: ShieldCheck,
    title: "Infrastructure de niveau bancaire",
    text: "Une architecture cloud éprouvée, celle qui héberge déjà les données les plus sensibles au monde.",
  },
];

const STEPS = [
  {
    title: "Complétez le formulaire",
    text: "Quatre informations suffisent. Nous vérifions immédiatement si votre profil entre dans le programme.",
  },
  {
    title: "Échangez avec un spécialiste",
    text: "Un conseiller crypto vous rappelle sous 24h pour construire une stratégie adaptée à vos objectifs.",
  },
  {
    title: "Prenez position",
    text: "Vous placez le montant que vous décidez et suivez l'évolution de votre portefeuille en temps réel.",
  },
];

const TESTIMONIALS = [
  {
    name: "Damien",
    meta: "45 ans — Nantes",
    text: "J'hésitais depuis longtemps à toucher à la crypto. Le rappel du conseiller m'a permis de comprendre où je mettais les pieds avant de démarrer.",
  },
  {
    name: "Sophie",
    meta: "37 ans — Toulouse",
    text: "Inscription réellement rapide et suivi sérieux. J'ai commencé avec un petit montant, je suis montée progressivement.",
  },
  {
    name: "Marc",
    meta: "58 ans — Rennes",
    text: "Ce que j'ai apprécié : pas de promesse magique, juste des explications claires sur le risque et le potentiel.",
  },
];

const FAQ = [
  {
    q: "L'Amazon Coin est-il déjà disponible ?",
    a: "Le programme de pré-inscription permet d'être informé en priorité et d'être accompagné dès l'ouverture. Aucun engagement n'est demandé au moment de la demande.",
  },
  {
    q: "Quel montant faut-il prévoir ?",
    a: "Il n'y a pas de montant imposé. Votre conseiller définit avec vous une enveloppe cohérente avec votre situation, en gardant à l'esprit que tout investissement comporte un risque de perte en capital.",
  },
  {
    q: "Combien de temps prend la vérification ?",
    a: "Le formulaire se remplit en moins d'une minute et la prise de contact intervient sous 24 heures ouvrées.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos informations sont transmises de manière chiffrée et utilisées uniquement pour la vérification d'éligibilité et la mise en relation avec un conseiller partenaire.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Bandeau haut */}
      <div className="bg-surface/80 px-4 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
        <Coins className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
        Amazon Capital — la monnaie qui pourrait redessiner le commerce mondial
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Amazon Capital</span>
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
          src={heroPortrait}
          alt="Conseillère financière dans un bureau donnant sur la ville la nuit"
          width={1280}
          height={1280}
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] object-cover opacity-50 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              <Zap className="h-3.5 w-3.5" /> Ouverture des inscriptions
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold md:text-6xl">
              Amazon prépare sa propre <span className="text-gold">cryptomonnaie</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Adossée au premier réseau e-commerce du monde, l&apos;Amazon Coin pourrait s&apos;imposer
              comme un moyen de paiement universel. Prenez votre place avant que le grand public ne
              découvre le projet.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#formulaire">
                  Tester mon éligibilité <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outlineGold" size="xl" asChild>
                <a href="#projet">Comprendre le projet</a>
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
            Pourquoi l&apos;Amazon Coin attire autant d&apos;attention
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            La force logistique et technologique d&apos;un géant appliquée à un actif numérique :
            une combinaison inédite sur le marché crypto.
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
              Événement majeur
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Une monnaie pensée pour des centaines de millions d&apos;acheteurs
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [
                  "Un socle économique déjà en place",
                  "Contrairement à la plupart des cryptos, l'actif s'appuierait sur un chiffre d'affaires réel.",
                ],
                [
                  "300 millions d'utilisateurs potentiels",
                  "Chaque client du réseau devient un détenteur possible dès l'ouverture.",
                ],
                [
                  "Un usage quotidien, pas seulement spéculatif",
                  "Paiement, remboursement, fidélité : les cas d'usage existent avant même le lancement.",
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
            alt="Représentation d'une pièce numérique dorée au-dessus d'un graphique haussier"
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
            alt="Globe numérique doré relié par un réseau de connexions et de pièces crypto"
            width={1280}
            height={960}
            loading="lazy"
            className="order-2 rounded-3xl border border-border/70 shadow-panel lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Adoption mondiale
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Viser le standard du paiement numérique
            </h2>
            <p className="mt-5 text-muted-foreground">
              Là où les cryptomonnaies historiques ont dû construire leur communauté, l&apos;Amazon
              Coin partirait avec une base d&apos;utilisateurs déjà constituée et un réseau marchand
              opérationnel sur cinq continents.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["200 M+", "membres Prime"],
                ["5", "continents couverts"],
                ["AAA", "niveau de sécurité"],
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
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Ils se sont déjà positionnés</h2>

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
            <span className="font-display text-base font-bold text-foreground">
              Amazon Capital
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
            projections et ne préjugent pas des résultats futurs. Tout investissement en
            cryptomonnaies comporte un risque de perte partielle ou totale du capital engagé.
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
          <a href="#formulaire">Vérifier mon éligibilité</a>
        </Button>
      </div>
    </div>
  );
}
