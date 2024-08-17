import Image from "next/image";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { client } from '@/utils/sanity/client'; // Assuming the client is set up for Sanity

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
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

  const saveEdit = async () => {
    setIsLoading(true);
    try {
      const updatedProduct = await client.patch(product._id)
        .set({ title: newTitle, description: description, price })
        .commit();

      onEdit(updatedProduct); // Update the product list in the parent component
      alert("Product updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] shadow-md rounded-lg p-4 w-full max-w-sm relative">
      <div className="flex items-center gap-6 justify-between">
        <div className="w-[120px] h-[120px]">
          <Image
            src={product.image.asset.url}
            alt={product.title}
            width={50}
            height={50}
            className="rounded-lg object-cover aspect-square w-full"
          />
        </div>
        <div className="mt-4 space-y-4 flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-md font-semibold p-2 border rounded"
            />
          ) : (
            <h2 className="text-md font-semibold">{product.title}</h2>
          )}
          <p className="text-gray-600">{product.category.title}</p>
          {isEditing ? (
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-md font-semibold p-2 border rounded"
            />
          ) : (
          <p className="text-md font-bold">₦{product.price}</p>
          )}
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
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-600 p-2 border rounded w-full"
          />
        ) : (
          <p className="text-gray-600">{product.description}</p>
        )}
      </div>
    
      {isEditing && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={saveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      )}
      {isLoading && <div className="absolute inset-0 bg-white opacity-50 flex items-center justify-center">Loading...</div>}
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
    summary: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
