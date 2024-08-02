// pages/api/categories.js
import {client} from "@/utils/sanity/client";
import { isAdmin } from "@/utils/lib/auth";

export async function POST(req) {
  const { title, description } = await req.json();

  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const newCategory = await client.create({
      _type: "category",
      title,
      description,
    });

    return new Response(JSON.stringify({ data: newCategory }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const categories = await client.fetch(`*[_type == "category"]`);

    return new Response(JSON.stringify({ categories }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
  }
}
