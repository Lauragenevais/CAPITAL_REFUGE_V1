import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Validation du code SMS envoyé après le formulaire.
 * action "verify" : contrôle le code puis déclenche Sheet / pixels / notification.
 * action "resend" : renvoie un nouveau code (3 envois max).
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
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (allow) headers["Access-Control-Allow-Origin"] = allow;
  return headers;
}

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("verify"), lead_id: z.string().uuid(), code: z.string().regex(/^\d{6}$/) }),
  z.object({ action: z.literal("resend"), lead_id: z.string().uuid() }),
]);

export const Route = createFileRoute("/api/public/lead-verify")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) =>
        new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) }),
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const json = (body: unknown, status = 200) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
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
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return json({ ok: false, error: "validation_error", message: "Code invalide (6 chiffres)." }, 422);
        }

        const ipAddress =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("cf-connecting-ip") ||
          "unknown";

        try {
          const { verifyLeadCode, resendLeadCode } = await import("@/lib/leads.server");
          const result =
            parsed.data.action === "verify"
              ? await verifyLeadCode(parsed.data.lead_id, parsed.data.code, ipAddress)
              : await resendLeadCode(parsed.data.lead_id);
          if (!result.ok) return json({ ok: false, error: result.code, message: result.message }, 400);
          return json({ ok: true });
        } catch (err) {
          console.error("Lead verify error:", err);
          return json({ ok: false, error: "server_error" }, 500);
        }
      },
    },
  },
});
