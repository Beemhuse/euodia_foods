'use client';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/reusables/buttons/Button';
import { client } from '@/utils/sanity/client';
import Image from 'next/image';
import Hero from "@/components/pages/Hero.jsx"
import { useState, useEffect } from 'react';
import Features from '@/components/pages/Features';
import Qualities from '@/components/pages/Qualities';
import BestSellerDishes from '@/components/pages/BestDishes';

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
console.log(content);
  
  return (
    <main className="min-h-screen border-2 border-green-500">
      <Hero/>
      <Features/>
      <Qualities/>
      <BestSellerDishes/>
      {/* <Button title='hello' color='accent' /> */}
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
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
