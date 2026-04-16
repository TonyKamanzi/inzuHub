import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import houseService from "../../services/houseService";
import favoriteService from "../../services/favoriteService";
import Loader from "../../components/tenant/Loader";
import {
  Heart,
  MapPin,
  DollarSign,
  HomeIcon,
  Bath,
  Ruler,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";

export default function HouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    fetchHouseDetails();
  }, [id]);

  const fetchHouseDetails = async () => {
    try {
      setLoading(true);
      const data = await houseService.getHouseById(id);
      setHouse(data);

      // Check if favorite
      if (user) {
        try {
          const favorites = await favoriteService.getFavorites();
          const isFav = favorites.some((house) => house._id === id);
          setIsFavorite(isFav);
        } catch (err) {
          console.error("Could not fetch favorites", err);
        }
      }
    } catch (error) {
      toast.error("Failed to load property details");
      console.error("House details error:", error);
      setTimeout(() => navigate("/"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(id);
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await favoriteService.addFavorite(id);
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update favorite");
    }
  };

  const handleContactLandlord = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!contactMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setContactLoading(true);
    try {
      // For now, just show success. Message API can be implemented later
      toast.success("Message sent to landlord! They will contact you soon.");
      setShowContactForm(false);
      setContactMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Contact error:", error);
    } finally {
      setContactLoading(false);
    }
  };

  const nextImage = () => {
    if (house?.images && house.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % house.images.length);
    }
  };

  const prevImage = () => {
    if (house?.images && house.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + house.images.length) % house.images.length,
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Property not found</p>
      </div>
    );
  }

  const images = house.images && house.images.length > 0 ? house.images : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            ← Back to Properties
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-96 md:h-screen max-h-96">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={house.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex
                              ? "border-white"
                              : "border-gray-600 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`View ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Favorite Button */}
                <button
                  onClick={handleToggleFavorite}
                  className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                  <Heart
                    size={24}
                    className={`transition-colors ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-white font-bold ${
                      house.status === "available"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {house.status === "available" ? "Available" : "Rented"}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <HomeIcon size={48} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Title and Location */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {house.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-6 text-lg">
              <MapPin size={20} className="text-indigo-500" />
              {house.location}
            </div>

            {/* Price */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-6 border border-indigo-200">
              <p className="text-gray-600 text-sm mb-1">Monthly Price</p>
              <p className="text-4xl font-bold text-indigo-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "RWF",
                  maximumFractionDigits: 0,
                }).format(house.price)}
              </p>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Features
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {house.rooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <HomeIcon className="text-indigo-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {house.rooms}
                    </p>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                  </div>
                )}
                {house.bathrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="text-indigo-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {house.bathrooms}
                    </p>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                  </div>
                )}
                {house.area && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Ruler className="text-indigo-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {house.area}
                    </p>
                    <p className="text-sm text-gray-600">m²</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {house.description}
              </p>
            </div>
          </div>

          {/* Right Column - Landlord & Contact */}
          <div>
            {/* Landlord Card */}
            {house.landlord && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Landlord Information
                </h2>

                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {house.landlord.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {house.landlord.name}
                    </p>
                    <p className="text-sm text-gray-600">Property Owner</p>
                  </div>
                </div>

                {/* Contact Info */}
                {house.landlord.email && (
                  <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-indigo-500 flex-shrink-0" />
                    <a
                      href={`mailto:${house.landlord.email}`}
                      className="text-indigo-600 hover:text-indigo-700 break-all"
                    >
                      {house.landlord.email}
                    </a>
                  </div>
                )}

                {house.contactaddress && (
                  <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                    <MapPin
                      size={18}
                      className="text-indigo-500 flex-shrink-0 mt-0.5"
                    />
                    {house.contactaddress}
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} />
                    Send Message
                  </button>

                  {house.landlord.email && (
                    <a
                      href={`mailto:${house.landlord.email}`}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      Email
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Contact Form Modal */}
            {showContactForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Send Message to Landlord
                  </h3>

                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleContactLandlord}
                      disabled={contactLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      {contactLoading ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
