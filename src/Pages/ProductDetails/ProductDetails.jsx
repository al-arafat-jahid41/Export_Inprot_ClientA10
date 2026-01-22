import { useLoaderData, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [importQty, setImportQty] = useState(1);
  const [massage, setMassage] = useState();
  const [productData, setProductData] = useState(product);

  const isInvalidQty = importQty < 1 || importQty > product.availableQuantity;
  // console.log(user);

  const handleImport = () => {
    // 🔴 Backend PATCH call will go here
    const importedData = {
      productId: product._id,
      email: user.email,
      id: product.id,
      productImage: product.productImage,
      productName: product.productName,
      price: product.price,
      rating: product.rating,
      originCountry: product.originCountry,
      importQuantity: importQty,
      importedAt: new Date(),
    };

    fetch(`https://export-import-server-neon.vercel.app/add-import`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(importedData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Imported Record Added:", data);
        if (data.message === true) {
          Swal.fire({
            icon: "warning",
            title: "Already Imported",
            text: "You have already imported this product.",
          });
          setMassage(true);
          document.getElementById("import_modal").close();
          return;
          // } else if (data.acknowledged === true) {
        } else {
          document.getElementById("import_modal").close();
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Product imported successfully!",
          });
          //   .catch((err) => {
          //     Swal.fire({
          //       icon: "error",
          //       title: "Error",
          //       text: "Something went wrong!",
          //     });
          //     console.error(err);
          //   });
          fetch(
            `https://export-import-server-neon.vercel.app/updated-product/${product._id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ importQuantity: importQty }),
            },
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log("PATCH Response:", data);
              if (data.modifiedCount > 0 && massage !== true) {
                const availableQuantity = (product.availableQuantity -=
                  importQty);
                setProductData({ ...productData, availableQuantity });
                document.getElementById("import_modal").close();
                toast.success("Product Updated in UI successfully!🎉");
                navigate("/my-imports");
                return;
              }
              document.getElementById("import_modal").close();
            });
        }
      });
    // console.log("Import Quantity:", importQty);
  };

  return (
    <>
      <Helmet>
        <title>Product Details | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10 relative">
        <div className="bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-8 dark:bg-gray-800">
          {/* Product Image */}
          <img
            src={productData.productImage}
            alt={productData.productName}
            className="w-full h-80 object-cover rounded-lg"
          />

          {/* Product Info */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {productData.productName}
            </h2>

            <p className="text-blue-600 font-semibold text-xl">
              Price: ${productData.price}
            </p>

            <p>
              <span className="font-semibold">Origin Country:</span>{" "}
              {productData.originCountry}
            </p>

            <p>
              <span className="font-semibold">Rating:</span>{" "}
              <span className="text-green-500">{productData.rating} ★</span>
            </p>

            <p>
              <span className="font-semibold">Available Quantity:</span>{" "}
              {productData.availableQuantity}
            </p>

            <p className="text-sm text-gray-500">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(productData.created_At).toLocaleDateString()}
            </p>

            {/* Import Button */}
            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-blue-700 active:scale-95 transition duration-300"
              onClick={() =>
                document.getElementById("import_modal").showModal()
              }
            >
              Import Now
            </button>
          </div>
        </div>
        {/* Import Modal */}
        <dialog
          id="import_modal"
          className="absolute top-30 left-1/2 -translate-x-1/2 rounded-lg border-0 p-0 max-w-full"
        >
          <div className="bg-white p-10  shadow-xl w-full max-w-lg dark:bg-gray-800">
            {/* Modal Header */}
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center dark:text-blue-700">
              Import Product
            </h3>

            {/* Product Name */}
            <label className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productData.productName}
              readOnly
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-100 dark:text-blue-800"
            />

            {/* Product Price */}
            <label className="block text-sm font-medium mb-1">
              Product Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={productData.price}
              readOnly
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-100 dark:text-blue-800"
            />

            {/* Origin Country */}
            <label className="block text-sm font-medium mb-1">
              Origin Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productData.originCountry}
              readOnly
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-100 dark:text-blue-800"
            />

            {/* Quantity Input */}
            <label className="block text-sm font-medium mb-1 mt-2">
              Enter Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max={productData.availableQuantity}
              value={importQty}
              onChange={(e) => setImportQty(Number(e.target.value))}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />

            {/* Warning for invalid quantity */}
            {isInvalidQty && (
              <p className="text-red-500 text-sm mb-2">
                Quantity must be between 1 and {productData.availableQuantity}
              </p>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => document.getElementById("import_modal").close()}
                className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isInvalidQty}
                className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
                  isInvalidQty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Import
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ProductDetails;
