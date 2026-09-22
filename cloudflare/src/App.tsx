import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Chatgpt from "@/pages/Chatgpt";
import Nvidia from "@/pages/Nvidia";
import Paypal from "@/pages/Paypal";
import Admin from "@/pages/Admin";
import ApiDocs from "@/pages/ApiDocs";
import EmailTemplate from "@/pages/EmailTemplate";
import MentionsLegales from "@/pages/MentionsLegales";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import ChatgptMentionsLegales from "@/pages/ChatgptMentionsLegales";
import ChatgptPolitiqueConfidentialite from "@/pages/ChatgptPolitiqueConfidentialite";
import NvidiaMentionsLegales from "@/pages/NvidiaMentionsLegales";
import NvidiaPolitiqueConfidentialite from "@/pages/NvidiaPolitiqueConfidentialite";
import PaypalMentionsLegales from "@/pages/PaypalMentionsLegales";
import PaypalPolitiqueConfidentialite from "@/pages/PaypalPolitiqueConfidentialite";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatgpt" element={<Chatgpt />} />
      <Route path="/nvidia" element={<Nvidia />} />
      <Route path="/paypal" element={<Paypal />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="/email-template" element={<EmailTemplate />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/mentions-legales-chatgpt" element={<ChatgptMentionsLegales />} />
      <Route path="/politique-confidentialite-chatgpt" element={<ChatgptPolitiqueConfidentialite />} />
      <Route path="/mentions-legales-nvidia" element={<NvidiaMentionsLegales />} />
      <Route path="/politique-confidentialite-nvidia" element={<NvidiaPolitiqueConfidentialite />} />
      <Route path="/mentions-legales-paypal" element={<PaypalMentionsLegales />} />
      <Route path="/politique-confidentialite-paypal" element={<PaypalPolitiqueConfidentialite />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
