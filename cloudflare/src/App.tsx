import { Route, Routes } from "react-router-dom";

import Partenaires from "./pages/Partenaires";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import AdstrackSends from "@/pages/AdstrackSends";
import ApiDocs from "@/pages/ApiDocs";
import EmailTemplate from "@/pages/EmailTemplate";
import MentionsLegales from "@/pages/MentionsLegales";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/partenaires" element={<Partenaires />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/adstrack" element={<AdstrackSends />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="/email-template" element={<EmailTemplate />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
