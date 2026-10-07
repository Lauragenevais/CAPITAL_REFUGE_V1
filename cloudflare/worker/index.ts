/**
 * Worker Cloudflare : sert le site statique et relaie les appels /api/* vers le backend.
 * L'adresse du backend n'apparaît jamais côté navigateur.
 */

const BACKEND_ORIGIN = "https://form-sync-guru.lovable.app";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const target = new URL(url.pathname + url.search, BACKEND_ORIGIN);

      const headers = new Headers(request.headers);
      headers.set("host", new URL(BACKEND_ORIGIN).host);
      headers.delete("origin");
      headers.set("x-forwarded-host", url.host);

      const proxied = new Request(target.toString(), {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
        redirect: "manual",
      });

      const response = await fetch(proxied);
      const outHeaders = new Headers(response.headers);
      outHeaders.delete("content-encoding");
      outHeaders.delete("content-length");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: outHeaders,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
