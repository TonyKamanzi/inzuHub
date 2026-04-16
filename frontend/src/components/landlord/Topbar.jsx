import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function LandlordTopbar({ title }) {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name} 👋</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Link to="/profile" className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}
