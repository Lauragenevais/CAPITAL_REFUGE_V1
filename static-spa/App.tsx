// → à copier dans src/App.tsx du projet statique
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/Home";
import MentionsLegalesPage from "@/pages/MentionsLegales";
import PolitiqueConfidentialitePage from "@/pages/PolitiqueConfidentialite";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
