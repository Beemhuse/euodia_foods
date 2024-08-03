import { createClient } from '@sanity/client';
import multiparty from 'multiparty';
import fs from 'fs';
import { NextResponse } from 'next/server';
import {client} from "@/utils/sanity/client";

// Sanity client configuration

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to use multiparty
  },
};

export async function POST(req) {
  const form = new multiparty.Form();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return resolve(new NextResponse(JSON.stringify({ error: 'Form parsing error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }));
      }

      const { title, description, price, category, status } = fields;
      const imageFile = files.image[0]; // Adjust based on how files are parsed

      if (!imageFile) {
        console.error('No file uploaded');
        return resolve(new NextResponse(JSON.stringify({ error: 'No file uploaded' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }));
      }

      try {
        // Ensure title is a string
        const slug = typeof title === 'string' ? slugify(title, { lower: true }) : 'default-slug';

        // Generate sortOrder by finding the highest current sortOrder and adding 1
        const maxSortOrderResult = await client.fetch(`
          *[_type == "dish"] | order(sortOrder desc) [0] {
            sortOrder
          }
        `);
        const sortOrder = (maxSortOrderResult?.sortOrder || 0) + 1;

        // Read the image file buffer
        const imageBuffer = fs.readFileSync(imageFile.path);

        // Upload image to Sanity
        const uploadedImage = await client.assets.upload('image', imageBuffer, {
          filename: imageFile.originalFilename,
        });

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
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
          },
        });

        return resolve(new NextResponse(JSON.stringify({ data: newMeal }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }));
      } catch (error) {
        console.error('Error creating meal:', error); // Improved error logging
        return resolve(new NextResponse(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }));
      }
    });
  });
}
