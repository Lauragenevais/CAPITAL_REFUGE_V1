import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Endpoint public utilisé par le formulaire de la landing page.
 *
 * Il est volontairement SANS clé API (une clé serait visible dans le bundle
 * navigateur d'un front statique). La protection repose sur :
 *  - une liste blanche d'origines (variable d'env ALLOWED_ORIGINS, séparée par des virgules) ;
 *  - la validation stricte du payload ;
 *  - l'anti-doublon email/téléphone côté base.
 *
 * Pour les intégrations serveur-à-serveur, utiliser /api/public/leads (clé API).
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

const schema = z.object({
  first_name: z.string().trim().min(2).max(60),
  last_name: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.\-()]/g, "").replace(/^\+33/, "0"))
    .refine((v) => /^0[467]\d{8}$/.test(v), "Numéro de mobile français invalide"),
  consent: z.literal(true),
  source: z.string().max(60).optional(),
  click_id: z.string().max(120).optional(),
});

export const Route = createFileRoute("/api/public/lead-form")({
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

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return json(
            {
              ok: false,
              error: "validation_error",
              message: "Merci de vérifier les informations saisies.",
            },
            422,
          );
        }

        const ipAddress =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("cf-connecting-ip") ||
          "unknown";

        try {
          const { processLead } = await import("@/lib/leads.server");
          const result = await processLead(parsed.data, ipAddress, "form");
          if (!result.ok) {
            return json({ ok: false, error: result.code, message: result.message }, 409);
          }
          return json({ ok: true }, 201);
        } catch (err) {
          console.error("Lead form error:", err);
          const msg = err instanceof Error ? err.message : "";
          if (msg.includes("Missing Supabase environment variable")) {
            return json(
              {
                ok: false,
                error: "backend_not_configured",
                message:
                  "Le backend n'est pas configuré sur cet hébergement (variables d'environnement manquantes).",
              },
              503,
            );
          }
          return json({ ok: false, error: "server_error" }, 500);
        }
      },
    },
  },
});
