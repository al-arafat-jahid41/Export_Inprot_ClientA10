import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-700">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <span className="loading loading-spinner loading-lg text-blue-600"></span>

        {/* Text */}
        <p className="text-gray-600 text-sm font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
