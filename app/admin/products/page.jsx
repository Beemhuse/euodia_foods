"use client";
import React, { useState, useEffect } from "react";
import CreateMealModal from "@/components/reusables/modal/CreateMealModal";
import ProductCard from "@/components/card/ProductCard";
import Button from "@/components/reusables/buttons/Button";
import Image from "next/image";
import Typography from "@/components/reusables/typography/Typography";

const products = [
  {
    image: "/images/village-rice.jpg",
    title: "Village Rice",
    category: "Rice",
    price: 5000,
    summary:
      "Our delicious Village Rice is here to take you out on a tasty ride.",
    sales: 5,
  },
  {
    image: "/images/fried-rice.jpg",
    title: "Fried Rice",
    category: "Rice",
    price: 4500,
    summary:
      "Our delicious Fried Rice is here to take you out on a tasty ride.",
    sales: 10,
  },
  {
    image: "/images/jollof-rice.jpg",
    title: "Jollof Rice",
    category: "Rice",
    price: 4000,
    summary:
      "Our delicious Jollof Rice is here to take you out on a tasty ride.",
    sales: 8,
  },
  {
    image: "/images/egusi-soup.jpg",
    title: "Egusi Soup",
    category: "Soup",
    price: 5500,
    summary:
      "Our delicious Egusi Soup is here to take you out on a tasty ride.",
    sales: 12,
  },
  {
    image: "/images/ogbono-soup.jpg",
    title: "Ogbono Soup",
    category: "Soup",
    price: 5000,
    summary:
      "Our delicious Ogbono Soup is here to take you out on a tasty ride.",
    sales: 7,
  },
  {
    image: "/images/pepper-soup.jpg",
    title: "Pepper Soup",
    category: "Soup",
    price: 6000,
    summary:
      "Our delicious Pepper Soup is here to take you out on a tasty ride.",
    sales: 9,
  },
];

export default function page() {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  return (
    <section className="p-4">
      <div className="flex w-full justify-between items-center">
        <div className="">
          <Typography variant="h2" size="lg">
            All Products
          </Typography>
        </div>
        <Button
          onClick={() => setIsMealModalOpen(true)}
          title="Add new Product"
          icon={<Image src={"/prod.svg"} height={20} width={20} alt="" />}
        />
      </div>

      {/* <button onClick={() => setIsCategoryModalOpen(true)} className="btn-primary">
        Add Category
      </button> */}
      <div className="flex my-8 flex-wrap gap-4 items-start justify-start ">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <CreateMealModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        categories={[]}
        ingredients={[]}
      />
      {/* <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      /> */}
    </section>
  );
}
