import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const leadSchema = z.object({
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
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const ipAddress =
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      getRequestHeader("cf-connecting-ip") ||
      "unknown";

    const { processLead } = await import("@/lib/leads.server");
    const result = await processLead(data, ipAddress, "form");

    if (!result.ok) {
      return { ok: false as const, code: result.code, message: result.message };
    }
    return { ok: true as const };
  });
