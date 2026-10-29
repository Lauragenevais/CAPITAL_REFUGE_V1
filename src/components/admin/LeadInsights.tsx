import { useMemo } from "react";
import { Copy, Phone, X } from "lucide-react";
import { toast } from "sonner";
import { clarityReplayUrl } from "@/lib/clarity";

export type InsightLead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  click_id: string;
  clarity_id?: string;
  pays: string;
  ip_address: string;
  operation: string;
  status: string;
  notes: string;
  created_at: string;
  phone_verified: boolean;
  sms_sent_count: number;
  sms_delivery_status: string;
  hlr_status: string;
  hlr_network: string;
  invest_amount?: string;
  refused?: boolean;
};

export function relativeTime(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}

export function isHot(iso: string) {
  return Date.now() - new Date(iso).getTime() < 15 * 60000;
}

export function copyText(value: string, label: string) {
  if (!value) return;
  void navigator.clipboard.writeText(value).then(() => toast.success(`${label} copié`));
}

function normalizeNetwork(n: string) {
  const s = n.toLowerCase();
  if (s.includes("orange")) return "Orange";
  if (s.includes("sfr")) return "SFR";
  if (s.includes("bouygues")) return "Bouygues";
  if (s.includes("free")) return "Free";
  return n.replace(/^MNO\s*-\s*/i, "") || "Autre";
}

export function OperatorChart({ leads }: { leads: InsightLead[] }) {
  const rows = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of leads) {
      if (!l.hlr_network) continue;
      const k = normalizeNetwork(l.hlr_network);
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, n]) => ({ name, n, pct: total ? Math.round((n / total) * 100) : 0 }));
  }, [leads]);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Répartition des opérateurs</p>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Aucune donnée opérateur pour l'instant.</p>
      ) : (
        <div className="mt-3 space-y-2">
          {rows.map((r) => (
            <div key={r.name}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted-foreground">{r.n} · {r.pct}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ControlsCard() {
  const items = [
    { i: "🛡️", t: "Anti-faux leads", d: "Formats email et téléphone contrôlés" },
    { i: "📞", t: "HLR en direct", d: "Numéro vérifié auprès de l'opérateur" },
    { i: "🔐", t: "Code SMS", d: "Le prospect valide son numéro" },
    { i: "♻️", t: "Anti-doublons", d: "Email et téléphone uniques" },
  ];
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Contrôles actifs</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((x) => (
          <div key={x.t} className="flex gap-2">
            <span className="text-lg">{x.i}</span>
            <div>
              <p className="text-sm font-semibold">{x.t}</p>
              <p className="text-xs text-muted-foreground">{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, copy }: { label: string; value?: string | number | null | undefined; copy?: boolean }) {
  const v = value === undefined || value === null || value === "" ? "—" : String(value);
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/40 py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 text-right font-medium break-all">
        {v}
        {copy && v !== "—" && (
          <button type="button" aria-label={`Copier ${label}`} onClick={() => copyText(v, label)} className="text-muted-foreground hover:text-foreground">
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border/60 bg-background p-4">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

export function LeadDetailPanel({
  lead,
  hlrLabel,
  onClose,
}: {
  lead: InsightLead | null;
  hlrLabel: (s?: string) => string;
  onClose: () => void;
}) {
  if (!lead) return null;
  const isApi = lead.sms_delivery_status === "" && lead.sms_sent_count === 0 && lead.phone_verified;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button type="button" aria-label="Fermer" className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <aside className="relative h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{lead.first_name} {lead.last_name}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(lead.created_at).toLocaleString("fr-FR")} · {relativeTime(lead.created_at)}
              {isHot(lead.created_at) && " 🔥"}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-md p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <Block title="Identité & contact">
            <Row label="Prénom" value={lead.first_name} />
            <Row label="Nom" value={lead.last_name} />
            <Row label="Email" value={lead.email} copy />
            <Row label="Téléphone" value={lead.phone} copy />
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Phone className="h-4 w-4" /> Appeler
              </a>
            )}
          </Block>
          <Block title="Contrôle HLR">
            <Row label="Résultat" value={hlrLabel(lead.hlr_status)} />
            <Row label="Opérateur" value={lead.hlr_network} />
          </Block>
          <Block title="Projet">
            <Row label="Opération" value={lead.operation} />
            <Row label="Montant prévu" value={lead.invest_amount} />
            <Row label="Statut" value={lead.status} />
            <Row label="Notes" value={lead.notes} />
          </Block>
          <Block title="Provenance">
            <Row label="Canal" value={lead.refused ? "Refusé avant enregistrement" : isApi ? "API" : "Formulaire"} />
            <Row label="Source" value={lead.source} copy />
            <Row label="Click ID" value={lead.click_id} copy />
          </Block>
          <Block title="Replay Clarity">
            {lead.clarity_id ? (
              <a href={clarityReplayUrl()} target="_blank" rel="noreferrer" className="text-sm text-primary underline">🎬 Voir le replay (filtre ID utilisateur : {lead.clarity_id})</a>
            ) : (
              <span className="text-sm text-muted-foreground">— Aucune session enregistrée</span>
            )}
            <Row label="Pays" value={lead.pays} />
            <Row label="Adresse IP" value={lead.ip_address} copy />
          </Block>
          <Block title="Validation & envois">
            <Row label="Code SMS" value={lead.refused ? "Non envoyé" : isApi ? "API" : lead.phone_verified ? "✅ Validé" : "⏳ Non validé"} />
            <Row label="SMS envoyés" value={lead.sms_sent_count} />
            <Row label="Délivrance SMS" value={lead.sms_delivery_status} />
            <Row label="Google Sheet" value={lead.refused ? "Non inscrit" : lead.operation === "OR" ? "Onglet « Or »" : "Inscrit"} />
            <Row
              label="Pixel Com&Click"
              value={lead.refused ? "Non déclenché" : isApi ? (lead.source === "7ptu0gdy" ? "Déclenché" : "Non concerné") : lead.phone_verified ? "Déclenché" : "En attente de validation"}
            />
          </Block>
          <p className="text-xs text-muted-foreground">ID : {lead.id}</p>
        </div>
      </aside>
    </div>
  );
}
