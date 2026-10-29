/** Mise en page HTML du mail de notification de lead (Cap Refuge OR). */

const esc = (v: unknown) =>
  String(v ?? "-").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const val = (v: unknown) => (v === "" || v == null ? "-" : v);

type Tone = "ok" | "ko" | "warn" | "na";
const TONES: Record<Tone, [string, string]> = {
  ok: ["#dcfce7", "#166534"],
  ko: ["#fee2e2", "#991b1b"],
  warn: ["#fef3c7", "#92400e"],
  na: ["#f1f5f9", "#64748b"],
};
const badge = (tone: Tone, label: string) =>
  `<span style="display:inline-block;padding:3px 10px;background:${TONES[tone][0]};color:${TONES[tone][1]};border-radius:6px;font-size:12px;font-weight:700;white-space:nowrap;">${esc(label)}</span>`;

const infoRow = (k: string, v: string) =>
  `<tr><td style="padding:5px 0;color:#64748b;width:150px;font-size:14px;vertical-align:top;">${k}</td><td style="padding:5px 0;font-weight:600;color:#0f172a;font-size:14px;word-break:break-word;">${v}</td></tr>`;

export type Row = { name: string; tone: Tone; label: string; detail?: string | undefined };

function section(title: string, rows: Row[]) {
  const body = rows
    .map(
      (r, i) => `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="${i === rows.length - 1 ? "" : "border-bottom:1px solid #f1f5f9;"}"><tr>
<td align="left" valign="middle" style="padding:10px 8px 10px 0;"><div style="font-size:14px;font-weight:700;color:#0f172a;">${esc(r.name)}</div>${r.detail ? `<div style="font-size:12px;color:#64748b;margin-top:2px;word-break:break-all;">${esc(r.detail)}</div>` : ""}</td>
<td align="right" valign="middle" style="padding:10px 0;">${badge(r.tone, r.label)}</td></tr></table>`,
    )
    .join("");
  return `<tr><td style="background:#ffffff;border-radius:12px;padding:18px 22px;border:1px solid #e2e8f0;">
<div style="font-size:13px;font-weight:800;color:#0f172a;letter-spacing:0.5px;margin-bottom:6px;">${title}</div>${body}</td></tr>
<tr><td height="12" style="font-size:0;line-height:0;">&nbsp;</td></tr>`;
}

/** Transforme un statut texte (✅ / ❌ / ⏭️) en ligne de suivi. */
export function statusRow(name: string, status: string): Row {
  const detail = status.replace(/^[✅❌⏭️⚠️\s]+/u, "").trim();
  if (status.startsWith("✅")) return { name, tone: "ok", label: "✓ OK", detail };
  if (status.startsWith("❌")) return { name, tone: "ko", label: "✗ Échec", detail };
  if (status.startsWith("⏭")) return { name, tone: "na", label: "— Non déclenché", detail };
  return { name, tone: "warn", label: "⚠ À vérifier", detail };
}

