export const CLARITY_PROJECT_ID = "z5cc4zgs3q";
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global { interface Window { clarity?: ClarityFn } }

/** Charge Microsoft Clarity une fois (à appeler depuis useEffect) et tague la visite avec la source / click ID. */
export function loadClarity() {
  if (typeof window === "undefined" || window.clarity || document.getElementById("clarity-script")) return;
  const fn: ClarityFn = (...args) => { (fn.q = fn.q || []).push(args); };
  window.clarity = fn;
  const s = document.createElement("script");
  s.id = "clarity-script"; s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(s);
  const p = new URLSearchParams(window.location.search);
  for (const k of ["source", "clickid", "click_id"]) {
    const v = p.get(k);
    if (v) fn("set", k === "clickid" ? "click_id" : k, v);
  }
  if (!p.get("source")) fn("set", "source", "direct");
}

/** Identifie la session Clarity avec l'email du lead ; renvoie cet identifiant ("" si Clarity absent). */
export function identifyLead(email: string, name: string, tags: Record<string, string | undefined>): string {
  if (typeof window === "undefined" || !window.clarity) return "";
  const id = email.trim().toLowerCase();
  window.clarity("identify", id, undefined, undefined, name);
  window.clarity("set", "lead_email", id);
  Object.entries(tags).forEach(([k, v]) => v && window.clarity!("set", k, v));
  window.clarity("upgrade", "lead");
  return id;
}

export const clarityReplayUrl = () => `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/recordings`;
