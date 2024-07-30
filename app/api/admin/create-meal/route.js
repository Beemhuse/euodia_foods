// pages/api/meals.js
import client from '../../lib/sanity';
import { isAdmin } from '../../lib/auth';

export async function POST(req) {
  const { title, slug, description, price, category, ingredients, status, sortOrder, image } = await req.json();

  if (!isAdmin(req)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
  }

  try {
    const newMeal = await client.create({
      _type: 'dish',
      title,
      slug,
      description,
      price,
      category: { _type: 'reference', _ref: category },
      ingredients: ingredients.map((id) => ({ _type: 'reference', _ref: id })),
      status,
      sortOrder,
      image,
    });

    return new Response(JSON.stringify({ data: newMeal }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}
