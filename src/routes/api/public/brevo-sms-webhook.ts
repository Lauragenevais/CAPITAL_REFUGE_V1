/**
 * Webhook Brevo (SMS transactionnels).
 *
 * Brevo appelle cette URL à chaque événement SMS (délivré, bounce, rejet…).
 * L'URL enregistrée chez Brevo contient un jeton secret : /api/public/brevo-sms-webhook?token=…
 *
 * On met à jour le lead correspondant au numéro :
 *  - delivered  -> sms_delivery_status = "delivered" + sms_delivered_at
 *  - hardBounce / softBounce / rejected / blocked / spam
 *               -> sms_delivery_status = "failed" + motif dans sms_last_reason
 * Les autres événements (sent, accepted, replied…) sont ignorés.
 */
import { createFileRoute } from "@tanstack/react-router";

type BrevoSmsEvent = {
  event?: string;
  phoneNumber?: string;
  messageId?: string;
  reason?: string;
};

/** 33612345678 / +33612345678 / 06 12 34 56 78 -> 0612345678 */
function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("33") && digits.length === 11) digits = `0${digits.slice(2)}`;
  return digits;
}

const FAILED_EVENTS = new Set(["hardBounce", "softBounce", "rejected", "blocked", "spam"]);

export const Route = createFileRoute("/api/public/brevo-sms-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["BREVO_WEBHOOK_SECRET"];
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!secret || !token || token !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }

        let payload: BrevoSmsEvent;
        try {
          payload = (await request.json()) as BrevoSmsEvent;
        } catch {
          return new Response("Bad request", { status: 400 });
        }

        const event = payload.event ?? "";
        const phoneRaw = payload.phoneNumber ?? "";
        if (!phoneRaw) return new Response("ok"); // événement email ou inconnu : ignoré

        const normalized = normalizePhone(phoneRaw);
        if (!normalized) return new Response("ok");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          if (event === "delivered") {
            const { error } = await supabaseAdmin
              .from("leads")
              .update({
                sms_delivery_status: "delivered",
                sms_delivered_at: new Date().toISOString(),
                sms_last_reason: "",
              })
              .eq("sms_normalized_phone", normalized)
              .order("created_at", { ascending: false })
              .limit(1);
            if (error) console.error("Brevo webhook delivered update error:", error.message);
          } else if (FAILED_EVENTS.has(event)) {
            const { error } = await supabaseAdmin
              .from("leads")
              .update({
                sms_delivery_status: "failed",
                sms_last_reason: payload.reason ?? event,
              })
              .eq("sms_normalized_phone", normalized)
              .order("created_at", { ascending: false })
              .limit(1);
            if (error) console.error("Brevo webhook failed update error:", error.message);
          }
        } catch (err) {
          console.error("Brevo SMS webhook error:", err);
          return new Response("ok");
        }

        return new Response("ok");
      },
    },
  },
});
