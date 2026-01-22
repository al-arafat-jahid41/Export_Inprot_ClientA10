import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);

  // Fetch user imports
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://export-import-server-neon.vercel.app/my-imports?email=${user.email}`,
    )
      .then((res) => res.json())
      .then((data) => setImports(data))
      .catch((err) => console.error(err));
  }, [user?.email]);
  const handleDeleteImport = (productId) => {
    Swal.fire({
      title: "Delete Imported Product?",
      text: "This will remove the product from your import list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8", // blue (matches import theme)
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Yes, delete import",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://export-import-server-neon.vercel.app/delete-import/${productId}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Import Deleted!",
                text: "The product has been removed from your imports.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });

              // ✅ Update UI
              const remainingImports = imports.filter(
                (imp) => imp.productId !== productId,
              );
              setImports(remainingImports);
            } else {
              Swal.fire({
                title: "Not Found",
                text: "This import record no longer exists.",
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

  return (
    <>
      <Helmet>
        <title>My Imports | ImportExportHub</title>
        <meta
          name="description"
          content="ImportExportHub – Manage your exports and imports easily"
        />
      </Helmet>
      <div className="overflow-x-auto p-4">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Origin Country</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {imports.length > 0 ? (
              imports.map((imp, index) => (
                <tr key={imp._id}>
                  <td>{index + 1}</td>
                  {/* Product Image */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squirrel h-12 w-12">
                        <img
                          className="rounded-full"
                          src={
                            imp.productImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt={imp.productName}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Product Name */}
                  <td>{imp.productName}</td>

                  {/* Company / Job */}
                  <td>{imp.price || "-"}</td>

                  {/* Origin Country */}
                  <td>
                    {imp.rating ? (
                      <span className="badge badge-warning gap-1">
                        {imp.rating}
                        <FcRating />
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{imp.originCountry}</td>

                  {/* Actions */}
                  <td>
                    <Link
                      to={`/product-details/${imp.productId}`}
                      className="btn  btn-xs badge badge-primary hover:bg-blue-700"
                    >
                      Details
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteImport(imp.productId)}
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
      </div>
    </>
  );
};

export default MyImports;
