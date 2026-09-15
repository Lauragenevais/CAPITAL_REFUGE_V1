import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-API-Key, Authorization",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

const apiLeadSchema = z.object({
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
  operation: z.enum(["AMAZON", "CHATGPT", "NVIDIA", "LIVRET", "ROBOT"]).optional(),
});

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const expected = process.env["LEADS_API_KEY"];
        if (!expected) {
          return json({ ok: false, error: "api_not_configured" }, 503);
        }

        const provided =
          request.headers.get("x-api-key") ??
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
          "";
        if (!provided || !safeEqual(provided, expected)) {
          return json({ ok: false, error: "unauthorized" }, 401);
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        const parsed = apiLeadSchema.safeParse(payload);
        if (!parsed.success) {
          return json(
            {
              ok: false,
              error: "validation_error",
              details: parsed.error.issues.map((i) => ({
                field: i.path.join("."),
                message: i.message,
              })),
            },
            422,
          );
        }

        const ipAddress =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("cf-connecting-ip") ||
          "api";

        try {
          const { processLead } = await import("@/lib/leads.server");
          const result = await processLead(parsed.data, ipAddress, "api");
          if (!result.ok) {
            return json({ ok: false, error: result.code, message: result.message }, 409);
          }
          return json({ ok: true, message: "Lead enregistré" }, 201);
        } catch (err) {
          console.error("API lead error:", err);
          return json({ ok: false, error: "server_error" }, 500);
        }
      },
    },
  },
});
