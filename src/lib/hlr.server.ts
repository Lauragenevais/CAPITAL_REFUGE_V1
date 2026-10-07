// HLR-Lookups.com : vérification en temps réel qu'un numéro existe sur un réseau.
// Valide = CONNECTED ou ABSENT. Une panne / un manque de crédit ne bloque pas le lead.
export type HlrResult = { valid: boolean; status: string; network?: string | undefined };

export const HLR_SKIP_SOURCES = ["7ptu0gdy"];

export function toMsisdn(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `+33${digits.slice(1)}` : `+${digits}`;
}

export function isHlrValid(status: string): boolean {
  return status === "CONNECTED" || status === "ABSENT";
}

export async function hlrLookup(phone: string): Promise<HlrResult> {
  const key = process.env["HLR_LOOKUPS_API_KEY"];
  const secret = process.env["HLR_LOOKUPS_API_SECRET"];
  if (!key || !secret) return { valid: true, status: "SERVICE_ERROR" };
  try {
    const hashBuf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${key}:${secret}`));
    const xBasic = Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    const res = await fetch("https://www.hlr-lookups.com/api/v2/hlr-lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Basic": xBasic },
      body: JSON.stringify({ msisdn: toMsisdn(phone) }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok || !data["connectivity_status"]) {
      console.error("HLR service error", res.status, JSON.stringify(data).slice(0, 300));
      return { valid: true, status: "SERVICE_ERROR" };
    }
    const status = String(data["connectivity_status"]);
    const network = (data["ported_network_name"] || data["original_network_name"] || undefined) as string | undefined;
    return { valid: isHlrValid(status), status, network };
  } catch (e) {
    console.error("HLR lookup failed", e);
    return { valid: true, status: "SERVICE_ERROR" };
  }
}
