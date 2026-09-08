import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Cpu,
  Factory,
  LineChart,
  Lock,
  PieChart,
  Quote,
  Rocket,
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
import heroNvidia from "@/assets/hero-nvidia.jpg";
import blockGpu from "@/assets/block-gpu.jpg";

export const Route = createFileRoute("/nvidia")({
  head: () => ({
    meta: [
      { title: "Action Nvidia (NVDA) : éligibilité en 60 s | Nvidia Capital" },
      {
        name: "description",
        content:
          "Nvidia, la nouvelle star des cryptos et de l'IA : +85 % de chiffre d'affaires et un data center record. Vérifiez gratuitement votre éligibilité à l'action NVDA en 60 secondes.",
      },
      {
        property: "og:title",
        content: "Action Nvidia (NVDA) : la nouvelle star des cryptos et de l'IA",
      },
      {
        property: "og:description",
        content:
          "+85 % de chiffre d'affaires, 75,2 Md$ de revenus data center : testez votre éligibilité à l'action Nvidia en 60 secondes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nvidia Capital" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "https://amazoncapital.lovable.app/nvidia" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Action Nvidia (NVDA) : la nouvelle star des cryptos" },
      {
        name: "twitter:description",
        content: "Testez votre éligibilité à l'action Nvidia en 60 secondes avec Nvidia Capital.",
      },
    ],
    links: [{ rel: "canonical", href: "https://amazoncapital.lovable.app/nvidia" }],
  }),
  component: NvidiaLanding,
});

const NAV = [
  { label: "L'entreprise", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "+85 %", label: "Chiffre d'affaires sur un an" },
  { value: "75,2 Md$", label: "Revenus data center T1" },
  { value: "74,9 %", label: "Marge brute" },
  { value: "60 s", label: "Pour vérifier son profil" },
];

const BENEFITS = [
  {
    icon: Cpu,
    title: "Le moteur de l'IA mondiale",
    text: "Nvidia domine le marché des puces qui entraînent les modèles d'intelligence artificielle les plus avancés.",
  },
  {
    icon: Factory,
    title: "Une machine industrielle rentable",
    text: "Une marge brute de 74,9 % au dernier trimestre publié, un niveau rare pour un industriel des semi-conducteurs.",
  },
  {
    icon: PieChart,
    title: "Retour aux actionnaires",
    text: "Dividende trimestriel relevé à 0,25 $ par action et enveloppe de rachat d'actions de 80 milliards de dollars approuvée.",
  },
  {
    icon: Rocket,
    title: "Au cœur de l'économie crypto",
    text: "Les GPU Nvidia irriguent aussi les infrastructures de calcul utilisées par l'écosystème crypto et le Web3.",
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
    name: "Sébastien",
    meta: "38 ans — Nantes",
    text: "Je suivais Nvidia depuis le début de la vague IA sans savoir par où commencer. L'échange avec le conseiller m'a permis de clarifier ma stratégie.",
  },
  {
    name: "Nadia",
    meta: "45 ans — Toulouse",
    text: "Formulaire rempli le matin, rappel l'après-midi. On m'a expliqué la volatilité du titre avant même de parler de montant.",
  },
  {
    name: "Patrick",
    meta: "57 ans — Strasbourg",
    text: "Ce que j'ai apprécié : les chiffres réels de l'entreprise, pas de promesse de gains garantis.",
  },
];

const FAQ = [
  {
    q: "Pourquoi parle-t-on de Nvidia comme d'une star des cryptos ?",
    a: "Les cartes graphiques de Nvidia ont longtemps servi au minage et alimentent aujourd'hui l'essentiel des infrastructures de calcul de l'IA et du Web3. L'entreprise est devenue une valeur suivie de près par les investisseurs crypto comme par les investisseurs actions.",
  },
  {
    q: "Quels sont les derniers chiffres publiés ?",
    a: "Sur son premier trimestre fiscal 2027 (clos le 26 avril 2026), Nvidia a annoncé 81,6 milliards de dollars de chiffre d'affaires, en hausse de 85 % sur un an, dont 75,2 milliards pour le seul segment data center, avec une marge brute de 74,9 %.",
  },
  {
    q: "Quel montant faut-il prévoir ?",
    a: "Il n'y a pas de montant imposé. Votre conseiller définit avec vous une enveloppe cohérente avec votre situation, en gardant à l'esprit que tout investissement comporte un risque de perte en capital.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos informations sont transmises de manière chiffrée et utilisées uniquement pour la vérification d'éligibilité et la mise en relation avec un conseiller partenaire.",
  },
];

function NvidiaLanding() {
  return (
    <div className="theme-nvidia min-h-screen bg-background">
      {/* Bandeau haut */}
      <div className="bg-surface/80 px-4 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
        <Cpu className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
        Nvidia Capital — Nvidia, la nouvelle star des cryptos et de l&apos;intelligence artificielle
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Nvidia Capital</span>
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
          src={heroNvidia}
          alt="Salle de serveurs éclairée en vert avec une carte graphique haute performance"
          width={1280}
          height={1280}
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] object-cover opacity-50 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              <Zap className="h-3.5 w-3.5" /> Action NVDA
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold md:text-6xl">
              <span className="text-gold">Nvidia</span>, la nouvelle star des cryptos
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Devenue l&apos;entreprise centrale de la révolution de l&apos;intelligence
              artificielle, Nvidia a publié un chiffre d&apos;affaires trimestriel de 81,6 milliards
              de dollars, en hausse de 85&nbsp;% sur un an. Vérifiez si votre profil est éligible à
              notre programme d&apos;accompagnement sur l&apos;action NVDA.
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
              operation="NVIDIA"
              consentLabel="J'accepte les conditions générales d'utilisation et d'être recontacté par nos partenaires afin de recevoir des informations sur l'action Nvidia."
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="border-t border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Avantages</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Pourquoi l&apos;action Nvidia attire autant
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Fondée en 1993 et longtemps connue pour ses cartes graphiques GeForce, Nvidia tire
            désormais l&apos;essentiel de ses revenus de l&apos;infrastructure des datacenters
            dédiés à l&apos;IA.
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
              Du jeu vidéo à l&apos;infrastructure de l&apos;IA
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [
                  "CUDA, le pari qui a tout changé",
                  "Lancée en 2006, cette plateforme logicielle a permis d'utiliser la puissance de calcul parallèle des GPU bien au-delà du graphisme.",
                ],
                [
                  "Un segment data center qui explose",
                  "75,2 milliards de dollars sur le dernier trimestre publié, soit une hausse de 92 % sur un an.",
                ],
                [
                  "Une rentabilité hors norme",
                  "Marge brute de 74,9 % et bénéfice par action en progression de 131 % sur un an.",
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
            src={blockGpu}
            alt="Puce graphique lumineuse au-dessus d'un graphique boursier haussier"
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
              L&apos;action NVDA
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Une valorisation parmi les plus élevées au monde
            </h2>
            <p className="mt-5 text-muted-foreground">
              La question n&apos;est plus de savoir si Nvidia est incontournable, mais si son action
              mérite encore d&apos;être achetée à son niveau actuel. C&apos;est exactement ce
              qu&apos;un conseiller peut analyser avec vous, en tenant compte de votre horizon de
              placement et de votre tolérance au risque.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["81,6 Md$", "chiffre d'affaires T1"],
                ["+92 %", "revenus data center"],
                ["80 Md$", "rachat d'actions approuvé"],
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
              Une valorisation élevée implique aussi une forte sensibilité aux déceptions : ralenti-
              ssement des commandes, concurrence sur les puces IA ou contraintes réglementaires sur
              certains marchés. Un investissement en actions comporte toujours un risque de perte en
              capital.
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
            <span className="font-display text-base font-bold text-foreground">Nvidia Capital</span>
            <nav className="flex gap-6">
              <Link to="/mentions-legales-nvidia" className="transition-colors hover:text-primary">
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite-nvidia"
                className="transition-colors hover:text-primary"
              >
                Politique de confidentialité
              </Link>
            </nav>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed">
            <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5" />
            Les informations diffusées sur ce site sont fournies à titre indicatif et ne constituent
            pas un conseil en investissement. Les chiffres cités proviennent des publications
            financières de Nvidia et ne préjugent pas des résultats futurs. Tout investissement en
            bourse comporte un risque de perte partielle ou totale du capital engagé. Nvidia et NVDA
            sont des marques de leurs propriétaires respectifs, citées à titre informatif.
          </p>
          <p className="text-xs">
            Données collectées : nom, prénom, email, téléphone, adresse IP — conservées 3 ans
            maximum, utilisées pour la vérification d&apos;éligibilité et la mise en relation avec
            un conseiller partenaire. Pour plus de détails et exercer vos droits d&apos;accès, de
            rectification et d&apos;opposition, consultez notre{" "}
            <Link
              to="/politique-confidentialite-nvidia"
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
