import { createFileRoute } from "@tanstack/react-router";

import { AmazonLanding } from "@/components/landing/AmazonLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cap Refuge : investir et acheter de l'or physique" },
      {
        name: "description",
        content:
          "Lingots, pièces, cours LBMA et fiscalité : un expert Cap Refuge vous accompagne gratuitement pour investir dans l'or.",
      },
      { property: "og:title", content: "Cap Refuge : investir dans l'or sereinement" },
      {
        property: "og:description",
        content:
          "Faites-vous rappeler gratuitement par un expert des métaux précieux pour investir dans l'or.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AmazonLanding,
});
