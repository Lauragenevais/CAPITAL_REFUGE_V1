import { createFileRoute } from "@tanstack/react-router";

import { CapRefugeLanding } from "@/components/landing/CapRefugeLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Refuge : investir dans l'or physique avec un expert" },
      {
        name: "description",
        content:
          "Lingots et pièces d'or au cours officiel. Un expert Capital Refuge vous rappelle gratuitement sous 24h, sans engagement, pour sécuriser votre épargne.",
      },
      { property: "og:title", content: "Capital Refuge : mettez votre épargne à l'abri avec l'or" },
      {
        property: "og:description",
        content:
          "Rappel gratuit sous 24h par un expert en métaux précieux. Sans engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CapRefugeLanding,
});
