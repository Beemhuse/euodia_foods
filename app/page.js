'use client';
import { client } from '@/utils/sanity/client';
import Hero from "@/components/pages/Hero.jsx"
import { useState, useEffect } from 'react';
import Features from '@/components/pages/Features';
import Qualities from '@/components/pages/Qualities';
import BestSellerDishes from '@/components/pages/BestDishes';
import HomeLayout from '@/components/layout/HomeLayout';


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
    <HomeLayout>

      <section className="min-h-screen ">
        <Hero />
        <BestSellerDishes />
        <Features />
        <Qualities />

        {/* Render fetched content */}
        {/* <div className="grid grid-cols-3 gap-4">
{content.map((dish) => (
  <div key={dish._id} className="p-4 border border-gray-200 rounded-lg">
    <h2>{dish.title}</h2>
    <p>Category: {dish.category.title}</p>
    <ul>
      
      {dish?.ingredients && dish?.ingredients?.map((ingredient) => (
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
</div> */}

      </section>
    </HomeLayout>
  );
}


