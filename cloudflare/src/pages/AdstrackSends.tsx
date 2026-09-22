import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, LockKeyhole, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHead } from "@/hooks/useHead";
import { apiUrl } from "@/lib/api";

const TOKEN_KEY = "ac-admin-token";

type AdstrackSend = {
  id: string;
  channel: string;
  operation: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  ip_address: string;
  ok: boolean;
  response_status: number | null;
  response_body: string;
  created_at: string;
};

async function callAdmin<T>(body: Record<string, unknown>, token?: string | null): Promise<T> {
  const res = await fetch(apiUrl("/api/public/admin"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok || json["ok"] !== true) {
    throw new Error(String(json["error"] ?? "request_failed"));
  }
  return json as T;
}

function selectClass(extra = "") {
  return `h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring ${extra}`;
}

function loginErrorMessage(message: string): string {
  if (message === "invalid_password") return "Mot de passe incorrect";
  if (message === "not_configured") return "Accès admin non configuré";
  if (message === "origin_not_allowed") return "Adresse Cloudflare non autorisée";
  if (message === "server_error") return "Erreur côté service admin";
  return "Connexion impossible";
}

export default function AdstrackSends() {
  useHead({
    title: "Suivi des envois Adstrack — Amazon Capital",
    description: "Espace privé de suivi des leads transmis au webservice Adstrack CRP19.",
  });

  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
    setReady(true);
  }, []);

  function saveToken(value: string | null) {
    if (value) localStorage.setItem(TOKEN_KEY, value);
    else localStorage.removeItem(TOKEN_KEY);
    setToken(value);
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Chargement…
      </div>
    );
  }

  return token ? (
    <Dashboard token={token} onLogout={() => saveToken(null)} />
  ) : (
    <LoginScreen onSuccess={saveToken} />
  );
}

function LoginScreen({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await callAdmin<{ token: string }>({ action: "login", password });
      onSuccess(res.token);
    } catch (err) {
      toast.error(loginErrorMessage((err as Error).message));
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

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
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
      const res = await callAdmin<{ sends: AdstrackSend[] }>({ action: "adstrack" }, token);
      setSends(res.sends);
    } catch (err) {
      if ((err as Error).message === "unauthorized") {
        toast.error("Session expirée, reconnectez-vous");
        onLogout();
      } else {
        toast.error("Impossible de charger les envois");
      }
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
            <Button variant="ghost" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" /> Leads
              </Link>
            </Button>
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
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className={selectClass("w-[170px]")}
          >
            <option value="formulaire">Formulaire</option>
            <option value="api">API externe</option>
            <option value="tous">Tous les canaux</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className={selectClass("w-[170px]")}
          >
            <option value="toutes">Toutes les sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
            className={selectClass("w-[150px]")}
          >
            <option value="tous">Tous résultats</option>
            <option value="succes">Succès</option>
            <option value="echecs">Échecs</option>
          </select>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={selectClass("w-[150px]")}
          >
            <option value="tout">Toute la période</option>
            <option value="jour">24 heures</option>
            <option value="semaine">7 jours</option>
            <option value="mois">30 jours</option>
          </select>
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
