import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import ApiDocs from "@/pages/ApiDocs";
import EmailTemplate from "@/pages/EmailTemplate";
import MentionsLegales from "@/pages/MentionsLegales";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="/email-template" element={<EmailTemplate />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
