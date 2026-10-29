import heroImg from "@/assets/gold-hero.jpg";
import coinsImg from "@/assets/gold-coins.jpg";
import vaultImg from "@/assets/gold-vault.jpg";

const CONTACT = "mailto:l.genevais@comandclick.com?subject=Leads%20Capital%20Refuge%20(Or)";

const stats = [
  { n: "4", t: "contrôles avant livraison" },
  { n: "100%", t: "des mobiles vérifiés opérateur (HLR)" },
  { n: "100%", t: "des numéros validés par code SMS" },
  { n: "0", t: "doublon facturé" },
];

const steps = [
  { t: "Arrivée ciblée", d: "Le prospect arrive depuis votre campagne. Source et click ID sont capturés dès la première seconde." },
  { t: "Formulaire qualifiant", d: "Coordonnées puis montant qu'il envisage d'investir dans l'or : de 100 € à plus de 5 000 €." },
  { t: "Contrôle en direct", d: "Numéro vérifié auprès de l'opérateur, doublons bloqués, formats email et téléphone contrôlés." },
  { t: "Validation par SMS", d: "Le prospect reçoit un code à 6 chiffres et doit le saisir : son numéro est forcément le sien." },
  { t: "Livraison instantanée", d: "Le lead validé vous est transmis en temps réel (Google Sheet, API ou email), avec son statut." },
];

const checks = [
  { i: "📞", t: "Téléphone vérifié en direct", d: "Chaque portable est interrogé auprès du réseau mobile (Orange, SFR, Bouygues, Free). Un numéro inexistant est refusé." },
  { i: "🔐", t: "Code SMS obligatoire", d: "Aucun lead n'est livré tant que le prospect n'a pas saisi le code reçu sur son téléphone." },
  { i: "♻️", t: "Zéro doublon", d: "Un email ou un téléphone déjà reçu est refusé. Vous ne payez jamais deux fois le même contact." },
  { i: "💰", t: "Projet qualifié", d: "Chaque lead indique le montant qu'il envisage de placer dans l'or physique." },
  { i: "🔗", t: "Traçabilité source", d: "Chaque lead porte sa source, son click ID, son IP et sa date exacte." },
  { i: "⚡", t: "Temps réel", d: "Du clic sur « Envoyer » à votre outil : quelques secondes. Le prospect est rappelé pendant qu'il est disponible." },
];

const fields = [
  { t: "Identité", d: "Prénom, nom" },
  { t: "Contact vérifié", d: "Portable français (HLR + code SMS), email" },
  { t: "Projet", d: "Montant envisagé : 100 à 500 €, 500 à 2 000 €, 2 000 à 5 000 €, 5 000 € et plus" },
  { t: "Preuve & traçabilité", d: "Date et heure, adresse IP, texte de consentement accepté, source et click ID" },
];

const compliance = [
  { t: "Consentement explicite", d: "Case non pré-cochée, cochée volontairement par le prospect avant l'envoi." },
  { t: "Partenaires désignés", d: "Le texte indique clairement que les coordonnées sont transmises aux partenaires de Capital Refuge." },
  { t: "Objet précis", d: "Le prospect accepte un contact téléphonique pour des solutions d'investissement dans l'or physique." },
  { t: "Durée encadrée", d: "Consentement valable 12 mois, retirable à tout moment et gratuitement." },
  { t: "Preuve conservée", d: "Date, heure, IP et texte accepté sont enregistrés pour chaque lead." },
  { t: "Numéro authentifié", d: "Le code SMS prouve que la demande vient bien du titulaire de la ligne." },
];

export function PartenairesPage({ landingHref = "/" }: { landingHref?: string }) {
  return (
    <div className="theme-caprefuge min-h-screen bg-background font-sans text-foreground">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <p className="font-display text-lg font-bold">
          Capital <span className="text-primary">Refuge</span> · Partenaires
        </p>
        <div className="flex gap-2">
          <a href={landingHref} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
            Voir la landing page
          </a>
          <a href={CONTACT} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            Nous contacter
          </a>
        </div>
      </nav>

      <header className="on-navy bg-secondary text-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Leads investissement · Or physique</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Des leads or <span className="text-primary">vérifiés</span>, qualifiés et livrés en temps réel.
            </h1>
            <p className="mt-5 text-muted-foreground">
              Chaque contact a passé un contrôle opérateur, validé son numéro par SMS et indiqué le montant qu'il souhaite
              investir dans l'or. Vous ne recevez que des épargnants réels, joignables et uniques.
            </p>
            <a href={CONTACT} className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-gold">
              Recevoir nos leads
            </a>
          </div>
          <img src={heroImg} alt="Lingots et pièces d'or" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-panel" />
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 pb-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.t} className="rounded-2xl border border-foreground/15 p-5">
              <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.t}</p>
            </div>
          ))}
        </div>
      </header>

      <Section kicker="Parcours prospect" title="De la campagne à votre outil, en 5 étapes">
        <ol className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-2xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-semibold">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="Qualité" title="Les contrôles appliqués à chaque lead" tone="surface">
        <div className="grid gap-4 md:grid-cols-3">
          {checks.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-2xl">{c.i}</p>
              <p className="mt-3 font-semibold">{c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Données collectées" title="Ce que contient chaque lead">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {fields.map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold">{f.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
            <p className="rounded-2xl bg-primary/15 p-5 text-sm">
              <strong>Sur-mesure :</strong> les questions, les règles de qualification et le format de livraison peuvent
              être adaptés à votre demande (horizon de placement, type de produit, zone géographique…).
            </p>
          </div>
          <img src={coinsImg} alt="Pièces d'or" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-panel" />
        </div>
      </Section>

      <Section kicker="Conformité" title="Démarchage téléphonique : un consentement conforme et prouvé" tone="surface">
        <div className="grid gap-4 md:grid-cols-3">
          {compliance.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold">✓ {c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Le parcours est conçu pour le régime du consentement préalable au démarchage téléphonique applicable à partir du
          11 août 2026 : accord exprès, partenaires identifiés, durée limitée et preuve disponible sur demande.
        </p>
      </Section>

      <Section kicker="Notre landing page" title="Une page de collecte prête à recevoir vos campagnes">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src={vaultImg} alt="Coffre-fort contenant de l'or" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-panel" />
          <div>
            <p className="text-muted-foreground">
              Une page sobre aux couleurs bleu nuit et or, centrée sur la mise à l'abri de l'épargne, avec un formulaire en
              deux étapes, un rappel gratuit sous 24 à 48h et la validation du numéro par SMS.
            </p>
            <a href={landingHref} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground">
              capital-refuge.com →
            </a>
          </div>
        </div>
      </Section>

      <section className="on-navy bg-secondary py-16 text-center text-foreground">
        <h2 className="font-display text-3xl font-bold">Prêt à recevoir des leads or qualifiés ?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={CONTACT} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Parler à notre équipe</a>
          <a href={landingHref} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/30 px-6 py-3 font-semibold">Voir la landing page</a>
        </div>
      </section>
    </div>
  );
}

function Section({ kicker, title, tone, children }: { kicker: string; title: string; tone?: "surface"; children: React.ReactNode }) {
  return (
    <section className={tone === "surface" ? "bg-surface" : ""}>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-bold">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
