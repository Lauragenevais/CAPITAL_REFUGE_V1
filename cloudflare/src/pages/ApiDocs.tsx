import { useState } from "react";

import { useHead } from "@/hooks/useHead";
import { apiUrl } from "@/lib/api";

function Code({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl border border-border/60 bg-card/60">
      {label ? (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{label}</span>
          <button
            type="button"
            className="text-gold hover:underline"
            onClick={() => {
              void navigator.clipboard.writeText(children);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground/90">
        <code>{children}</code>
      </pre>
    </div>
  );
}

const FIELDS: { name: string; type: string; required: boolean; desc: string }[] = [
  { name: "first_name", type: "string", required: true, desc: "Prénom, 2 à 60 caractères." },
  { name: "last_name", type: "string", required: true, desc: "Nom, 2 à 60 caractères." },
  { name: "email", type: "string", required: true, desc: "Email valide, 120 caractères max." },
  {
    name: "phone",
    type: "string",
    required: true,
    desc: "Mobile français. Les espaces, points, tirets et le préfixe +33 sont normalisés automatiquement (ex. +33 6 12 34 56 78 → 0612345678).",
  },
  {
    name: "consent",
    type: "boolean",
    required: true,
    desc: "Doit valoir true : consentement explicite du prospect (RGPD).",
  },
  {
    name: "source",
    type: "string",
    required: false,
    desc: "Origine du trafic, 60 caractères max. Cette valeur doit être demandée à Com&Click.",
  },
  {
    name: "click_id",
    type: "string",
    required: false,
    desc: "Champ libre, 120 caractères max. Identifiant de clic ou de campagne au choix du partenaire.",
  },
  {
    name: "operation",
    type: "string",
    required: true,
    desc: "Type d'opération enregistrée : AMAZON, CHATGPT, NVIDIA, LIVRET ou ROBOT.",
  },
];


const CODES: { code: string; label: string; desc: string }[] = [
  { code: "201", label: "Créé", desc: "Le lead est enregistré, envoyé dans le Google Sheet et notifié par email." },
  { code: "400", label: "invalid_json", desc: "Le corps de la requête n'est pas du JSON valide." },
  { code: "401", label: "unauthorized", desc: "Clé d'API manquante ou incorrecte." },
  { code: "409", label: "duplicate", desc: "Un lead avec le même email ou téléphone existe déjà." },
  { code: "422", label: "validation_error", desc: "Un ou plusieurs champs sont invalides (détail dans details[])." },
  { code: "503", label: "api_not_configured", desc: "La clé d'API n'est pas configurée côté serveur." },
];

export default function ApiDocs() {
  useHead({
    title: "API Leads — Documentation | Amazon Capital",
    description:
      "Documentation de l'API d'enregistrement de leads : authentification par clé, format JSON, codes de réponse et exemples cURL.",
  });

  const endpoint = apiUrl("/api/public/leads");

  const curl = `curl -X POST "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: VOTRE_CLE_API" \\
  -d '{
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "phone": "0612345678",
    "consent": true,
    "source": "partenaire-x",
    "click_id": "abc123"
  }'`;

  const jsSnippet = `await fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.LEADS_API_KEY,
  },
  body: JSON.stringify({
    first_name: "Jean",
    last_name: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    consent: true,
    source: "partenaire-x",
  }),
});`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Documentation</p>
        <h1 className="mt-3 text-4xl font-semibold">API d'enregistrement de leads</h1>
        <p className="mt-4 text-muted-foreground">
          Cette API permet à un partenaire externe d'envoyer des leads directement dans la base
          Amazon Capital. Chaque lead accepté est enregistré en base, ajouté en haut de l'onglet
          Google Sheet et déclenche une notification email — exactement comme le formulaire du site.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Endpoint</h2>
          <Code label="HTTP">{`POST ${endpoint}
Content-Type: application/json
X-API-Key: VOTRE_CLE_API`}</Code>
          <p className="text-sm text-muted-foreground">
            CORS est activé (origine <code>*</code>) et la méthode <code>OPTIONS</code> est
            supportée : l'appel fonctionne aussi depuis un navigateur.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Authentification</h2>
          <p className="text-muted-foreground">
            Envoyez la clé d'API dans l'en-tête <code>X-API-Key</code>, ou en{" "}
            <code>Authorization: Bearer VOTRE_CLE_API</code>. La clé est stockée côté serveur sous
            le nom <code>LEADS_API_KEY</code>. Ne la distribuez jamais dans du code client public.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Corps de la requête</h2>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-card/60 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Champ</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Requis</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((f) => (
                  <tr key={f.name} className="border-t border-border/50 align-top">
                    <td className="px-4 py-3 font-mono text-gold">{f.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.type}</td>
                    <td className="px-4 py-3">{f.required ? "Oui" : "Non"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Exemples</h2>
          <Code label="cURL">{curl}</Code>
          <Code label="JavaScript (fetch)">{jsSnippet}</Code>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Réponses</h2>
          <Code label="201 Created">{`{ "ok": true, "message": "Lead enregistré" }`}</Code>
          <Code label="422 Unprocessable">{`{
  "ok": false,
  "error": "validation_error",
  "details": [{ "field": "phone", "message": "Numéro de mobile français invalide" }]
}`}</Code>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-card/60 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Erreur</th>
                  <th className="px-4 py-3">Signification</th>
                </tr>
              </thead>
              <tbody>
                {CODES.map((c) => (
                  <tr key={c.code} className="border-t border-border/50 align-top">
                    <td className="px-4 py-3 font-mono text-gold">{c.code}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{c.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-3">
          <h2 className="text-2xl font-semibold">Bonnes pratiques</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Ne renvoyez pas un lead déjà accepté : les doublons email/téléphone sont rejetés en 409.</li>
            <li>Recueillez un consentement réel avant d'envoyer <code>consent: true</code>.</li>
            <li>Renseignez <code>source</code> et <code>click_id</code> pour suivre vos performances.</li>
            <li>En cas de 5xx, réessayez avec un délai exponentiel (max 3 tentatives).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
