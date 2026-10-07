import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { Download, LockKeyhole, RefreshCw, Search } from "lucide-react";
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
  adstrackIsUnlocked,
  adstrackLogin,
  listAdstrackSends,
  type AdstrackSend,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin_/adstrack")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Suivi des envois Adstrack — Cap Refuge" },
      {
        name: "description",
        content: "Espace privé de suivi des leads transmis au webservice Adstrack CRP19.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Suivi des envois Adstrack — Cap Refuge" },
      {
        property: "og:description",
        content: "Espace privé de suivi des leads transmis au webservice Adstrack CRP19.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdstrackPage,
});

function AdstrackPage() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const check = useServerFn(adstrackIsUnlocked);

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

  return unlocked ? <Dashboard /> : <LoginScreen onSuccess={() => setUnlocked(true)} />;
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const login = useServerFn(adstrackLogin);
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
          Saisissez le mot de passe pour accéder au suivi des envois Adstrack.
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

function Dashboard() {
  const fetchSends = useServerFn(listAdstrackSends);

  const [sends, setSends] = useState<AdstrackSend[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("toutes");
  const [resultFilter, setResultFilter] = useState("tous");
  const [channelFilter, setChannelFilter] = useState("formulaire");
  const [period, setPeriod] = useState("tout");

  async function load() {
    setLoading(true);
    try {
      setSends(await fetchSends());
    } catch {
      toast.error("Impossible de charger les envois");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sources = useMemo(
    () => Array.from(new Set(sends.map((s) => s.source).filter(Boolean))).sort(),
    [sends],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = Date.now();
    const periodMs =
      period === "jour"
        ? 86400000
        : period === "semaine"
          ? 604800000
          : period === "mois"
            ? 2592000000
            : null;

    return sends.filter((s) => {
      if (channelFilter === "formulaire" && s.channel !== "form") return false;
      if (channelFilter === "api" && s.channel !== "api") return false;
      if (sourceFilter !== "toutes" && s.source !== sourceFilter) return false;
      if (resultFilter === "succes" && !s.ok) return false;
      if (resultFilter === "echecs" && s.ok) return false;
      if (periodMs && now - new Date(s.created_at).getTime() > periodMs) return false;
      if (!q) return true;
      return `${s.first_name} ${s.last_name} ${s.email} ${s.phone} ${s.source} ${s.response_body}`
        .toLowerCase()
        .includes(q);
    });
  }, [sends, search, sourceFilter, resultFilter, channelFilter, period]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: filtered.length,
      today: filtered.filter((s) => now - new Date(s.created_at).getTime() < 86400000).length,
      ok: filtered.filter((s) => s.ok).length,
      ko: filtered.filter((s) => !s.ok).length,
    };
  }, [filtered]);

  function exportCsv() {
    const headers = [
      "Date",
      "Canal",
      "Opération",
      "Prénom",
      "Nom",
      "Email",
      "Téléphone",
      "Source",
      "IP",
      "Résultat",
      "Code HTTP",
      "Réponse",
    ];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleString("fr-FR"),
      s.channel === "api" ? "API" : "Formulaire",
      s.operation,
      s.first_name,
      s.last_name,
      s.email,
      s.phone,
      s.source,
      s.ip_address,
      s.ok ? "Succès" : "Échec",
      s.response_status ?? "",
      s.response_body,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `adstrack-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <div>
            <h1 className="font-display text-xl font-bold">Suivi des envois Adstrack</h1>
            <p className="text-sm text-muted-foreground">
              Campagne CRP19 — chaque lead transmis, sa source, la réponse reçue et la date.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => void load()} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
            </Button>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Envois affichés", value: stats.total },
            { label: "Aujourd'hui", value: stats.today },
            { label: "Succès", value: stats.ok },
            { label: "Échecs", value: stats.ko },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 bg-card p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un nom, email, source…"
              className="pl-9"
            />
          </div>
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formulaire">Formulaire</SelectItem>
              <SelectItem value="api">API externe</SelectItem>
              <SelectItem value="tous">Tous les canaux</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes les sources</SelectItem>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={resultFilter} onValueChange={setResultFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous résultats</SelectItem>
              <SelectItem value="succes">Succès</SelectItem>
              <SelectItem value="echecs">Échecs</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
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
            <thead className="bg-surface/60 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Opération</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Réponse reçue</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    Chargement…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    Aucun envoi pour ces critères.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="border-t border-border/60 align-top">
                    <td className="whitespace-nowrap px-4 py-3">
                      {new Date(s.created_at).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">
                        {s.last_name} {s.first_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                      <p className="text-xs text-muted-foreground">{s.phone}</p>
                    </td>
                    <td className="px-4 py-3">{s.source || "direct"}</td>
                    <td className="px-4 py-3">{s.operation || "—"}</td>
                    <td className="px-4 py-3">{s.channel === "api" ? "API" : "Formulaire"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.ok ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
                        }`}
                      >
                        {s.ok ? "Succès" : "Échec"}
                        {s.response_status ? ` · ${s.response_status}` : ""}
                      </span>
                      <p className="mt-1 max-w-md break-words text-xs text-muted-foreground">
                        {s.response_body || "réponse vide"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
