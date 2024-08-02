import { NextResponse } from 'next/server';
import { client } from '@/utils/sanity/client'; // Adjust the import path if necessary
import { isAdmin } from '@/utils/lib/auth';
import FormData from 'form-data';

export async function POST(req) {
  const formData = new FormData();
  const file = req.body; // Assuming the image is sent as the body

  formData.append('file', file);

  // Upload image to Sanity
  try {
    const response = await fetch('https://8bms2xqg.api.sanity.io/v1/assets/images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`, // Use environment variable for token
      },
      body: formData,
    });

    console.log(response )
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const imageData = await response.json();
    const imageUrl = imageData.asset.url; // Adjust according to response structure

    // Handle other form data and save meal details
    const { title, description, price, category, status } = await req.json();
    await client.create({
      _type: 'meal',
      title,
      description,
      price,
      category,
      status,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageData.asset._id,
        },
      },
    });

    return new NextResponse(JSON.stringify({ message: 'Meal created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
