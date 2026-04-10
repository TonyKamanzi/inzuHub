import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { getHouseById } from "../../api/Houseapi";
import { MessageCircle } from "lucide-react";
import ChatBox from "../shared/ChatBox";

export default function HouseDetails() {
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true);
      const data = await getHouseById(id);
      setHouse(data);
      setLoading(false);
    };

    fetchHouse();
  }, [id]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex gap-4 items-center justify-center h-64">
        <div className="bg-indigo-500 text-indigo-500 rounded-full h-4 w-4 animate-bounce transition-all " />
        <div className="bg-indigo-500 text-indigo-500 rounded-full h-4 w-4 animate-bounce transition-all " />
        <div className="bg-indigo-500 text-indigo-500 rounded-full h-4 w-4 animate-bounce  transition-all" />
        <div className="text-center  text-indigo-500 ">Loading house details...</div>
      </div>
    );
  }

  // ✅ Safety check
  if (!house) {
    return <p className="text-center mt-10 text-red-500">House not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 🖼️ Image Gallery */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Main Image */}
        <img
          src={house.images?.[0] || "/placeholder-house.jpg"}
          alt={house.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Side Images */}
        <div className="grid grid-cols-2 gap-2">
          {(house.images || []).slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`house-${index}`}
              className="w-full h-36 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* 🏡 Title */}
      <h1 className="text-2xl font-bold mb-2">{house.title}</h1>

      {/* 📍 Location */}
      <p className="text-gray-600 mb-4">
        <IoLocation className="inline-block mr-1 text-indigo-500" />
        {house.location}
      </p>

      {/* 💰 Price */}
      <p className="text-2xl font-bold text-indigo-600 mb-6">
        {house.price?.toLocaleString()} RWF / month
      </p>

      {/* 🏠 Features */}
      <div className="flex gap-6 mb-6 text-gray-700 flex-wrap">
        <span className="flex items-center gap-2">
          <FaBed /> {house.rooms} Beds
        </span>

        <span className="flex items-center gap-2">
          <FaBath /> {house.bathrooms} Baths
        </span>

        <span className="flex items-center gap-2">
          <FaRulerCombined /> {house.area} m²
        </span>
      </div>

      {/* 📝 Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>

        <p className="text-gray-600 leading-relaxed">
          {house.description || "No description available."}
        </p>
      </div>

      {/* 🏷️ Status */}
      <div className="mb-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            house.status === "available"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {house.status === "available" ? "Available" : "Rented"}
        </span>
      </div>

      <div className="mb-6">
        {house.landlord ? (
          <p className="text-gray-600 capitalize">
            Landlord: {house.landlord.name || "Unknown"}
          </p>
        ) : null}
      </div>

      <div>
        {house.contactaddress ? (
          <p className="text-gray-600">
            Contact Address: {house.contactaddress}
          </p>
        ) : null}
      </div>

      {/* 🚀 Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => setOpenChat(true)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with Owner
        </button>

        <button className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-50 transition">
          Book Now
        </button>
      </div>
      {openChat && <ChatBox house={house} onClose={() => setOpenChat(false)} />}
    </div>
  );
}
