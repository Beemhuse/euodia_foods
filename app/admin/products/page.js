"use client";
import React, { useState, useEffect } from "react";
import CreateMealModal from "@/components/reusables/modal/CreateMealModal";
import ProductCard from "@/components/card/ProductCard";
import Button from "@/components/reusables/buttons/Button";
import Image from "next/image";
import Typography from "@/components/reusables/typography/Typography";
import CreateCategoryModal from "@/components/reusables/modal/CreateCategoryModal";
import { client } from "@/utils/sanity/client";

const products = [
  {
    image: "/meal.png",
    title: "Village Rice",
    category: "Rice",
    price: 5000,
    summary:
      "Our delicious Village Rice is here to take you out on a tasty ride.",
    sales: 5,
  },
  {
    image: "/meal.png",
    title: "Fried Rice",
    category: "Rice",
    price: 4500,
    summary:
      "Our delicious Fried Rice is here to take you out on a tasty ride.",
    sales: 10,
  },
  {
    image: "/meal.png",
    title: "Jollof Rice",
    category: "Rice",
    price: 4000,
    summary:
      "Our delicious Jollof Rice is here to take you out on a tasty ride.",
    sales: 8,
  },
  {
    image: "/Frame 18.png",
    title: "Egusi Soup",
    category: "Soup",
    price: 5500,
    summary:
      "Our delicious Egusi Soup is here to take you out on a tasty ride.",
    sales: 12,
  },
  {
    image: "/01.png",
    title: "Ogbono Soup",
    category: "Soup",
    price: 5000,
    summary:
      "Our delicious Ogbono Soup is here to take you out on a tasty ride.",
    sales: 7,
  },
  {
    image: "/image 25.png",
    title: "Pepper Soup",
    category: "Soup",
    price: 6000,
    summary:
      "Our delicious Pepper Soup is here to take you out on a tasty ride.",
    sales: 9,
  },
];

const fetchCategories = async () => {
  try {
    const query = `*[_type == "category"]`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default function page() {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategory] = useState(null);
  useEffect( ()=>{
async function getCategory(){

  const categories = await fetchCategories();
  setCategory(categories)
}
getCategory()
  }, [])

console.log(categories);

  return (
    <section className="p-4">
      <div className="flex w-full justify-between items-center">
        <div className="">
          <Typography variant="h2" size="lg">
            All Products
          </Typography>

          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    class="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Products
                </a>
              </li>
            
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Flowbite
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <Button
          onClick={() => setIsMealModalOpen(true)}
          title="Add new Product"
          icon={<Image src={"/prod.svg"} height={20} width={20} alt="" />}
        />
      </div>

      <button onClick={() => setIsCategoryModalOpen(true)} className="btn-primary">
        Add Category
      </button>
      <div className="flex my-8 flex-wrap gap-4 items-start justify-start ">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <CreateMealModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        categories={categories}
        ingredients={[]}
      />
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        categories={categories}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </section>
  );
}
