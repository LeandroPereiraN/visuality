import type { APIContext } from 'astro';

export async function onRequest({ request }: APIContext, next: () => Promise<Response>) {
  const allowedOrigins = (import.meta.env.ALLOWED_ORIGINS || "").split(",");
  const origin = request.headers.get("origin") || "";

  const response = await next();

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}