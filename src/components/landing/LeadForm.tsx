import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import * as z from "zod";
import { CheckCircle2, Lock, ShieldCheck, BadgeCheck, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead } from "@/lib/leads.functions";

const formSchema = z.object({
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().trim().email("Adresse email invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^0[467]\d{8}$/, "10 chiffres, commençant par 04, 06 ou 07"),
  consent: z.boolean().refine((v) => v === true, { message: "Vous devez accepter les conditions" }),
});

type FormData = z.infer<typeof formSchema>;

function getTrackingParams() {
  if (typeof window === "undefined") return { clickId: "", source: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    clickId: params.get("clickid") ?? "",
    source: params.get("source") ?? "",
  };
}

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const send = useServerFn(submitLead);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  const consentValue = watch("consent");

  const onSubmit = async (values: FormData) => {
    const { clickId, source } = getTrackingParams();
    try {
      const result = await send({
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone: values.phone,
          consent: true as const,
          source,
          click_id: clickId,
        },
      });

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      setIsSubmitted(true);
      toast.success("Votre demande a bien été envoyée !");
    } catch (error) {
      console.error("Erreur envoi lead:", error);
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  if (isSubmitted) {
    return (
      <div
        id="formulaire"
        className="animate-rise rounded-3xl bg-panel p-10 text-center text-panel-foreground shadow-panel"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold shadow-gold">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold">Votre demande est bien enregistrée</h3>
        <p className="mt-3 text-sm opacity-70">
          Un conseiller spécialisé vous rappelle sous 24 heures ouvrées pour valider votre profil
          investisseur.
        </p>
      </div>
    );
  }

  return (
    <div
      id="formulaire"
      className="animate-rise overflow-hidden rounded-3xl bg-panel text-panel-foreground shadow-panel"
    >
      <div className="bg-gold px-6 py-5 text-center text-primary-foreground">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Pré-inscription ouverte
        </p>
        <h2 className="mt-2 text-2xl font-bold">Testez votre éligibilité</h2>
        <p className="mt-1 text-sm opacity-80">Réponse immédiate, en moins de 60 secondes</p>
      </div>

      <div className="flex items-center justify-center gap-5 border-b border-black/10 py-3 text-[11px] font-semibold tracking-wide uppercase opacity-60">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> Sécurisé
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5" /> Certifié
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" /> Gratuit
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-8">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="Votre nom *"
              autoComplete="family-name"
              {...register("lastName")}
              className="h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Votre prénom *"
              autoComplete="given-name"
              {...register("firstName")}
              className="h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Votre téléphone *"
            autoComplete="tel"
            {...register("phone")}
            className="h-12 border-black/15 bg-black/[0.03] text-panel-foreground placeholder:opacity-50"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Votre email *"
            autoComplete="email"
            {...register("email")}
            className="h-12 border-black/15 bg-black/[0.03] text-panel-foreground placeholder:opacity-50"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex items-start gap-3 pt-1">
          <Checkbox
            id="consent"
            checked={consentValue}
            onCheckedChange={(checked) => setValue("consent", checked === true)}
            className="mt-0.5 border-black/25 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          />
          <label htmlFor="consent" className="cursor-pointer text-xs leading-relaxed opacity-70">
            J&apos;accepte les conditions générales d&apos;utilisation et d&apos;être recontacté par
            nos partenaires afin de recevoir des informations sur l&apos;Amazon Coin.
          </label>
        </div>
        {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Envoi en cours..."
          ) : (
            <>
              Démarrer mon analyse gratuite <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-[11px] opacity-55">
          <Lock className="h-3 w-3" /> Vos données sont protégées — réponse sous 24h
        </p>
      </form>
    </div>
  );
}
