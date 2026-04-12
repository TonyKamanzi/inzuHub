import { Play } from "lucide-react";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function BecomeLandlord() {
  return (
    <div id="becomelandlord">
      <div className="max-w-7xl mx-auto md:my-40 bg-indigo-900 relative md:rounded-2xl p-10">
        <div className="absolute bottom-0 left-0 w-64 h-64  bg-orange-200 rounded-full translate-y-32 -translate-x-16 opacity-40" />
        <div className="absolute -top-15 -right-25 w-64 h-64  bg-gray-100 rounded-full translate-y-0 translate-x-0 opacity-40" />
        <h1 className="text-center text-lg md:text-4xl mt-8 tracking-wider font-bold text-white">
          Own a property? Start earning today.
        </h1>
        <p className="text-center text-lg tracking-wider my-4 text-white ">
          Join thousands of landlords who trust InzuHub to find reliable
          <br />
          <span> tenants and manage their listings with ease.</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Link
            to="/signup"
            className="bg-yellow-300 text-black px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:shadow-2xl transition duration-300   mt-6 flex items-center gap-2 w-full justify-center"
          >
            <IoAdd className="bg-black text-white rounded-full" />
            List Your Property
          </Link>
          <Link
            to="/signup"
            className="bg-black/30 text-taupe-100 px-6 py-3 rounded-full hover:shadow-2xl mt-6 boder flex items-center gap-2 w-full justify-center"
          >
            <Play />
            See How It Works
          </Link>
        </div>
        <div className="flex justify-center items-center p-4 gap-4 mt-6">
          <p className="text-center text-amber-300 text-2xl">
            Free
            <br />
            <span className="text-xs text-gray-300">To list your property</span>
          </p>
          <p className="text-center text-amber-300 text-2xl">
            24/7
            <br />
            <span className="text-xs text-gray-300">
              Average listing approval
            </span>
          </p>
          <p className="text-center text-amber-300 text-2xl">
            650+
            <br />
            <span className="text-xs text-gray-300">Active landlords</span>
          </p>
        </div>
      </div>
    </div>
  );
}
