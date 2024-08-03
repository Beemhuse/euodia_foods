import { NextResponse } from 'next/server';
import { client } from '@/utils/sanity/client';
import slugify from 'slugify';
import { isAdmin } from '@/utils/lib/auth';

export const config = {
  api: {
    bodyParser: true, // Enable default body parser to parse JSON
  },
};

export async function POST(req) {

  if (!isAdmin(req.headers)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const body = await req.json();
    const { title, description, price, category, status, image  } = body;

    // Ensure title is a string
    const slug = typeof title === 'string' ? slugify(title, { lower: true }) : 'default-slug';

    // Generate sortOrder by finding the highest current sortOrder and adding 1
    const maxSortOrderResult = await client.fetch(`
      *[_type == "dish"] | order(sortOrder desc) [0] {
        sortOrder
      }
    `);
    const sortOrder = (maxSortOrderResult?.sortOrder || 0) + 1;

    // Create new meal entry
    const newMeal = await client.create({
      _type: 'dish',
      title,
      slug,
      description,
      price: Number(price), // Ensure price is a number
      category: { _type: 'reference', _ref: category },
      status,
      sortOrder,
      image
    });
    


    return new NextResponse(JSON.stringify({ data: newMeal }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating meal:', error); // Improved error logging
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
