import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const [productLength, setProductLength] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://export-import-server-neon.vercel.app/all-products")
      .then((res) => res.json())
      .then((data) => {
        setProductLength(data.length);
      });
  }, []);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newProduct = {
      email: user.email,
      id: Number(productLength + 1),
      productName: form.productName.value,
      productImage: form.productImage.value,
      price: Number(form.price.value),
      originCountry: form.originCountry.value,
      rating: Number(form.rating.value),
      availableQuantity: Number(form.availableQuantity.value),
      createdAt: new Date(),
    };

    fetch("https://export-import-server-neon.vercel.app/posted-product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Your product imported successfully 🎉",
            icon: "success",
          });
          navigate("/my-exports");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Add Exports | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>

      {/* 🔥 Dark-mode enabled form */}
      <form
        onSubmit={handleProductSubmit}
        className="
          max-w-xl mx-auto 
          bg-white dark:bg-gray-900   /* ✅ background */
          p-6 rounded-lg shadow-md 
          space-y-4
        "
      >
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            className="
              w-full border 
              bg-white dark:bg-gray-800     /* ✅ input bg */
              text-gray-800 dark:text-gray-100 /* ✅ text */
              border-gray-300 dark:border-gray-700 /* ✅ border */
              px-3 py-2 rounded
            "
            required
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Product Image (URL)
          </label>
          <input
            type="text"
            name="productImage"
            className="w-full border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="w-full border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            required
          />
        </div>

        {/* Origin Country */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Origin Country
          </label>
          <input
            type="text"
            name="originCountry"
            className="w-full border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            max="5"
            name="rating"
            className="w-full border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Available Quantity
          </label>
          <input
            type="number"
            name="availableQuantity"
            className="w-full border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full bg-blue-600 text-white py-2 rounded 
            hover:bg-blue-700 transition
          "
        >
          Add Export / Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
