import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {/* Big 404 */}
      <h1 className="text-7xl font-extrabold text-indigo-500">404</h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Buttons */}

      <button
        onClick={() => window.history.back()}
        className="mt-3 text-indigo-500 underline"
      >
        Go Back
      </button>
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <Link
          to="/"
          className="bg-indigo-500 text-white py-2 px-5 rounded-md hover:bg-indigo-600 transition"
        >
          Go Home
        </Link>

        <Link
          to="/all-houses"
          className="bg-gray-500 text-white py-2 px-5 rounded-md hover:bg-gray-600 transition"
        >
          Browse Houses
        </Link>
      </div>
    </div>
  );
}
