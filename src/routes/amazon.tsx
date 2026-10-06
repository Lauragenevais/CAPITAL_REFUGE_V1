import { createFileRoute } from "@tanstack/react-router";

import { AmazonLanding } from "@/components/landing/AmazonLanding";

export const Route = createFileRoute("/amazon")({
  head: () => ({
    meta: [
      { title: "Amazon Coin : vérifiez votre éligibilité avant le lancement" },
      {
        name: "description",
        content:
          "L'Amazon Coin arrive. Vérifiez votre éligibilité en 60 secondes et positionnez-vous avant le grand public avec l'accompagnement d'un conseiller crypto.",
      },
      { property: "og:title", content: "Amazon Coin : prenez position avant le lancement" },
      {
        property: "og:description",
        content:
          "Analyse gratuite en 60 secondes : découvrez si votre profil est éligible au programme de pré-inscription Amazon Coin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AmazonLanding,
});
