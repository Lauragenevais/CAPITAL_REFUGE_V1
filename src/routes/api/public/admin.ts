import { createFileRoute } from "@tanstack/react-router";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

/**
 * API d'administration utilisable depuis un front statique (Cloudflare).
 *
 * Protection :
 *  - liste blanche d'origines (ALLOWED_ORIGINS) ;
 *  - mot de passe ADMIN_PASSWORD -> jeton signé HMAC (ADMIN_SESSION_SECRET), 12 h ;
 *  - jeton transmis dans l'en-tête Authorization: Bearer <token>.
 */

function allowedOrigins(): string[] {
  return (process.env["ALLOWED_ORIGINS"] ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null): Record<string, string> {
  const list = allowedOrigins();
  const allow = list.length === 0 ? "*" : origin && list.includes(origin) ? origin : "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (allow) headers["Access-Control-Allow-Origin"] = allow;
  return headers;
}

function equals(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

type Scope = "leads" | "adstrack";

function sign(scope: Scope, exp: number): string {
  const secret = process.env["ADMIN_SESSION_SECRET"] ?? "";
  return createHmac("sha256", secret).update(`${scope}:${exp}`).digest("hex");
}

function issueToken(scope: Scope): string {
  const exp = Date.now() + 12 * 60 * 60 * 1000;
  return `${scope}.${exp}.${sign(scope, exp)}`;
}

function tokenValid(token: string | null, scope: Scope): boolean {
  if (!token) return false;
  const [tokScope, expRaw, sig] = token.split(".");
  if (tokScope !== scope || !expRaw || !sig) return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  try {
    return equals(sig, sign(scope, exp));
  } catch {
    return false;
  }
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("login"),
    password: z.string().min(1).max(200),
    scope: z.enum(["leads", "adstrack"]).optional(),
  }),
  z.object({ action: z.literal("list") }),
  z.object({ action: z.literal("adstrack") }),
  z.object({
    action: z.literal("update"),
    id: z.string().uuid(),
    status: z.enum(["nouveau", "contacté", "converti", "perdu"]).optional(),
    notes: z.string().max(2000).optional(),
  }),
]);

export const Route = createFileRoute("/api/public/admin")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) =>
        new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) }),
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const cors = corsHeaders(origin);
        const json = (body: unknown, status = 200) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json", ...cors },
          });

        const list = allowedOrigins();
        if (list.length > 0 && origin && !list.includes(origin)) {
          return json({ ok: false, error: "origin_not_allowed" }, 403);
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        const parsed = bodySchema.safeParse(payload);
        if (!parsed.success) return json({ ok: false, error: "validation_error" }, 422);
        const body = parsed.data;

        if (body.action === "login") {
          const scope: Scope = body.scope ?? "leads";
          const expected =
            scope === "adstrack"
              ? process.env["ADSTRACK_ADMIN_PASSWORD"]
              : process.env["ADMIN_PASSWORD"];
          const secret = process.env["ADMIN_SESSION_SECRET"];
          if (!expected || !secret) return json({ ok: false, error: "not_configured" }, 503);
          if (!equals(body.password, expected)) {
            return json({ ok: false, error: "invalid_password" }, 401);
          }
          return json({ ok: true, token: issueToken(scope) });
        }

        const auth = request.headers.get("authorization");
        const token = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : null;
        const needed: Scope = body.action === "adstrack" ? "adstrack" : "leads";
        if (!tokenValid(token, needed)) return json({ ok: false, error: "unauthorized" }, 401);

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          if (body.action === "list") {
            const { data, error } = await supabaseAdmin
              .from("leads")
              .select(
                "id, first_name, last_name, email, phone, source, click_id, pays, ip_address, status, notes, created_at",
              )
              .order("created_at", { ascending: false })
              .limit(2000);
            if (error) throw new Error(error.message);
            return json({ ok: true, leads: data ?? [] });
          }

          if (body.action === "adstrack") {
            const { data, error } = await supabaseAdmin
              .from("adstrack_sends")
              .select(
                "id, channel, operation, first_name, last_name, email, phone, source, ip_address, ok, response_status, response_body, created_at",
              )
              .order("created_at", { ascending: false })
              .limit(2000);
            if (error) throw new Error(error.message);
            return json({ ok: true, sends: data ?? [] });
          }

          const patch: { status?: string; notes?: string } = {};
          if (body.status !== undefined) patch["status"] = body.status;
          if (body.notes !== undefined) patch["notes"] = body.notes;
          const { error } = await supabaseAdmin.from("leads").update(patch).eq("id", body.id);
          if (error) throw new Error(error.message);
          return json({ ok: true });
        } catch (err) {
          console.error("Admin API error:", err);
          return json({ ok: false, error: "server_error" }, 500);
        }
      },
    },
  },
});
