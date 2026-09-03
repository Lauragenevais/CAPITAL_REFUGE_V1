# Kit de conversion statique (à utiliser hors Lovable)

Ce dossier ne fait **pas** partie de l'application. Il contient les fichiers
prêts à l'emploi pour convertir le projet en SPA React + Vite 100 % statique,
après export du code sur GitHub.

## Procédure

1. **Exporter** le projet sur GitHub, cloner en local, `npm install`.

2. **Nettoyer les dépendances**

   ```bash
   npm remove @tanstack/react-start @tanstack/react-router @tanstack/router-plugin @lovable.dev/vite-tanstack-config nitro
   npm install react-router-dom
   ```

3. **Copier les fichiers de ce dossier**

   | Fichier ici | Destination |
   | --- | --- |
   | `index.html` | racine du projet |
   | `vite.config.ts` | racine du projet (remplace l'existant) |
   | `main.tsx` | `src/main.tsx` |
   | `App.tsx` | `src/App.tsx` |
   | `useHead.ts` | `src/hooks/useHead.ts` |
   | `.htaccess` | à déposer plus tard dans `httpdocs/` |
   | `package.scripts.json` | reporter les `scripts` dans `package.json` |

4. **Supprimer les fichiers serveur**

   ```bash
   rm -rf src/routes src/router.tsx src/routeTree.gen.ts src/server.ts src/start.ts \
          src/lib/leads.server.ts src/lib/leads.functions.ts src/lib/admin.functions.ts \
          src/lib/error-capture.ts src/lib/error-page.ts \
          src/integrations/supabase/client.server.ts \
          src/integrations/supabase/auth-middleware.ts \
          src/integrations/supabase/auth-attacher.ts
   ```

   Avant de supprimer `src/routes/`, récupérez le contenu de `index.tsx`,
   `mentions-legales.tsx` et `politique-confidentialite.tsx` : ils deviennent
   `src/pages/Home.tsx`, `src/pages/MentionsLegales.tsx`,
   `src/pages/PolitiqueConfidentialite.tsx`.

   `/admin`, `/api-docs` et `/email-template` **restent côté backend** (Lovable) :
   ne les reprenez pas dans le front statique.

5. **Convertir chaque page** — 3 modifications mécaniques :

   ```diff
   - import { createFileRoute, Link } from "@tanstack/react-router";
   + import { Link } from "react-router-dom";
   + import { useHead } from "@/hooks/useHead";

   - export const Route = createFileRoute("/")({
   -   head: () => ({ meta: [{ title: "..." }, { name: "description", content: "..." }] }),
   -   component: HomePage,
   - });
   -
   - function HomePage() {
   + export default function HomePage() {
   +   useHead({ title: "...", description: "..." });
   ```

   Et pour les liens : `<Link to="/x">` devient `<Link to="/x">` (identique) ;
   seul `<Link to="/" hash="formulaire">` devient `<Link to="/#formulaire">`.

   Créez enfin `src/pages/NotFound.tsx` (copie du bloc 404 de l'ancien
   `src/routes/__root.tsx`).

6. **Variables d'environnement** — créer `.env.production` :

   ```
   VITE_API_BASE_URL=https://votre-projet.lovable.app
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...
   ```

7. **Construire et déployer**

   ```bash
   npm run build     # produit dist/index.html + dist/assets/
   npm run preview   # vérification locale
   ```

   Copier par FTP **le contenu** de `dist/` dans `httpdocs/`, ainsi que le
   fichier `.htaccess`.

8. **Côté backend (Lovable)** — publier l'app et renseigner le secret
   `ALLOWED_ORIGINS` avec votre domaine, par ex. :

   ```
   ALLOWED_ORIGINS=https://www.mon-domaine.fr,https://mon-domaine.fr
   ```

## Vérifications finales

- `dist/index.html` existe à la racine de `dist/`
- `dist/assets/` contient les JS/CSS/images
- aucune trace de `@tanstack/react-start`, `nitro` ou `dist/server` après build
- le formulaire envoie bien vers `POST {VITE_API_BASE_URL}/api/public/lead-form`
  et retourne un statut 201
