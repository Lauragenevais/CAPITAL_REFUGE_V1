import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import ApiDocs from "@/pages/ApiDocs";
import MentionsLegales from "@/pages/MentionsLegales";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
