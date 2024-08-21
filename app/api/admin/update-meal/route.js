// app/api/admin/update-meal/route.js

import { NextResponse } from 'next/server';
import { client } from '@/utils/sanity/client';
import { isAdmin } from '@/utils/lib/auth';

export async function PUT(req) {

  if (!isAdmin(req.headers)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { id, title, description, price, category, status, image } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Meal ID is required' }, { status: 400 });
    }

    const updatedMeal = {
      title,
      description,
      price: parseFloat(price),  // Ensure the price is a number
      category: {
        _type: 'reference',
        _ref: category,
      },
      status: status === 'true',  // Convert string to boolean
      image: image || {},
    };

    const updatedMealResponse = await client.patch(id).set(updatedMeal).commit();

    return NextResponse.json(updatedMealResponse, { status: 200 });
  } catch (error) {
    console.error('Failed to update meal:', error);
    return NextResponse.json({ error: 'Failed to update meal' }, { status: 500 });
  }
}
