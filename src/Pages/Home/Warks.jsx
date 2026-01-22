import React from "react";

const Warks = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 dark:text-white">
          How ImportExportHub Works
        </h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="border rounded-lg p-6 w-full md:w-72 hover:shadow-md transition">
            <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
            <p className="text-gray-600 text-sm">
              Explore global products with detailed information and ratings.
            </p>
          </div>

          <div className="border rounded-lg p-6 w-full md:w-72 hover:shadow-md transition">
            <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Import or Export</h3>
            <p className="text-gray-600 text-sm">
              Import products or add your own exports easily with one click.
            </p>
          </div>

          <div className="border rounded-lg p-6 w-full md:w-72 hover:shadow-md transition">
            <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Track & Manage</h3>
            <p className="text-gray-600 text-sm">
              Monitor inventory, imports, and exports in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Warks;
