import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Lock, ShieldCheck, BadgeCheck, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiUrl } from "@/lib/api";

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

type LeadFormProps = {
  operation?: "AMAZON" | "CHATGPT" | "NVIDIA" | "PAYPAL" | "GOOGLE" | "LIVRET" | "ROBOT";
  consentLabel?: string;
};

const DEFAULT_CONSENT_LABEL =
  "J'accepte les conditions générales d'utilisation et d'être recontacté par nos partenaires afin de recevoir des informations sur l'Amazon Coin.";

export function LeadForm({ operation, consentLabel }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isGoogle = operation === "GOOGLE";

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
      const response = await fetch(apiUrl("/api/public/lead-form"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone: values.phone,
          consent: true,
          source,
          click_id: clickId,
          operation: operation ?? "AMAZON",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        toast.error(result.message ?? "Une erreur est survenue. Merci de réessayer.");
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
        className={`animate-rise rounded-3xl bg-panel p-10 text-center text-panel-foreground shadow-panel ${isGoogle ? "border-2 border-border" : ""}`}
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold shadow-gold">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold">Votre demande est bien enregistrée</h3>
        <p className={`mt-3 ${isGoogle ? "text-base text-muted-foreground" : "text-sm opacity-70"}`}>
          Un conseiller spécialisé vous rappelle sous 24 heures ouvrées pour valider votre profil
          investisseur.
        </p>
      </div>
    );
  }

  return (
    <div
      id="formulaire"
      className={`animate-rise overflow-hidden rounded-3xl bg-panel text-panel-foreground shadow-panel ${isGoogle ? "border-2 border-border" : ""}`}
    >
      <div className="bg-gold px-6 py-5 text-center text-primary-foreground">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Pré-inscription ouverte
        </p>
        <h2 className="mt-2 text-2xl font-bold">Testez votre éligibilité</h2>
        <p className={`mt-1 text-sm ${isGoogle ? "font-medium" : "opacity-80"}`}>Réponse immédiate, en moins de 60 secondes</p>
      </div>

      <div className={`flex items-center justify-center gap-5 border-b border-black/10 py-3 font-semibold tracking-wide uppercase ${isGoogle ? "text-xs text-panel-foreground" : "text-[11px] opacity-60"}`}>
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="lastName" className={isGoogle ? "mb-1.5 block text-sm font-bold" : "sr-only"}>Nom</label>
            <Input
              id="lastName"
              placeholder="Votre nom *"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              {...register("lastName")}
              className={isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"}
            />
            {errors.lastName && (
              <p id="lastName-error" role="alert" className="mt-1 text-sm font-semibold text-destructive">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="firstName" className={isGoogle ? "mb-1.5 block text-sm font-bold" : "sr-only"}>Prénom</label>
            <Input
              id="firstName"
              placeholder="Votre prénom *"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              {...register("firstName")}
              className={isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"}
            />
            {errors.firstName && (
              <p id="firstName-error" role="alert" className="mt-1 text-sm font-semibold text-destructive">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className={isGoogle ? "mb-1.5 block text-sm font-bold" : "sr-only"}>Téléphone</label>
          <Input
            id="phone"
            type="tel"
            placeholder="Votre téléphone *"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
            className={isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"}
          />
          {errors.phone && <p id="phone-error" role="alert" className="mt-1 text-sm font-semibold text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={isGoogle ? "mb-1.5 block text-sm font-bold" : "sr-only"}>Adresse email</label>
          <Input
            id="email"
            type="email"
            placeholder="Votre email *"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"}
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm font-semibold text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex items-start gap-3 pt-1">
          <Checkbox
            id="consent"
            checked={consentValue}
            onCheckedChange={(checked) => setValue("consent", checked === true)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className={`mt-0.5 border-black/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary ${isGoogle ? "h-6 w-6 border-2" : ""}`}
          />
          <label htmlFor="consent" className={`cursor-pointer leading-relaxed ${isGoogle ? "text-sm font-medium text-panel-foreground" : "text-xs text-black/80"}`}>
            {consentLabel ?? DEFAULT_CONSENT_LABEL}
          </label>
        </div>
        {errors.consent && <p id="consent-error" role="alert" className="text-sm font-semibold text-destructive">{errors.consent.message}</p>}

        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Envoi en cours..."
          ) : (
            <>
              Démarrer mon analyse gratuite <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <p className={`flex items-center justify-center gap-1.5 ${isGoogle ? "text-xs font-medium text-muted-foreground" : "text-[11px] opacity-55"}`}>
          <Lock className="h-3 w-3" /> Vos données sont protégées — réponse sous 24h
        </p>
      </form>
    </div>
  );
}
