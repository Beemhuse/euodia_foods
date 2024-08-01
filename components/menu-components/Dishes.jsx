"use client"
import { useState } from 'react';
import Image from 'next/image';
import Button from '../reusables/buttons/Button';

// Dish data
const dish = [
  {
    title: "Spaghetti Carbonara",
    price: "N10,000",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "/meal.png"
  },
  {
    title: "Margherita Pizza",
    price: "N8,000",
    description: "A simple yet delicious pizza topped with tomatoes, mozzarella, and fresh basil.",
    image: "/meal.png"
  },
  {
    title: "Chocolate Cake",
    price: "N10,000",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    image: "/image 32.png"
  },
  {
    title: "Caesar Salad",
    price: "N7,500",
    description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
    image: "/image 32.png"
  },
  {
    title: "Grilled Salmon",
    price: "N6,000",
    description: "Perfectly grilled salmon served with a side of vegetables.",
    image: "/meal.png"
  },
  {
    title: "Beef Tacos",
    price: "N5,000",
    description: "Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.",
    image: "/meal.png"
  },
  {
    title: "Chocolate Cake",
    price: "N10,000",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    image: "/image 32.png"
  },
  {
    title: "Grilled Salmon",
    price: "N6,000",
    description: "Perfectly grilled salmon served with a side of vegetables.",
    image: "/meal.png"
  },
  {
    title: "Chocolate Cake",
    price: "N10,000",
    description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
    image: "/image 32.png"
  }
];

// Modal Component
const DishModal = ({ dish, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full h-full p-6 relative overflow-auto">
        <button className="absolute top-4 right-4 text-3xl font-bold" onClick={onClose}>&times;</button>
        <div className="flex border border-blue-500">

          <div className="relative">
            <Image
              src={dish.image}
              alt={dish.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div>

            <h3 className="text-2xl font-bold mb-2">{dish.title}</h3>
            <p className="text-green-500 text-lg font-bold mb-4">{dish.price}</p>
            <p className="text-gray-600 mb-4">{dish.description}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dishes Component
const Dishes = () => {
  const [selectedDish, setSelectedDish] = useState(null);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseModal = () => {
    setSelectedDish(null);
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {dish.map((dish, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg" onClick={() => handleDishClick(dish)}>
              <div className="relative h-48 mb-4">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{dish.title}</h3>
                <p className="text-green-500 text-lg font-bold">{dish.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 me-8">{dish.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4">Buy Now</button>
                {/* <Button size='small' title='Buy Now' color='accent'/> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedDish && <DishModal dish={selectedDish} onClose={handleCloseModal} />}
    </div>
  );
};

export default Dishes;
