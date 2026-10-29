import { useHead } from "@/hooks/useHead";
import { PartenairesPage } from "@/components/landing/PartenairesPage";

export default function Partenaires() {
  useHead({
    title: "Partenaires Capital Refuge : leads or vérifiés et qualifiés",
    description: "Leads investissement or physique vérifiés par HLR et code SMS, qualifiés par montant et livrés en temps réel.",
    ogTitle: "Capital Refuge Partenaires : des leads or vérifiés",
    ogDescription: "Contrôle opérateur, code SMS, zéro doublon et consentement conforme pour chaque lead.",
    siteName: "Capital Refuge",
  });
  return <PartenairesPage />;
}
