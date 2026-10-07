import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Lock, ShieldCheck, BadgeCheck, Sparkles, ArrowRight, Smartphone, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiUrl } from "@/lib/api";

const INVEST_AMOUNTS = ["100 à 500 €", "500 à 2 000 €", "2 000 à 5 000 €", "5 000 € et plus"] as const;

const formSchema = z.object({
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().trim().email("Adresse email invalide"),
  phone: z
    .string()
    .trim()
    .regex(/^0[467]\d{8}$/, "10 chiffres, commençant par 04, 06 ou 07"),
  investAmount: z.enum(INVEST_AMOUNTS, { message: "Merci de sélectionner un montant" }),
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
  badge?: string;
  title?: string;
  subtitle?: string;
  amountQuestion?: string;
  /** Bandeau de réassurance, barre d'étapes, préfixe +33 et micro-texte (Cap Refuge). */
  enhanced?: boolean;
  /** Onglet du Google Sheet (ex. « Or » pour la page d'accueil). */
  sheetTab?: "Or";
};

const DEFAULT_CONSENT_LABEL =
  "J'accepte les conditions générales d'utilisation et d'être recontacté par nos partenaires afin de recevoir des informations sur l'Amazon Coin.";

export function LeadForm({ operation, consentLabel, badge, title, subtitle, amountQuestion, enhanced, sheetTab }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [phoneShown, setPhoneShown] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const isGoogle = operation === "GOOGLE";

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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
          invest_amount: values.investAmount,
          ...(sheetTab ? { sheet_tab: sheetTab } : {}),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        pending_verification?: boolean;
        lead_id?: string;
        sms_sent?: boolean;
      };

      if (!response.ok || !result.ok) {
        toast.error(result.message ?? "Une erreur est survenue. Merci de réessayer.");
        return;
      }

      if (result.pending_verification && result.lead_id) {
        setLeadId(result.lead_id);
        setPhoneShown(values.phone);
        if (result.sms_sent === false) {
          toast.error("L'envoi du SMS a échoué. Cliquez sur « Renvoyer le code ».");
        } else {
          toast.success("Un code vient de vous être envoyé par SMS.");
        }
        return;
      }

      setIsSubmitted(true);
      toast.success("Votre demande a bien été envoyée !");
    } catch (error) {
      console.error("Erreur envoi lead:", error);
      toast.error("Une erreur est survenue. Merci de réessayer.");
    }
  };

  const goToStep2 = async () => {
    const ok = await trigger(["lastName", "firstName", "phone", "email"]);
    if (ok) setStep(2);
  };

  const callVerify = async (body: Record<string, string>) => {
    const response = await fetch(apiUrl("/api/public/lead-verify"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) return;
    if (!/^\d{6}$/.test(code)) {
      toast.error("Le code contient 6 chiffres.");
      return;
    }
    setVerifying(true);
    try {
      const result = await callVerify({ action: "verify", lead_id: leadId, code });
      if (!result.ok) {
        toast.error(result.message ?? "Code incorrect.");
        return;
      }
      setIsSubmitted(true);
      toast.success("Votre numéro est validé !");
    } catch {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setVerifying(false);
    }
  };

  const onResend = async () => {
    if (!leadId) return;
    setVerifying(true);
    try {
      const result = await callVerify({ action: "resend", lead_id: leadId });
      if (result.ok) toast.success("Un nouveau code vous a été envoyé.");
      else toast.error(result.message ?? "Impossible de renvoyer le code.");
    } catch {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setVerifying(false);
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

  if (leadId) {
    return (
      <div
        id="formulaire"
        className={`animate-rise overflow-hidden rounded-3xl bg-panel text-panel-foreground shadow-panel ${isGoogle ? "border-2 border-border" : ""}`}
      >
        <div className="bg-gold px-6 py-5 text-center text-primary-foreground">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
            <Smartphone className="h-3.5 w-3.5" /> Dernière étape
          </p>
          <h2 className="mt-2 text-2xl font-bold">Validez votre numéro</h2>
          <p className="mt-1 text-sm">
            Saisissez le code à 6 chiffres envoyé par SMS au {phoneShown}
          </p>
        </div>
        <form onSubmit={onVerify} className="space-y-4 p-6 md:p-8">
          <label htmlFor="sms-code" className="mb-1.5 block text-sm font-bold">Code reçu par SMS</label>
          <Input
            id="sms-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="h-14 border-2 border-black/30 bg-background text-center text-2xl font-bold tracking-[0.5em] text-panel-foreground"
          />
          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={verifying}>
            {verifying ? "Vérification..." : <>Valider mon code <ArrowRight className="h-5 w-5" /></>}
          </Button>
          <button
            type="button"
            onClick={onResend}
            disabled={verifying}
            className="block w-full text-center text-sm font-semibold underline underline-offset-4 disabled:opacity-50"
          >
            Je n'ai pas reçu le code — Renvoyer le code
          </button>
        </form>
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
          <Sparkles className="h-3.5 w-3.5" /> {badge ?? "Pré-inscription ouverte"}
        </p>
        <h2 className="mt-2 text-2xl font-bold">{title ?? "Testez votre éligibilité"}</h2>
        <p className={`mt-1 text-sm ${isGoogle ? "font-medium" : "opacity-80"}`}>{subtitle ?? "Réponse immédiate, en moins de 60 secondes"}</p>
      </div>

      {enhanced ? (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-b border-black/10 py-3 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Rappel sous 24h</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Sans engagement</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> 100% gratuit</span>
        </div>
      ) : (
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
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-8">
        {enhanced ? (
          <div>
            <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wide">
              <span className={step === 1 ? "" : "opacity-50"}>1. Vos coordonnées</span>
              <span className={step === 2 ? "" : "opacity-50"}>2. Votre projet</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5" aria-label={`Étape ${step} sur 2`}>
              <span className="h-1.5 rounded-full bg-gold" />
              <span className={`h-1.5 rounded-full ${step === 2 ? "bg-gold" : "bg-black/15"}`} />
            </div>
            <p className="mt-2 text-center text-xs opacity-70">
              Étape {step}/2 {step === 1 ? "— plus qu'une question rapide ensuite" : "— dernière question"}
            </p>
          </div>
        ) : (
          <p className="text-center text-xs font-bold tracking-[0.18em] uppercase opacity-70">Étape {step} sur 2</p>
        )}
        <div className={step === 1 ? "space-y-4" : "hidden"}>
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
          <div className="relative">
            {enhanced && (
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center gap-1.5 border-r border-black/20 pr-2.5 text-sm font-semibold">
                <span aria-hidden>🇫🇷</span> +33
              </span>
            )}
            <Input
              id="phone"
              type="tel"
              inputMode={enhanced ? "numeric" : undefined}
              placeholder={enhanced ? "06 12 34 56 78 *" : "Votre téléphone *"}
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone", enhanced ? { setValueAs: (v: string) => (v ?? "").replace(/[\s.-]/g, "") } : undefined)}
              className={`${isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"} ${enhanced ? "pl-[5.5rem]" : ""}`}
            />
          </div>
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

        <Button type="button" variant="hero" size="xl" className="w-full" onClick={goToStep2}>
          Continuer <ArrowRight className="h-5 w-5" />
        </Button>
        </div>

        {step === 2 && (
        <>
        <div>
          <label htmlFor="investAmount" className="block text-base font-bold">
            {amountQuestion ?? "Quel montant envisagez-vous d'investir en cryptomonnaie ?"}
          </label>
          <p className="mt-1 mb-3 text-sm opacity-80">
            Afin de mieux vous orienter vers une solution adaptée à votre projet, merci de sélectionner le montant que vous prévoyez d'investir :
          </p>
          <select
            id="investAmount"
            defaultValue=""
            aria-invalid={Boolean(errors.investAmount)}
            aria-describedby={errors.investAmount ? "investAmount-error" : undefined}
            {...register("investAmount")}
            className={`flex w-full rounded-md border px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isGoogle ? "h-13 border-2 border-input bg-background px-4 text-base text-panel-foreground placeholder:text-muted-foreground" : "h-12 border-black/30 bg-black/[0.07] text-panel-foreground placeholder:text-black/70"}`}
          >
            <option value="" disabled>Sélectionnez un montant *</option>
            {INVEST_AMOUNTS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {errors.investAmount && (
            <p id="investAmount-error" role="alert" className="mt-1 text-sm font-semibold text-destructive">{errors.investAmount.message}</p>
          )}
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
        {enhanced && (
          <p className="text-center text-xs font-medium opacity-75">
            Un conseiller vous rappelle personnellement, aucun robot.
          </p>
        )}
        <button
          type="button"
          onClick={() => setStep(1)}
          className="block w-full text-center text-sm font-semibold underline underline-offset-4"
        >
          Retour à l'étape précédente
        </button>
        </>
        )}

        <p className={`flex items-center justify-center gap-1.5 ${isGoogle ? "text-xs font-medium text-muted-foreground" : "text-[11px] opacity-55"}`}>
          <Lock className="h-3 w-3" /> Vos données sont protégées — réponse sous 24h
        </p>
      </form>
    </div>
  );
}
