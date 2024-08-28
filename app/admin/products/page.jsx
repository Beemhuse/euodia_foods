"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import CreateMealModal from "@/components/reusables/modal/CreateMealModal";
import ProductCard from "@/components/card/ProductCard";
import Button from "@/components/reusables/buttons/Button";
import Image from "next/image";
import Typography from "@/components/reusables/typography/Typography";
import CreateCategoryModal from "@/components/reusables/modal/CreateCategoryModal";
import { client } from "@/utils/sanity/client";
import EditMealModal from "@/components/reusables/modal/EditMealModal";

// Fetch function for SWR
const fetcher = async (query) => {
  return await client.fetch(query);
};

// Fetch categories using SWR
const useCategories = () => {
  const { data, error } = useSWR(`*[_type == "category"]`, fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Fetch products using SWR
const useProducts = () => {
  const { data, error, mutate } = useSWR(
    `*[_type == "dish" && status == true && !(_id in path("drafts.*"))] | order(sortOrder asc) {
      _id,
      title,
      slug,
      description,
      price,
      category->{
        title
      },
      status,
      sortOrder,
      image {
        asset->{
          url
        }
      }
    }`,
    fetcher
  );
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};

export default function Page() {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { categories, isLoading: categoriesLoading, isError: categoriesError } = useCategories();
  const { products, isLoading: productsLoading, isError: productsError, mutate } = useProducts();



  // if (productsLoading ) return <div>Loading...</div>;
  // if (productsError ) return <div>Error loading data</div>;
console.log("products ==>>>>>", products)
  return (
    <section className="p-4">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mb-6">
        <div className="mb-4 md:mb-0">
          <Typography variant="h2" size="lg">
            All Products
          </Typography>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
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
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsMealModalOpen(true)}
            title="Add new Product"
            icon={<Image src={"/prod.svg"} height={20} width={20} alt="" />}
          />
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
            title="Add Category"
            icon={<Image src={"/category.svg"} height={20} width={20} alt="" />}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          mutate={mutate}
        />
      ))}
      </div>

      <CreateMealModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        categories={categories}
        ingredients={[]}
        mutate={mutate}
      />
     
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </section>
  );
}
