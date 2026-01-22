import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const Banner = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-6">
      <section
        className="
    bg-linear-to-r 
    from-blue-200 to-white 
    dark:from-gray-800 dark:to-gray-900
    py-10 rounded
  "
      >
        {" "}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6 dark:text-white">
              Manage Global Trade <br />
              <span className="text-blue-600">Import & Export</span> Easily
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              ImportExportHub helps you explore global products, manage exports,
              and track imports securely with real-time updates and a clean
              dashboard.
            </p>

            <div className="flex gap-4">
              <a
                href="/all-products"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
              >
                Explore Products
              </a>

              <a
                href="/add-product"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition font-medium"
              >
                Start Exporting
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
              alt="Global Import Export"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-6 dark:text-white">
          Why Choose ImportExportHub?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Secure */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition dark:bg-gray-900">
            <img
              src={
                theme === "dark"
                  ? "https://png.pngtree.com/png-vector/20191010/ourlarge/pngtree-lock-icon-isolated-on-background-png-image_1813449.jpg"
                  : " https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              }
              alt="Secure"
              className="w-14 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Secure Platform
            </h3>
            <p className="text-gray-600 text-sm">
              Your import and export data is protected with modern security
              standards.
            </p>
          </div>

          {/* Global */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition dark:bg-gray-900">
            <img
              src={
                theme == "dark"
                  ? "https://thumbs.dreamstime.com/b/digital-globe-wireless-waves-logo-global-internet-minimal-futuristic-signal-symbolizing-worldwide-communication-401437104.jpg"
                  : "https://cdn-icons-png.flaticon.com/512/921/921439.png"
              }
              alt="Global"
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Global Access
            </h3>
            <p className="text-gray-600 text-sm">
              Explore products from multiple countries with real-time
              availability.
            </p>
          </div>

          {/* Real Time */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition dark:bg-gray-900">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
              alt="Real Time"
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Real-Time Updates
            </h3>
            <p className="text-gray-600 text-sm">
              Inventory and import quantities update instantly across the
              platform.
            </p>
          </div>

          {/* Management */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition dark:bg-gray-900">
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929426.png"
              alt="Management"
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Easy Management
            </h3>
            <p className="text-gray-600 text-sm">
              Manage exports, imports, and products with a simple dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
