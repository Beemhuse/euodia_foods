"use client"
import HomeLayout from '@/components/layout/HomeLayout'
import Dishes from '@/components/menu-components/Dishes'
import Category from '@/components/reusables/category/page'
import React, { useEffect, useState } from 'react'

const fetchCategories = async () => {
  try {
    const query = ` *[_type == "category" && active == true]{
    _id,
    title,
    description,
    slug,
  }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
export default function page() {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetch("api/admin/category");
      const result = await categories.json()
      setCategories(result);
    }
    getCategories();
  }, []);

  return (
    <HomeLayout>

      <div className='bg-white min-h-screen border border-t-2'>
        <h1 className="text-center font-bold text-4xl text-green-600 mb-5 pt-5">
          Menu
        </h1>
        <div className='container mx-auto'>
          <Category onCategorySelect={setSelectedCategory} categories={categories} />
        </div>
        <Dishes selectedCategory={selectedCategory} />
      </div>
    </HomeLayout>
  )
}
