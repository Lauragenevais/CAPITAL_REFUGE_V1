import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { Download, LockKeyhole, LogOut, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  adminIsUnlocked,
  adminLogin,
  adminLogout,
  listLeads,
  updateLead,
  type AdminLead,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Suivi des leads — Amazon Capital" },
      { name: "description", content: "Espace privé de suivi des demandes reçues via le site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Suivi des leads — Amazon Capital" },
      { property: "og:description", content: "Espace privé de suivi des demandes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const STATUSES = ["nouveau", "contacté", "converti", "perdu"] as const;

const STATUS_CLASS: Record<string, string> = {
  nouveau: "bg-muted text-foreground",
  "contacté": "bg-primary/15 text-primary",
  converti: "bg-accent/15 text-accent",
  perdu: "bg-destructive/15 text-destructive",
};

function SmsBadges({ lead }: { lead: AdminLead }) {
  const smsSent = lead.sms_sent_count > 0;
  if (!smsSent && lead.phone_verified) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  const deliveryClass =
    lead.sms_delivery_status === "delivered"
      ? "bg-primary/15 text-primary"
      : lead.sms_delivery_status === "failed"
        ? "bg-destructive/15 text-destructive"
        : "bg-muted text-muted-foreground";
  const deliveryLabel =
    lead.sms_delivery_status === "delivered"
      ? "Délivré"
      : lead.sms_delivery_status === "failed"
        ? "Échec"
        : "Envoyé";
  const verifiedClass = lead.phone_verified ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground";
  const verifiedLabel = lead.phone_verified ? "Validé" : "Non validé";
  return (
    <div className="flex flex-col items-start gap-1">
      <span
        title={lead.sms_last_reason || undefined}
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${deliveryClass}`}
      >
        {deliveryLabel}
      </span>
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${verifiedClass}`}>
        {verifiedLabel}
      </span>
    </div>
  );
}

function AdminPage() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const check = useServerFn(adminIsUnlocked);

  useEffect(() => {
    check()
      .then((r) => setUnlocked(r.unlocked))
      .catch(() => setUnlocked(false));
  }, [check]);

  if (unlocked === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Chargement…
      </div>
    );
  }

  return unlocked ? (
    <Dashboard onLogout={() => setUnlocked(false)} />
  ) : (
    <LoginScreen onSuccess={() => setUnlocked(true)} />
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const login = useServerFn(adminLogin);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { ok } = await login({ data: { password } });
      if (ok) onSuccess();
      else toast.error("Mot de passe incorrect");
    } catch {
      toast.error("Connexion impossible");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border/70 bg-card p-8"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold shadow-gold">
          <LockKeyhole className="h-5 w-5 text-primary-foreground" />
        </span>
        <h1 className="mt-5 text-xl font-bold">Espace administrateur</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Saisissez le mot de passe pour accéder au suivi des leads.
        </p>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="mt-6"
        />
        <Button type="submit" disabled={loading || !password} className="mt-4 w-full">
          {loading ? "Vérification…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const fetchLeads = useServerFn(listLeads);
  const patchLead = useServerFn(updateLead);
  const logout = useServerFn(adminLogout);

  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [sourceFilter, setSourceFilter] = useState("toutes");
  const [period, setPeriod] = useState("tout");

  async function load() {
    setLoading(true);
    try {
      setLeads(await fetchLeads());
    } catch {
      toast.error("Impossible de charger les leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sources = useMemo(
    () => Array.from(new Set(leads.map((l) => l.source).filter(Boolean))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = Date.now();
    const periodMs =
      period === "jour" ? 86400000 : period === "semaine" ? 604800000 : period === "mois" ? 2592000000 : null;

    return leads.filter((l) => {
      if (statusFilter !== "tous" && l.status !== statusFilter) return false;
      if (sourceFilter !== "toutes" && l.source !== sourceFilter) return false;
      if (periodMs && now - new Date(l.created_at).getTime() > periodMs) return false;
      if (!q) return true;
      return `${l.first_name} ${l.last_name} ${l.email} ${l.phone} ${l.source}`
        .toLowerCase()
        .includes(q);
    });
  }, [leads, search, statusFilter, sourceFilter, period]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: leads.length,
      today: leads.filter((l) => now - new Date(l.created_at).getTime() < 86400000).length,
      week: leads.filter((l) => now - new Date(l.created_at).getTime() < 604800000).length,
      converted: leads.filter((l) => l.status === "converti").length,
    };
  }, [leads]);

  async function setStatus(lead: AdminLead, status: string) {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    try {
      await patchLead({ data: { id: lead.id, status } });
    } catch {
      toast.error("Mise à jour impossible");
      void load();
    }
  }

  async function saveNotes(lead: AdminLead, notes: string) {
    if (notes === lead.notes) return;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, notes } : l)));
    try {
      await patchLead({ data: { id: lead.id, notes } });
      toast.success("Note enregistrée");
    } catch {
      toast.error("Enregistrement impossible");
    }
  }

  function exportCsv() {
    const headers = [
      "Date", "Prénom", "Nom", "Email", "Téléphone", "Source", "Click ID", "Pays", "IP", "Statut", "Notes",
    ];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleString("fr-FR"),
      l.first_name, l.last_name, l.email, l.phone, l.source, l.click_id, l.pays, l.ip_address, l.status, l.notes,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <div>
            <h1 className="font-display text-xl font-bold">Suivi des leads</h1>
            <p className="text-sm text-muted-foreground">Espace administrateur — Amazon Capital</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void load()} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
            </Button>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await logout();
                onLogout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Quitter
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total leads", value: stats.total },
            { label: "Aujourd'hui", value: stats.today },
            { label: "7 derniers jours", value: stats.week },
            { label: "Convertis", value: stats.converted },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un nom, email, téléphone…"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes les sources</SelectItem>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tout">Toute la période</SelectItem>
              <SelectItem value="jour">24 heures</SelectItem>
              <SelectItem value="semaine">7 jours</SelectItem>
              <SelectItem value="mois">30 jours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border/70 bg-card">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b border-border/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Chargement…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Aucun lead</td></tr>
              )}
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/40 last:border-0 align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("fr-FR", {
                      day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{lead.first_name} {lead.last_name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.source || "—"}</td>
                  <td className="px-4 py-3">
                    <Select value={lead.status} onValueChange={(v) => void setStatus(lead, v)}>
                      <SelectTrigger
                        className={`h-8 w-36 border-0 text-xs font-semibold ${STATUS_CLASS[lead.status] ?? "bg-muted"}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      defaultValue={lead.notes}
                      placeholder="Ajouter une note…"
                      className="h-8 w-56 text-xs"
                      onBlur={(e) => void saveNotes(lead, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
