import { createFileRoute } from "@tanstack/react-router";
import { PartenairesPage } from "@/components/landing/PartenairesPage";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires Capital Refuge : leads or vérifiés et qualifiés" },
      { name: "description", content: "Leads investissement or physique vérifiés par HLR et code SMS, qualifiés par montant et livrés en temps réel." },
      { property: "og:title", content: "Capital Refuge Partenaires : des leads or vérifiés" },
      { property: "og:description", content: "Contrôle opérateur, code SMS, zéro doublon et consentement conforme pour chaque lead." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <PartenairesPage />;
}
