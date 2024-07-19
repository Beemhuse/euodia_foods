'use client';
import { client } from '@/utils/sanity/client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define async function to fetch content from Sanity
async function getContent() {
  const CONTENT_QUERY = `*[_type == "dish"] {
    ...,
    category->,
    ingredients[]->,
    image {
      ...,
      asset->
    }
  }`;

  const content = await client.fetch(CONTENT_QUERY);
  return content;
}

// Define functional component
export default function Home() {
  const [content, setContent] = useState([]);

  // Fetch content when component mounts
  useEffect(() => {
    getContent().then((data) => {
      setContent(data);
    });
  }, []);

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
      {/* Render fetched content */}
      <div className="grid grid-cols-3 gap-4">
        {content.map((dish) => (
          <div key={dish._id} className="p-4 border border-gray-200 rounded-lg">
            <h2>{dish.title}</h2>
            <p>Category: {dish.category.name}</p>
            <ul>
              {dish.ingredients.map((ingredient) => (
                <li key={ingredient._id}>{ingredient.name}</li>
              ))}
            </ul>
            {dish.image && (
              <Image
                src={dish.image.asset.url}
                alt={dish.title}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
