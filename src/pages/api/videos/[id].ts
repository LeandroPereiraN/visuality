import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const API_KEY = import.meta.env.PEXELS_API_KEY;

  const { id } = params
  const apiUrl = `https://api.pexels.com/v1/videos/videos/${id}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error((error as Error).stack)

    const res = { error: "Server Internal Error" }
    return new Response(JSON.stringify(res), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
