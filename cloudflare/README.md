# Site statique pour Cloudflare Workers

Version 100 % statique du site Amazon Capital. **Aucun code serveur, aucun secret** :
le formulaire envoie les leads vers le backend Lovable publié
(`https://amazoncapital.lovable.app/api/public/lead-form`, voir `.env.production`).

## Déploiement via Cloudflare Workers Builds (dépôt Git connecté)

Dans les paramètres **Build** du Worker sur Cloudflare :

| Champ | Valeur |
|---|---|
| Root directory | `cloudflare` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Aucune variable d'environnement à configurer côté Cloudflare : l'URL de l'API est
définie dans `.env.production` et intégrée au bundle à la compilation.

`wrangler.jsonc` sert uniquement les assets statiques de `dist/` avec le mode SPA
(`not_found_handling: single-page-application`) pour les liens profonds
(`/mentions-legales`, `/politique-confidentialite`).

## En local

```bash
cd cloudflare
npm install
npm run dev       # développement
npm run build     # produit dist/
npm run preview   # prévisualisation du build
npm run deploy    # build + wrangler deploy (nécessite wrangler login)
```

## Important

- **Ne pas ajouter de secrets ici** : tout ce qui est dans ce dossier part dans le
  bundle JavaScript public. Les traitements sensibles (base de données, Google
  Sheets, emails) restent sur le backend Lovable.
- Si le domaine du site change, ajouter la nouvelle origine au secret
  `ALLOWED_ORIGINS` du backend Lovable (sinon le formulaire renverra
  `403 origin_not_allowed`).
- Les pages `/api-docs` et `/admin` sont incluses. L'administration ne contient
  aucun secret : elle appelle `POST /api/public/admin` sur le backend Lovable
  (mot de passe `ADMIN_PASSWORD` → jeton signé valable 12 h).

