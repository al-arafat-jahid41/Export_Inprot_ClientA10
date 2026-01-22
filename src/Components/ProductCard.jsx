import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img
        src={product.productImage || "https://via.placeholder.com/300"}
        alt={product.productName || "Product Name"}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-600">
          {product.productName || "Product Name"}
        </h3>

        {/* Price */}
        <p className="text-blue-500 font-bold">${product.price || 0}</p>

        {/* Origin Country */}
        <p className="text-gray-600 text-sm">
          Origin:{" "}
          <span className="font-medium">{product.originCountry || "N/A"}</span>
        </p>

        {/* Rating */}
        <p className="text-blue-600 font-medium">
          Rating: {product.rating || 0} ★
        </p>

        {/* Available Quantity */}
        <p className="text-gray-600 text-sm">
          Available:{" "}
          <span className="font-medium">{product.availableQuantity || 0}</span>
        </p>

        {/* See Details Button */}
        <Link
          to={`/product-details/${product._id}`}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
