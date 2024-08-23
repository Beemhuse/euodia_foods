"use client";
import HomeLayout from '@/components/layout/HomeLayout';
import Dishes from '@/components/menu-components/Dishes';
import Category from '@/components/reusables/category/page';
import React, { useEffect, useState } from 'react';
import { client } from '@/utils/sanity/client';

export default function Page() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getDishes() {
      try {
        const query = `*[_type == "dish" && !(_id in path("drafts.*"))] | order(sortOrder asc) {
          _id,
          title,
          description,
          price,
          category->{
            _id,
            title,
          },
          image {
            asset->{
              url
            }
          }
        }`;
        const result = await client.fetch(query);

        setDishes(result);

        // Extract unique categories from the fetched dishes
        const uniqueCategories = [...new Set(result.map(dish => dish.category))];
        setCategories(uniqueCategories);

        // Automatically select the first category on load
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0].title);
        }
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }
    getDishes();
  }, []);

  const handleCategorySelect = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };
console.log(categories)
  return (
    <HomeLayout>
      <div className='bg-white min-h-screen border border-t-2'>
        <h1 className="text-center font-bold text-4xl text-green-600 mb-5 pt-5">
          Menu
        </h1>
        <div className='container mx-auto'>
          <Category onCategorySelect={handleCategorySelect} categories={categories} />
        </div>
        <Dishes selectedCategory={selectedCategory} dishes={dishes} />
      </div>
    </HomeLayout>
  );
}
