import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Warks from "./Warks";
import ActiveSlider from "./ActiveSlider";
import ProductCard from "../../Components/ProductCard";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [products, setProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    fetch("https://export-import-server-neon.vercel.app/limit-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>
      <ActiveSlider></ActiveSlider>
      <Banner></Banner>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
      <Warks></Warks>
    </div>
  );
};

export default Home;
