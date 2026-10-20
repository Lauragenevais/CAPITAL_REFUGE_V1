import { useHead } from "@/hooks/useHead";
import { CapRefugeLanding } from "@/components/landing/CapRefugeLanding";

export default function Home() {
  useHead({
    title: "Capital Refuge : investir dans l'or physique avec un expert",
    description: "Lingots et pièces d'or au cours officiel. Un expert Capital Refuge vous rappelle gratuitement sous 24h, sans engagement, pour sécuriser votre épargne.",
    ogTitle: "Capital Refuge : mettez votre épargne à l'abri avec l'or",
    ogDescription: "Rappel gratuit sous 24h par un expert en métaux précieux. Sans engagement.",
    siteName: "Capital Refuge",
  });
  return <CapRefugeLanding />;
}
