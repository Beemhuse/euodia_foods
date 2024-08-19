"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/utils/sanity/client';
import { addCartItem } from '@/store/reducers/cartReducer';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';

// Modal Component
const DishModal = ({ dish, onClose, onAddToCart }) => {
  const formatCurrency = useCurrencyFormatter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-70">
      <div className="bg-white rounded-lg w-full max-w-4xl h-auto p-4 sm:p-6 md:p-8 relative">
        <button className="absolute top-4 right-4 text-3xl font-bold text-gray-600" onClick={onClose}>&times;</button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <Image
              src={dish.image.asset.url}
              alt={dish.title}
              layout="responsive"
              width={500}
              height={500}
              className="rounded-lg max-w-full max-h-96 object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4 flex flex-col justify-between max-h-96 overflow-y-auto">
            <div>
              <h3 className="text-3xl font-bold mb-2">{dish.title}</h3>
              <p className="text-green-500 text-xl font-bold mb-4">{formatCurrency(dish.price)}</p>
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
    </div>
  );
};

async function getContent() {
  const query = `*[_type == "dish" && !(_id in path("drafts.*"))] | order(sortOrder asc) {
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
  }`;

  const content = await client.fetch(query);
  return content;
}

// Main Dishes Component
// Main Dishes Component
const Dishes = ({ selectedCategory }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const dispatch = useDispatch();
  const formatCurrency = useCurrencyFormatter();

  const handleAddToCart = (dish) => {
    try {
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
    } catch (err) {
      toast.error(err.message || "Failed to add item to cart", {
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

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const fetchedDishes = await getContent();
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

  // Filter dishes based on the selected category, fallback to empty array if dishes is undefined or null
  const filteredDishes = dishes?.filter((dish) =>
    dish?.category?.title === selectedCategory
  ) || [];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleDishClick(dish)}
              >
                <div className="relative h-48 mb-4 border-3 border-green-600">
                  <Image
                    src={dish.image.asset.url}
                    alt={dish.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{dish.title}</h3>
                  <p className="text-green-500 text-lg font-bold">{formatCurrency(dish.price)}</p>
                </div>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No dishes available in this category.</p>
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
    </div>
  );
};

export default Dishes;
