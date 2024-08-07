// components/BestSellerDishes.js
import Image from 'next/image';
import { motion } from 'framer-motion';

const bestSellerDishes = [
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
  }
];

const BestSellerDishes = () => {
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
        <h2 className="text-3xl font-bold text-center mb-5">Best Seller Dishes</h2>
        <p className='text-center text-gray-700 mb-8'>
          Our fresh garden salad is a light and refreshing option. It features a mix of <br />crisp lettuce, juicy tomatoe all tossed in your choice of dressing.
        </p>
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {bestSellerDishes.map((dish, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
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
                <p className="text-green-500 text-lg font-bold">{dish.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 me-8">{dish.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 transition-colors duration-300">
                  Buy Now
                </button>
                {/* <Button size='small' title='Buy Now' color='accent'/> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BestSellerDishes;
