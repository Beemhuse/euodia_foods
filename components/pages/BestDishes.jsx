"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter'; 

// Modal Component
const DishModal = ({ dish, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-70 flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg w-full max-w-4xl h-auto p-4 sm:p-6 md:p-8 relative flex flex-col md:flex-row">
        <button className="absolute top-4 right-4 text-3xl font-bold text-gray-600" onClick={onClose}>&times;</button>
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
          <Image
            src={dish.image}
            alt={dish.title}
            layout="responsive"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-4 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2">{dish.title}</h3>
            <p className="text-green-500 text-xl font-bold mb-4">{dish.price}</p>
            <p className="text-gray-700 mb-4">{dish.description}</p>
          </div>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            onClick={() => onAddToCart(dish)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Main BestSellerDishes Component
const BestSellerDishes = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [cart, setCart] = useState([]);

  const formatCurrency = useCurrencyFormatter(); // Use the hook

  const bestSellerDishes = [
    {
      title: "Spaghetti Carbonara",
      price: 10000, // Use numerical values
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "/meal.png"
    },
    {
      title: "Margherita Pizza",
      price: 8000, // Use numerical values
      description: "A simple yet delicious pizza topped with tomatoes, mozzarella, and fresh basil.",
      image: "/meal.png"
    },
    {
      title: "Caesar Salad",
      price: 7500, // Use numerical values
      description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
      image: "/image 32.png"
    },
    {
      title: "Grilled Salmon",
      price: 6000, // Use numerical values
      description: "Perfectly grilled salmon served with a side of vegetables.",
      image: "/meal.png"
    },
    {
      title: "Beef Tacos",
      price: 5000, // Use numerical values
      description: "Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.",
      image: "/meal.png"
    },
    {
      title: "Chocolate Cake",
      price: 10000, // Use numerical values
      description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
      image: "/image 32.png"
    }
  ];

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseModal = () => {
    setSelectedDish(null);
  };

  const handleAddToCart = (dish) => {
    setCart([...cart, dish]);
    handleCloseModal();
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }
  };

  return (
    <motion.div
      className="py-12 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Popular Dishes</h2>
        <p className="text-center text-gray-700 mb-8">
          Enjoy our vibrant garden salad, a refreshing choice featuring a blend of crisp lettuce, juicy tomatoes, and your favorite dressing.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellerDishes.map((dish, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleDishClick(dish)}
            >
              <div className="relative h-48 mb-4">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{dish.title}</h3>
                <p className="text-green-500 text-lg font-bold">{formatCurrency(dish.price)}</p> {/* Format price */}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 ">{dish.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </motion.div>
  );
};

export default BestSellerDishes;
