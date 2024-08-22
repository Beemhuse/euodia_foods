"use client"
import HomeLayout from '@/components/layout/HomeLayout';
import Dishes from '@/components/menu-components/Dishes';
import Category from '@/components/reusables/category/page';
import React, { useEffect, useState } from 'react';

const fetchCategories = async () => {
  try {
    const query = `*[_type == "category" && active == true]{
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

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("api/admin/category");
        const result = await response.json();
        setCategories(result);

        // Automatically select the first category on load and fetch its dishes
        if (result.length > 0) {
          const firstCategory = result[0];
          setSelectedCategory(firstCategory._id);
          fetchDishes(firstCategory._id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    getCategories();
  }, []);

  const fetchDishes = async (categoryId) => {
    try {
      const response = await fetch(`api/admin/dishes?category=${categoryId}`);
      const result = await response.json();
      setDishes(result);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setDishes([]); // Clear dishes if there's an error
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchDishes(categoryId);
  };

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
