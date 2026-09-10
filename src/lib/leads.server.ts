import { z } from "zod";

const OPERATION = "AMAZON";

export const leadSchema = z.object({
  first_name: z.string().trim().min(2).max(60),
  last_name: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .regex(/^0[467]\d{8}$/, "Numéro invalide"),
  consent: z.literal(true),
  source: z.string().max(60).optional(),
  click_id: z.string().max(120).optional(),
  operation: z.enum(["AMAZON", "CHATGPT", "NVIDIA"]).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** ---------- Google Sheets (compte de service) ---------- */

function base64urlEncode(data: Uint8Array): string {
  let binary = "";
  for (const byte of data) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlJson(obj: Record<string, unknown>): string {
  return base64urlEncode(new TextEncoder().encode(JSON.stringify(obj)));
}

export async function getGoogleAccessToken(serviceAccountKey: string): Promise<string> {
  const sa = JSON.parse(serviceAccountKey) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const header = base64urlJson({ alg: "RS256", typ: "JWT" });
  const payload = base64urlJson({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });

  const pem = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(`${header}.${payload}`),
  );
  const jwt = `${header}.${payload}.${base64urlEncode(new Uint8Array(signature))}`;

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const json = (await resp.json()) as { access_token?: string };
  if (!resp.ok || !json.access_token) {
    throw new Error(`Google token error [${resp.status}]: ${JSON.stringify(json)}`);
  }
  return json.access_token;
}

async function ensureOperationHeader(
  accessToken: string,
  sheetId: string,
  sheetTitle: string,
): Promise<void> {
  const range = sheetTitle ? `'${sheetTitle}'!K1` : "K1";
  const readResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (readResp.ok) {
    const data = (await readResp.json()) as { values?: string[][] };
    if (data.values?.[0]?.[0]) return;
  }
  const writeResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [["Opération"]] }),
    },
  );
  if (!writeResp.ok) {
    throw new Error(`Google Sheets header error [${writeResp.status}]: ${await writeResp.text()}`);
  }
}

