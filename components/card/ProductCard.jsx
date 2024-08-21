import Image from "next/image";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { client } from '@/utils/sanity/client'; // Assuming the client is set up for Sanity
import EditMealModal from "../reusables/modal/EditMealModal";

const ProductCard = ({ product, onEdit, onDelete, categories, mutate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMealModalOpen, setIsEditMealModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    setIsEditMealModalOpen(true);
    setIsMenuOpen(false); // Close menu after selecting edit
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await client.patch(product._id)
        .set({ isActive: false })
        .commit();
      onDelete(product._id); // Update the product list in the parent component
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    } finally {
      setIsLoading(false);
    }
    setIsMenuOpen(false); // Close menu after selecting delete
  };

  return (
    <div className="bg-[#F9FAFB] shadow-md rounded-lg p-4 w-full max-w-sm relative">
      <div className="flex items-center gap-6 justify-between">
        <div className="w-[120px] h-[120px]">
          <Image
            src={product?.image?.asset?.url}
            alt={product.title}
            width={50}
            height={50}
            className="rounded-lg object-cover aspect-square w-full"
          />
        </div>
        <div className="mt-4 space-y-4 flex-grow">
          <h2 className="text-md font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.category.title}</p>
          <p className="text-md font-bold">₦{product.price}</p>
        </div>
        <button
          onClick={toggleMenu}
          className="text-[#374151] p-4 rounded-md bg-[#E5E7EB] hover:text-gray-600 relative"
        >
          <BsThreeDots />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 z-10">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Description</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
    
      {isLoading && <div className="absolute inset-0 bg-white opacity-50 flex items-center justify-center">Loading...</div>}

      <EditMealModal
        isOpen={isEditMealModalOpen}
        onClose={() => setIsEditMealModalOpen(false)}
        // categories={categories}
        meal={product}
        mutate={mutate}
      />
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default ProductCard;
