import { useHead } from "@/hooks/useHead";
import { CapRefugeLanding } from "@/components/landing/CapRefugeLanding";

export default function Home() {
  useHead({
    title: "Cap Refuge : investir dans l'or avec un expert",
    description: "Lingots et pièces d'or au cours officiel. Demandez à être rappelé gratuitement par un expert en métaux précieux.",
  });
  return <CapRefugeLanding />;
}
