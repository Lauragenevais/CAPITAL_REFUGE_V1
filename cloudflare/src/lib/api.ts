/**
 * Base d'URL de l'API.
 *
 * - Dans l'application actuelle (front + backend sur le même domaine) : chaîne vide,
 *   les appels sont relatifs et donc same-origin.
 * - Après passage à un front statique hébergé ailleurs (Plesk / OVH / FTP) :
 *   définir VITE_API_BASE_URL avec l'URL publique du backend, par ex.
 *   VITE_API_BASE_URL="https://mon-projet.lovable.app"
 */
export const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] ?? "").replace(/\/+$/, "");

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
