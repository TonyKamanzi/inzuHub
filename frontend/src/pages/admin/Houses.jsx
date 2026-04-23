import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, MapPin, DollarSign, User } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Topbar from "../../components/admin/Topbar";
import adminService from "../../api/adminService";
import { HouseCardGridSkeleton } from "../../components/tenant/Loader";

export default function AdminHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllHouses();
      setHouses(data.houses);
    } catch (err) {
      console.error("Failed to fetch houses:", err);
      toast.error("Failed to fetch houses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHouse = async (id, title) => {
    const result = await Swal.fire({
      title: "Delete House?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setDeleting(id);
      await adminService.deleteHouse(id);
      setHouses(houses.filter((h) => h._id !== id));
      toast.success(`"${title}" has been deleted successfully`);
    } catch (err) {
      console.error("Failed to delete house:", err);
      toast.error("Failed to delete house");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Houses Management" />

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <HouseCardGridSkeleton count={6} />
        ) : houses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">No houses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <motion.div
                key={house._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                {/* Image */}
                {house.images && house.images.length > 0 && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={house.images[0]}
                      alt={house.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {house.title}
                  </h3>

                  {/* Info Grid */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>{house.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">Rwf</span>
                      <span className="font-semibold text-gray-900">
                        {house.price?.toLocaleString()} / <span className="text-gray-500">month</span>
                      </span>
                    </div>
                    {house.landlord && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-600" />
                        <span>{house.landlord.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {house.description}
                  </p>

                  {/* Actions */}
                  <button
                    onClick={() => handleDeleteHouse(house._id, house.title)}
                    disabled={deleting === house._id}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
