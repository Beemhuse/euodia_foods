"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { client } from '@/utils/sanity/client';
import { useDispatch } from 'react-redux';
import { addCartItem } from '@/store/reducers/cartReducer';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal Component
const DishModal = ({ dish, onClose, onAddToCart }) => {
  const formatCurrency = useCurrencyFormatter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl p-4 sm:p-6 md:p-8 relative flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-3xl font-bold text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src={dish.image.asset.url}
            alt={dish.title}
            layout="responsive"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{dish.title}</h3>
            <p className="text-green-500 text-xl font-bold mb-4">
            {formatCurrency(dish.price)}
            </p>
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

// Fetch dishes from Sanity
async function getDishes() {
  const query = `*[_type == "dish" && !(_id in path("drafts.*"))] | order(sortOrder asc) {
    _id,
    title,
    slug,
    description,
    price,
    category->{
      title
    },
    image {
      asset->{
        url
      }
    }
  }`;

  const dishes = await client.fetch(query);
  return dishes;
}

// Main BestSellerDishes Component
const BestSellerDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const dispatch = useDispatch();
  const formatCurrency = useCurrencyFormatter();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const fetchedDishes = await getDishes();
        setDishes(fetchedDishes);
      } catch (error) {
        toast.error("Failed to load dishes", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchDishes();
  }, []);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseModal = () => {
    setSelectedDish(null);
  };

  const handleAddToCart = (dish) => {
    dispatch(addCartItem({ dish }));
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          Enjoy our vibrant garden salad, a refreshing choice featuring a blend
          of crisp lettuce, juicy tomatoes, and your favorite dressing.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleDishClick(dish)}
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src={dish.image.asset.url}
                    alt={dish.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{dish.title}</h3>
                  <p className="text-green-500 text-lg font-bold">
                    {formatCurrency(dish.price)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 truncate">{dish.description}</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No dishes available at the moment.</p>
          )}
        </div>
      </div>
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default BestSellerDishes;
