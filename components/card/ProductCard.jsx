// components/ProductCard.js
import Image from "next/image";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#F9FAFB] shadow-md rounded-lg p-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <Image
          src={product.image}
          alt={product.title}
          width={50}
          height={50}
          className="rounded-lg"
        />
      <div className="mt-4 space-y-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-lg font-bold ">₦{product.price}</p>
      </div>
      <button className="text-[#374151] p-4 rounded-md bg-[#E5E7EB] hover:text-gray-600">
         <BsThreeDots />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Summary</h3>
        <p className="text-gray-600">{product.summary}</p>
      </div>
      <div className="mt-4 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
        <span className="text-gray-600 font-semibold">Sales</span>
        <span className="flex items-center text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12l5 5L20 7"
            />
          </svg>
          {product.sales}
        </span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
