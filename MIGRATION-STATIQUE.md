# Passage à un front statique (Plesk / OVH / FTP) avec backend conservé

Ce document décrit la conversion du projet en **SPA React + Vite 100 % statique**,
tout en **conservant le backend actuel** (base de données, Google Sheet, emails,
espace admin). La conversion elle-même se fait **hors de l'éditeur Lovable**,
après export du code sur GitHub, car l'éditeur impose le framework TanStack Start.

## Pourquoi le backend doit rester serveur

Les traitements suivants manipulent des secrets qui ne doivent **jamais** se
retrouver dans un bundle JavaScript téléchargé par le visiteur :

| Traitement | Secret utilisé |
| --- | --- |
| Écriture Google Sheet | `GOOGLE_SERVICE_ACCOUNT_KEY` |
| Email de notification | `RESEND_API_KEY` |
| Anti-doublon + insertion en base | clé service-role de la base |
| Espace admin `/admin` | `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` |
| API partenaires | `LEADS_API_KEY` |

Le backend reste donc déployé tel quel (déploiement Lovable), et le front statique
l'appelle en HTTP.

## Ce qui a déjà été préparé dans le code

1. **Le formulaire n'utilise plus de fonction serveur.**
   `src/components/landing/LeadForm.tsx` fait un simple `fetch` HTTP.
2. **Nouvel endpoint public sans clé API** : `POST /api/public/lead-form`
   (`src/routes/api/public/lead-form.ts`), avec CORS et liste blanche d'origines.
3. **Base d'URL configurable** : `src/lib/api.ts` expose `apiUrl()`, qui préfixe
   les appels avec `VITE_API_BASE_URL` si la variable est définie.

Conséquence : la partie publique du site (landing, mentions légales, politique de
confidentialité) n'a **plus aucune dépendance serveur**.

## Variables d'environnement à prévoir

Côté **backend** (déploiement Lovable) :

```
ALLOWED_ORIGINS=https://www.mon-domaine.fr,https://mon-domaine.fr
```

Sans cette variable, l'endpoint accepte toutes les origines (`*`). Renseignez-la
dès que le front statique est en ligne.

Côté **front statique**, dans un fichier `.env.production` :

```
VITE_API_BASE_URL=https://mon-projet.lovable.app
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Étapes de conversion (hors Lovable)

1. Exporter le projet sur GitHub, puis cloner en local.
2. Désinstaller `@tanstack/react-start`, `nitro`, `@lovable.dev/vite-tanstack-config`.
3. Installer `vite`, `@vitejs/plugin-react`, `react-router-dom`.
4. Créer `index.html` à la racine avec `<div id="root">` et
   `<script type="module" src="/src/main.tsx">`.
5. Créer `src/main.tsx` qui monte `<App />` dans `#root`, importe `./styles.css`
   et enveloppe l'application dans un `<BrowserRouter>` (ou `<HashRouter>` si
   l'hébergement ne permet pas la réécriture d'URL).
6. Convertir les fichiers de `src/routes/` en composants de page classiques et
   déclarer les routes dans `App.tsx` :
   - `/` → `index.tsx`
   - `/mentions-legales`
   - `/politique-confidentialite`
   - `/api-docs`
   - `/email-template`
   Les métadonnées `head()` deviennent des balises statiques dans `index.html`
   (ou via un petit hook `useEffect` qui met à jour `document.title`).
7. **Supprimer** du projet statique : `src/server.ts`, `src/start.ts`,
   `src/router.tsx`, `src/routeTree.gen.ts`, `src/routes/api/`,
   `src/lib/leads.server.ts`, `src/lib/admin.functions.ts`,
   `src/lib/error-capture.ts`, `src/lib/error-page.ts`,
   `src/integrations/supabase/client.server.ts`,
   `src/integrations/supabase/auth-middleware.ts`,
   `src/integrations/supabase/auth-attacher.ts`.
   Ces fichiers restent dans le dépôt du backend.
8. `vite.config.ts` minimal :

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist" },
});
```

9. `npm run build` produit alors `dist/index.html` + `dist/assets/`.
10. Sur Plesk, copier le contenu de `dist/` dans `httpdocs`, puis ajouter un
    `.htaccess` pour que les routes profondes fonctionnent :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Ce qui reste hébergé côté backend

- `POST /api/public/lead-form` — formulaire de la landing page
- `POST /api/public/leads` — API partenaires (clé `X-API-Key`)
- `/admin` — espace de gestion des leads (nécessite les fonctions serveur)

L'espace admin ne peut pas être rendu statique sans exposer l'accès à la base :
il reste accessible sur l'URL du backend.

## Tracking, UTM et pixels

Le formulaire lit toujours `?clickid=` et `?source=` via `window.location.search`
et les transmet à l'API. Ce comportement est identique en statique. Les scripts
de tracking éventuels se placent dans le `<head>` de `index.html`.