export function buildLeadEmailHtml(p: {
  refused?: boolean;
  channel: "form" | "api";
  operation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investAmount?: string | undefined;
  source?: string | undefined;
  clickId?: string | undefined;
  ip: string;
  clarityId?: string | undefined;
  hlrStatus?: string | undefined;
  hlrNetwork?: string | undefined;
  hlrSkipped?: boolean | undefined;
  smsValidated?: boolean;
  actions?: Row[];
}): string {
  const now = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short" });
  const fullName = `${p.lastName.toUpperCase()} ${p.firstName}`.trim();
  const origin = p.channel === "api" ? "API externe" : "Formulaire landing page";

  const details = [
    infoRow("📞 Téléphone", `<a href="tel:${esc(p.phone)}" style="color:#0f172a;text-decoration:none;font-weight:700;">${esc(val(p.phone))}</a>`),
    infoRow("✉️ Email", `<a href="mailto:${esc(p.email)}" style="color:#a16207;text-decoration:none;">${esc(val(p.email))}</a>`),
    infoRow("💰 Montant envisagé", esc(val(p.investAmount))),
    infoRow("📌 Provenance", `${esc(origin)} <span style="font-size:12px;color:#64748b;font-weight:400;">(${esc(p.operation)})</span>`),
    infoRow("🎯 Source", `<span style="font-weight:700;">${esc(val(p.source))}</span> <span style="font-size:12px;color:#64748b;font-weight:400;">(ClickID : ${esc(p.clickId || "aucun")})</span>`),
    infoRow("🌐 IP visiteur", esc(val(p.ip))),
    p.clarityId ? infoRow("🎬 Replay Clarity", `<a href="https://clarity.microsoft.com/projects/view/z5cc4zgs3q/recordings" style="color:#059669;font-weight:700;">Voir le replay</a> <span style="font-size:12px;color:#64748b;font-weight:400;">(filtre ID utilisateur : ${esc(p.clarityId)})</span>`) : "",
  ].join("");

  const hlrOk = p.hlrStatus === "CONNECTED" || p.hlrStatus === "ABSENT";
  const hlrRow: Row = p.hlrSkipped || !p.hlrStatus
    ? { name: "Contrôle HLR", tone: "na", label: "— Non vérifié", detail: p.channel === "api" ? "Lead API : pas de contrôle HLR" : p.hlrSkipped ? "Source exemptée" : undefined }
    : {
        name: "Contrôle HLR",
        tone: hlrOk ? "ok" : p.refused ? "ko" : "warn",
        label: hlrOk ? "✓ Valide" : p.refused ? "✗ Refusé" : "⚠ Service indisponible",
        detail: `${p.hlrStatus}${p.hlrNetwork ? " · Opérateur : " + p.hlrNetwork : ""}`,
      };
  const phoneRows: Row[] = [hlrRow];
  if (!p.refused) {
    phoneRows.push(
      p.channel === "api"
        ? { name: "Code SMS", tone: "na", label: "— API", detail: "Validation directe" }
        : { name: "Code SMS", tone: p.smsValidated ? "ok" : "warn", label: p.smsValidated ? "✓ Validé" : "⚠ Non validé" },
    );
  }

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:540px;margin:0 auto;">
<tr><td style="background:#ffffff;border-radius:12px;padding:22px;border:1px solid #e2e8f0;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;"><tr>
<td align="left"><span style="display:inline-block;padding:4px 12px;background:#fef3c7;color:#92400e;border-radius:16px;font-size:12px;font-weight:800;letter-spacing:0.5px;">CAP REFUGE · ${esc(p.operation)}</span></td>
<td align="right" style="font-size:12px;color:#94a3b8;">${esc(now)}</td></tr></table>
<div style="font-size:12px;color:#64748b;font-weight:600;margin-bottom:2px;">${p.refused ? "LEAD REFUSÉ (NUMÉRO INVALIDE)" : "NOUVEAU LEAD REÇU"}</div>
<h1 style="margin:0 0 16px;font-size:24px;font-weight:800;line-height:1.2;">${esc(fullName)}</h1>
<table border="0" cellpadding="0" cellspacing="0" width="100%">${details}</table>
</td></tr>
<tr><td height="12" style="font-size:0;line-height:0;">&nbsp;</td></tr>
${section("📱 CONTRÔLE TÉLÉPHONE", phoneRows)}
${p.refused || !p.actions ? "" : section("🚀 TRANSMISSION &amp; PIXELS", p.actions)}
${section("🔐 CONSENTEMENT &amp; CONFORMITÉ", [
  { name: "Consentement partenaires", tone: "ok", label: "✓ Accepté" },
  { name: "Horodatage preuve", tone: "ok", label: "✓ OK", detail: `${now} · IP ${val(p.ip)}` },
])}
<tr><td align="center" style="padding:12px;font-size:11px;color:#94a3b8;">Cap Refuge · capital-refuge.com · Suivi temps réel des leads</td></tr>
</table></body></html>`;
}
