import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetch(
      `https://export-import-server-neon.vercel.app/my-export-products?email=${user?.email}`,
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      });
  }, [user?.email]);

  const handleDeleteExport = (_id) => {
    Swal.fire({
      title: "Delete Export Product?",
      text: "This will remove the product from your Export list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed2",
      cancelButtonColor: "#6b7270",
      confirmButtonText: "Yes, delete Export",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(_id);
        fetch(
          `https://export-import-server-neon.vercel.app/delete-export/${_id}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.acknowledged) {
              Swal.fire({
                title: "Export Deleted!",
                text: "The product has been removed from your imports.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
              });

              // ✅ Update UI
              const remainingImports = products.filter(
                (product) => product._id !== _id,
              );
              setProducts(remainingImports);
            } else {
              Swal.fire({
                title: "Not Found",
                text: "This Export record no longer exists.",
                icon: "info",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete import. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      productName: form.productName.value,
      price: Number(form.price.value),
      rating: Number(form.rating.value),
      originCountry: form.originCountry.value,
      availableQuantity: Number(form.availableQuantity.value),
    };

    fetch(
      `https://export-import-server-neon.vercel.app/updated-export-product/${selectedProduct._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            title: "Your export product is successfully updated 🎉",
            icon: "success",
            draggable: true,
          });
          setIsModalOpen(false);
          const updatedExport = products.map((product) =>
            product._id === selectedProduct._id
              ? { ...product, ...updatedProduct }
              : product,
          );
          setProducts(updatedExport);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>My Exports | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>
      <div className="p-3 md:p-6 overflow-x-auto">
        <table className="table table-zebra min-w-225 md:min-w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Rating</th>
              <th>Country</th>
              <th>Details</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  {/* Product Image */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squirrel h-12 w-12">
                        <img
                          className="rounded-full"
                          src={
                            product.productImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt={product.productName}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Product Name */}
                  <td>{product.productName}</td>

                  {/* Company / Job */}
                  <td>{product.price || "-"}</td>

                  <td>{product.availableQuantity}</td>

                  {/* Origin Country */}
                  <td>
                    {product.rating > 3 ? (
                      <span className="badge badge-success gap-1">
                        {product.rating}
                        <FcRating />
                      </span>
                    ) : (
                      <span className="badge badge-warning ">
                        {product.rating}
                        <FcRating />
                      </span>
                    )}
                  </td>
                  <td>{product.originCountry}</td>

                  {/* Actions */}
                  <td>
                    <Link
                      to={`/product-details/${product._id}`}
                      className="btn  btn-xs badge  badge-info hover:bg-blue-500"
                    >
                      Details
                    </Link>
                  </td>
                  <td>
                    <div
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedProduct(product);
                      }}
                      className="btn badge badge-primary hover:bg-blue-600"
                    >
                      Update
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteExport(product._id)}
                      className="badge badge-error hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No imports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center p-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
              <h3 className="text-lg font-bold mb-4 dark:text-blue-600">
                Update Export Product
              </h3>

              <form onSubmit={handleUpdateSubmit} className="space-y-3">
                {/* Product Name */}
                <div>
                  <label className="label">
                    <span className="label-text dark:text-blue-600">
                      Product Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={selectedProduct.productName}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="label">
                    <span className="label-text dark:text-blue-600">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedProduct.price}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="label">
                    <span className="label-text dark:text-blue-600">
                      Rating
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    defaultValue={selectedProduct.rating}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Origin Country */}
                <div>
                  <label className="label">
                    <span className="label-text dark:text-blue-600">
                      Origin Country
                    </span>
                  </label>
                  <input
                    type="text"
                    name="originCountry"
                    defaultValue={selectedProduct.originCountry}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Available Quantity */}
                <div>
                  <label className="label">
                    <span className="label-text dark:text-blue-600">
                      Available Quantity
                    </span>
                  </label>
                  <input
                    type="number"
                    name="availableQuantity"
                    defaultValue={selectedProduct.availableQuantity}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button type="submit" className="btn btn-primary ">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyExports;