async function insertAtTopOfGoogleSheet(
  accessToken: string,
  sheetId: string,
  values: string[][],
  sheetTitle = "",
): Promise<void> {
  let targetSheetId = 0;
  if (sheetTitle) {
    const metaResp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets(properties(sheetId,title))`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!metaResp.ok) {
      throw new Error(`Google Sheets metadata error [${metaResp.status}]: ${await metaResp.text()}`);
    }
    const meta = (await metaResp.json()) as {
      sheets?: { properties?: { sheetId?: number; title?: string } }[];
    };
    const sheet = (meta.sheets ?? []).find((s) => s.properties?.title === sheetTitle);
    if (!sheet || sheet.properties?.sheetId === undefined) {
      throw new Error(`Onglet "${sheetTitle}" introuvable`);
    }
    targetSheetId = sheet.properties.sheetId;
  }

  const insertResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: targetSheetId,
                dimension: "ROWS",
                startIndex: 1,
                endIndex: 1 + values.length,
              },
              inheritFromBefore: false,
            },
          },
        ],
      }),
    },
  );
  if (!insertResp.ok) {
    throw new Error(`Google Sheets insert error [${insertResp.status}]: ${await insertResp.text()}`);
  }

  const writeRange = sheetTitle ? `'${sheetTitle}'!A2` : "A2";
  const updateResp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${writeRange}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    },
  );
  if (!updateResp.ok) {
    throw new Error(`Google Sheets update error [${updateResp.status}]: ${await updateResp.text()}`);
  }
}

function parisTimestamp(): string {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const p: Record<string, string> = {};
  for (const part of parts) p[part.type] = part.value;
  return `${p['year']}/${p['month']}/${p['day']} ${p['hour'] === "24" ? "00" : p['hour']}:${p['minute']}:${p['second']}`;
}

/** Accepte un ID brut ou une URL complète de Google Sheet. */
export function normalizeSheetId(value: string | undefined): string {
  if (!value) return "";
  const fromUrl = value.match(/\/d\/([A-Za-z0-9_-]+)/);
  if (fromUrl?.[1]) return fromUrl[1];
  const firstSegment = value.match(/([A-Za-z0-9_-]{20,})/);
  return firstSegment?.[1] ?? value.trim();
}



/** ---------- Traitement partagé d'un lead ---------- */

export type ProcessLeadResult =
  | { ok: true }
  | { ok: false; code: "duplicate"; message: string };

export async function processLead(
  data: LeadInput,
  ipAddress: string,
  channel: "form" | "api" = "form",
): Promise<ProcessLeadResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const operation = data.operation ?? OPERATION;


  const { data: existing } = await supabaseAdmin
    .from("leads")
    .select("id")
    .or(`email.eq.${data.email},phone.eq.${data.phone}`)
    .limit(1);

  if (existing && existing.length > 0) {
    return {
      ok: false,
      code: "duplicate",
      message: "Une demande avec cet email ou ce numéro existe déjà.",
    };
  }

  const { error: insertError } = await supabaseAdmin.from("leads").insert({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    consent: data.consent,
    source: data.source ?? "",
    click_id: data.click_id ?? "",
    ip_address: ipAddress,
    pays: "FR",
    operation,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return {
        ok: false,
        code: "duplicate",
        message: "Une demande avec cet email ou ce numéro existe déjà.",
      };
    }
    console.error("Lead insert error:", insertError);
    throw new Error("Enregistrement impossible");
  }

  // Google Sheet (non bloquant)
  let sheetStatus = "⏭️ Non configuré";
  const serviceAccountKey = process.env["GOOGLE_SERVICE_ACCOUNT_KEY"];
  const sheetId = normalizeSheetId(process.env["GOOGLE_SHEET_ID"]);
  const sheetTab = process.env["GOOGLE_SHEET_TAB"] ?? "";

  if (serviceAccountKey && sheetId) {
    try {
      const token = await getGoogleAccessToken(serviceAccountKey);
      await ensureOperationHeader(token, sheetId, sheetTab);
      await insertAtTopOfGoogleSheet(
        token,
        sheetId,
        [
          [
            data.first_name,
            data.last_name.toUpperCase(),
            data.email,
            data.phone,
            "FR",
            String(data.consent).toUpperCase(),
            ipAddress,
            data.source ?? "",
            data.click_id ?? "",
            parisTimestamp(),
            operation,
          ],
        ],
        sheetTab,
      );
      sheetStatus = "✅ Ajouté au Google Sheet";
    } catch (err) {
      sheetStatus = `❌ Erreur Google Sheet: ${err instanceof Error ? err.message : "inconnue"}`;
      console.error("Google Sheet error (non bloquant):", err);
    }
  }

  // Pixels de conversion Com&Click — un par canal
  let pixelStatus = "⏭️ Non déclenché";
  if (channel === "form" && operation === "CHATGPT") {
    const pixelUrl =
      `https://comandclick.com/scripts/postback.php?AccountId=5db4e65a&TotalCost=35` +
      `&CampaignID=mhmcapt7&status=P` +
      `&chan=${encodeURIComponent(data.source ?? "")}` +
      `&ProductID=${encodeURIComponent(data.click_id ?? "")}`;
    try {
      const pixelResp = await fetch(pixelUrl, {
        method: "GET",
        headers: { "User-Agent": "AmazonCapital-Lead/1.0" },
      });
      pixelStatus = pixelResp.ok
        ? `✅ Pixel ChatGPT déclenché (chan: ${data.source || "-"}, ProductID: ${data.click_id || "-"})`
        : `❌ Pixel ChatGPT erreur HTTP ${pixelResp.status} (chan: ${data.source || "-"}, ProductID: ${data.click_id || "-"})`;
    } catch (err) {
      pixelStatus = `❌ Pixel ChatGPT erreur: ${err instanceof Error ? err.message : "inconnue"}`;
      console.error("Pixel Com&Click ChatGPT error (non bloquant):", err);
    }
  } else if (channel === "form") {
    const productId = data.email;
    const pixelUrl =
      `https://comandclick.com/scripts/sale.php?AccountId=5db4e65a&TotalCost=35` +
      `&CampaignID=jqyvg8ky&ProductID=${encodeURIComponent(productId)}`;
    try {
      const pixelResp = await fetch(pixelUrl, {
        method: "GET",
        headers: { "User-Agent": "AmazonCapital-Lead/1.0" },
      });
      pixelStatus = pixelResp.ok
        ? `✅ Pixel formulaire déclenché (ProductID: ${productId})`
        : `❌ Pixel formulaire erreur HTTP ${pixelResp.status} (ProductID: ${productId})`;
    } catch (err) {
      pixelStatus = `❌ Pixel formulaire erreur: ${err instanceof Error ? err.message : "inconnue"}`;
      console.error("Pixel Com&Click formulaire error (non bloquant):", err);
    }
  } else if (channel === "api") {
    const pixelUrl =
      `https://comandclick.com/scripts/postback.php?AccountId=5db4e65a&TotalCost=35` +
      `&CampaignID=jqyvg8ky&status=P` +
      `&chan=${encodeURIComponent(data.source ?? "")}` +
      `&ProductID=${encodeURIComponent(data.click_id ?? "")}`;
    try {
      const pixelResp = await fetch(pixelUrl, {
        method: "GET",
        headers: { "User-Agent": "AmazonCapital-Lead/1.0" },
      });
      pixelStatus = pixelResp.ok
        ? `✅ Pixel API déclenché (chan: ${data.source || "-"}, ProductID: ${data.click_id || "-"})`
        : `❌ Pixel API erreur HTTP ${pixelResp.status} (chan: ${data.source || "-"}, ProductID: ${data.click_id || "-"})`;
    } catch (err) {
      pixelStatus = `❌ Pixel API erreur: ${err instanceof Error ? err.message : "inconnue"}`;
      console.error("Pixel Com&Click API error (non bloquant):", err);
    }
  }

  // Pixel AdkConvert — uniquement pour la source 3uqdgsil
  let adkPixelStatus = "⏭️ Non déclenché (source non concernée)";
  if (data.source === "3uqdgsil") {
    const adkClickId = data.click_id || "";
    const adkPixelUrl = `https://track.adkconvert.com/?e=2&clickid=${encodeURIComponent(adkClickId)}`;
    try {
      const adkResp = await fetch(adkPixelUrl, {
        method: "GET",
        headers: { "User-Agent": "AmazonCapital-Lead/1.0" },
      });
      adkPixelStatus = adkResp.ok
        ? `✅ Pixel AdkConvert déclenché (clickid: ${adkClickId || "-"})`
        : `❌ Pixel AdkConvert erreur HTTP ${adkResp.status} (clickid: ${adkClickId || "-"})`;
    } catch (err) {
      adkPixelStatus = `❌ Pixel AdkConvert erreur: ${err instanceof Error ? err.message : "inconnue"}`;
      console.error("Pixel AdkConvert error (non bloquant):", err);
    }
  }

  // Notification email (non bloquant)
  const resendKey = process.env["RESEND_API_KEY"];
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const notifyTo = process.env["LEAD_NOTIFICATION_EMAIL"];
  if (resendKey && lovableApiKey && notifyTo) {
    try {
      const origin = channel === "api" ? "API externe" : "Formulaire landing page";
      const resp = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": resendKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env["LEAD_NOTIFICATION_FROM"] ?? "Lead Amazon <onboarding@resend.dev>",
          to: [notifyTo],
          subject: `[NOUVEAU LEAD - ${operation}] ${data.last_name} - ${data.first_name} - ${data.email} - ${data.source || "direct"}`,
          text:
            `Nouveau lead enregistré:\n\n` +
            `📌 Provenance: ${origin} (${operation})\n\n` +
            `Nom: ${data.last_name}\nPrénom: ${data.first_name}\nEmail: ${data.email}\n` +
            `Téléphone: ${data.phone}\nSource: ${data.source || "direct"}\n` +
            `Click ID: ${data.click_id || "aucun"}\nIP: ${ipAddress}\n\n` +
            `Google Sheet: ${sheetStatus}\n` +
            `Pixel Com&Click: ${pixelStatus}\n` +
            `Pixel AdkConvert: ${adkPixelStatus}`,
        }),
      });
      if (!resp.ok) {
        console.error(`Resend error [${resp.status}]: ${await resp.text()}`);
      }
    } catch (err) {
      console.error("Erreur notification email (non bloquant):", err);
    }
  }

  return { ok: true };
}
