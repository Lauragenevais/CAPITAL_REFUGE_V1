import { Link } from "react-router-dom";

import { useHead } from "@/hooks/useHead";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Cpu,
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
import heroChatgpt from "@/assets/hero-chatgpt.jpg";
import blockAi from "@/assets/block-ai.jpg";


const NAV = [
  { label: "Le projet", href: "#projet" },
  { label: "Avantages", href: "#avantages" },
  { label: "Déroulement", href: "#etapes" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "+150 %", label: "Hausse prévue à l'entrée" },
  { value: "800 M+", label: "Utilisateurs hebdomadaires" },
  { value: "n°1", label: "De l'IA grand public" },
  { value: "60 s", label: "Pour se pré-inscrire" },
];

const BENEFITS = [
  {
    icon: PieChart,
    title: "Diversification stratégique",
    text: "Ajoutez une dimension futuriste et prometteuse à votre portefeuille d'investissements.",
  },
  {
    icon: ShieldCheck,
    title: "Engagement transparent",
    text: "OpenAI s'engage pour une approche responsable et transparente en IA, alignée sur les valeurs de ses investisseurs.",
  },
  {
    icon: BrainCircuit,
    title: "Innovation révolutionnaire",
    text: "ChatGPT est à l'avant-garde de l'IA, avec des solutions qui façonnent déjà l'avenir technologique.",
  },
  {
    icon: Rocket,
    title: "Croissance explosive potentielle",
    text: "L'entrée en bourse de ChatGPT est attendue comme un succès retentissant, avec un potentiel de croissance significatif.",
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
    name: "Karim",
    meta: "41 ans — Lyon",
    text: "Je cherchais une porte d'entrée vers l'IA sans tout comprendre à la tech. Le conseiller m'a expliqué le fonctionnement pas à pas avant que je me décide.",
  },
  {
    name: "Élodie",
    meta: "34 ans — Bordeaux",
    text: "Inscription très rapide, rappel dans la journée. J'ai pu poser toutes mes questions sur les risques avant d'engager le moindre euro.",
  },
  {
    name: "Bernard",
    meta: "61 ans — Lille",
    text: "À mon âge on se méfie des nouveautés. J'ai apprécié la transparence : pas de promesse miracle, des explications claires sur le potentiel et le risque.",
  },
];

const FAQ = [
  {
    q: "L'action ChatGPT est-elle déjà cotée ?",
    a: "OpenAI n'est pas encore cotée en bourse. Le programme de pré-inscription permet d'être informé en priorité et d'être accompagné dès l'ouverture. Aucun engagement n'est demandé au moment de la demande.",
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

export default function ChatgptLanding() {
  useHead({
    title: "Action ChatGPT : vérifiez votre éligibilité avant l'entrée en bourse",
    description:
      "L'action ChatGPT d'OpenAI promet de révolutionner le marché boursier. Vérifiez votre éligibilité en 60 secondes et préparez-vous avant le grand public.",
  });

  return (
    <div className="theme-chatgpt min-h-screen bg-background">
      {/* Bandeau haut */}
      <div className="bg-surface/80 px-4 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground">
        <Cpu className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
        ChatGPT Capital — l'IA qui façonne l'avenir, votre chance d'être partie prenante
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold shadow-gold">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">ChatGPT Capital</span>
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
          src={heroChatgpt}
          alt="Conseillère financière analysant une interface d'intelligence artificielle dans un bureau de nuit"
          width={1280}
          height={1280}
          className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] object-cover opacity-50 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              <Zap className="h-3.5 w-3.5" /> Entrée en bourse imminente
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold md:text-6xl">
              L&apos;action <span className="text-gold">ChatGPT</span> s&apos;apprête à entrer en
              bourse
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              L&apos;introduction de l&apos;action ChatGPT d&apos;OpenAI promet de révolutionner le
              marché boursier, avec une prévision de croissance de plus de 150&nbsp;% dès son
              entrée. Prenez votre place avant que le grand public ne découvre le projet.
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
            <LeadForm
              operation="CHATGPT"
              consentLabel="J'accepte les conditions générales d'utilisation et d'être recontacté par nos partenaires afin de recevoir des informations sur l'action ChatGPT."
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="border-t border-border/60 bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Avantages</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Pourquoi avoir l&apos;action ChatGPT dans son portefeuille
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Investir dans ChatGPT, c'est s'exposer au marché en pleine expansion de
            l'intelligence artificielle et se positionner à l'avant-garde de l'innovation.
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
              ChatGPT en bourse : un lancement qui promet de faire des étincelles
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [
                  "Une croissance prévue de +150 % dès l'entrée",
                  "Les analystes du programme anticipent une introduction spectaculaire sur le marché.",
                ],
                [
                  "Des centaines de millions d'utilisateurs déjà acquis",
                  "ChatGPT est devenu en un temps record l'application grand public la plus adoptée de l'histoire.",
                ],
                [
                  "Un secteur promis à une croissance exponentielle",
                  "L'intelligence artificielle s'impose dans la santé, la finance, l'industrie et le commerce.",
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
            src={blockAi}
            alt="Sphère d'intelligence artificielle lumineuse au-dessus d'un graphique boursier haussier"
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
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Participation à un succès
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Ne manquez pas cette opportunité
            </h2>
            <p className="mt-5 text-muted-foreground">
              Ne manquez pas cette occasion unique de faire partie de l&apos;histoire de l&apos;IA.
              En vous positionnant sur l&apos;action ChatGPT, vous devenez partie intégrante
              d&apos;une histoire de succès en devenir, aux côtés d&apos;une entreprise à la pointe
              de l&apos;intelligence artificielle.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["800 M+", "utilisateurs hebdo"],
                ["+150 %", "croissance prévue"],
                ["n°1", "de l'IA mondiale"],
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
            <h3 className="mt-4 text-xl font-bold">Un moment historique</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ce moment marque le début d&apos;une nouvelle ère, où la technologie et
              l&apos;innovation s&apos;entrecroisent pour créer des perspectives de croissance sans
              précédent. Joignez-vous à une aventure financière hors du commun, avec une entreprise
              à la pointe de l&apos;IA.
            </p>
            <Button variant="hero" size="lg" className="mt-6" asChild>
              <a href="#formulaire">
                Renseignez-vous <ArrowRight className="h-5 w-5" />
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
            <span className="font-display text-base font-bold text-foreground">
              ChatGPT Capital
            </span>
            <nav className="flex gap-6">
              <Link to="/mentions-legales-chatgpt" className="transition-colors hover:text-primary">
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite-chatgpt"
                className="transition-colors hover:text-primary"
              >
                Politique de confidentialité
              </Link>
            </nav>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed">
            Les informations diffusées sur ce site sont fournies à titre indicatif et ne
            constituent pas un conseil en investissement. Les performances évoquées reposent sur
            des projections et ne préjugent pas des résultats futurs. Tout investissement en
            bourse comporte un risque de perte partielle ou totale du capital engagé.
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
