import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import landlordService from "../../api/landlordService";
import LandlordTopbar from "../../components/landlord/Topbar";
import { HouseCardGridSkeleton } from "../../components/tenant/Loader";

export default function Houses() {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const data = await landlordService.getMyHouses();
      setHouses(data);
    } catch (error) {
      toast.error(error.message || "Failed to load houses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (houseId, houseTitle) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete House?",
      text: `Are you sure you want to delete "${houseTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      try {
        await landlordService.deleteHouse(houseId);
        setHouses(houses.filter((h) => h._id !== houseId));
        toast.success(`"${houseTitle}" has been deleted successfully`);
      } catch (error) {
        toast.error(error.message || "Failed to delete house");
      }
    }
  };

  return (
    <div>
      <LandlordTopbar title="My Houses" />
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Houses</h1>
            <p className="text-gray-600 mt-2">
              Manage and oversee all your properties
            </p>
          </div>
          <button
            onClick={() => navigate("/landlord/add-house")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span>➕</span> Add New House
          </button>
        </div>

        {/* Houses Grid */}
        {loading ? (
         <HouseCardGridSkeleton/>
        ) : houses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <div
                key={house._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-300 overflow-hidden">
                  {house.images && house.images.length > 0 ? (
                    <img
                      src={house.images[0]}
                      alt={house.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl bg-gray-200">
                      🏠
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        house.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {house.status === "available" ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {house.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 truncate">
                    📍 {house.location}
                  </p>
                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                    {house.description}
                  </p>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-indigo-600">
                      Rwf{house.price}
                    </span>
                    <span className="text-gray-600 text-sm">/month</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/landlord/edit-house/${house._id}`)
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <Edit size={18} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(house._id, house.title)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No houses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add your first property to get started managing your listings.
            </p>
            <button
              onClick={() => navigate("/landlord/add-house")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Add Your First House
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
