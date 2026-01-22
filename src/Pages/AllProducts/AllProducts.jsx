import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { Helmet } from "react-helmet-async";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredData = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    fetch("https://export-import-server-neon.vercel.app/all-products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      });
  }, [setProducts]);
  return (
    <>
      <Helmet>
        <title>All Products | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 🔍 Search Bar */}
        <div className="mb-6">
          <p className="font-bold text-xl text-blue-700 mb-1.5">
            Search what you want.
          </p>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
