import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import landlordService from "../../api/landlordService";

export default function HouseForm({ mode = "add", initialData = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      location: "",
      price: "",
      images: "",
      status: "available",
      rooms: "",
      bathrooms: "",
      area: "",
      contactaddress: "",
    },
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || !formData.title.trim())
      newErrors.title = "Title is required";
    if (!formData.description || !formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location || !formData.location.trim())
      newErrors.location = "Location is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.rooms || formData.rooms <= 0)
      newErrors.rooms =
        "Number of rooms is required and must be greater than 0";
    if (!formData.bathrooms || formData.bathrooms <= 0)
      newErrors.bathrooms =
        "Number of bathrooms is required and must be greater than 0";
    if (!formData.area || formData.area <= 0)
      newErrors.area =
        "Area (in sq meters) is required and must be greater than 0";
    if (!formData.contactaddress || !formData.contactaddress.trim())
      newErrors.contactaddress = "Contact address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // Parse images from comma-separated string with safety checks
      const imageString = formData.images || "";
      const images = imageString
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      const payload = {
        title: (formData.title || "").trim(),
        description: (formData.description || "").trim(),
        location: (formData.location || "").trim(),
        price: Number(formData.price || 0),
        images: images.length > 0 ? images : [],
        status: formData.status || "available",
        rooms: Number(formData.rooms || 0),
        bathrooms: Number(formData.bathrooms || 0),
        area: Number(formData.area || 0),
        contactaddress: (formData.contactaddress || "").trim(),
      };

      if (mode === "add") {
        await landlordService.createHouse(payload);
        toast.success("House listing created successfully!");
        navigate("/landlord/houses");
      } else {
        await landlordService.updateHouse(initialData._id, payload);
        toast.success("House listing updated successfully!");
        navigate("/landlord/houses");
      }
    } catch (error) {
      toast.error(error.message || "Failed to save house listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-2xl"
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Beautiful 2-bedroom apartment in downtown"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property in detail..."
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Kigali, Rwanda"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Price (RWF) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 500000"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Rooms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rooms *
          </label>
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            placeholder="e.g., 3"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.rooms ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.rooms && (
            <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>
          )}
        </div>

        {/* Bathrooms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bathrooms *
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="e.g., 2"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.bathrooms ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.bathrooms && (
            <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>
          )}
        </div>

        {/* Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area (in square meters) *
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="e.g., 120"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.area ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area}</p>
          )}
        </div>

        {/* Contact Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Address *
          </label>
          <input
            type="text"
            name="contactaddress"
            value={formData.contactaddress}
            onChange={handleChange}
            placeholder="e.g., P.O. Box 123, Kigali"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.contactaddress ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contactaddress && (
            <p className="text-red-500 text-sm mt-1">{errors.contactaddress}</p>
          )}
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URLs (comma-separated)
          </label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-gray-500 text-xs mt-1">
            Add multiple image URLs separated by commas
          </p>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="available"
                checked={formData.status === "available"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="rented"
                checked={formData.status === "rented"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Rented</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition"
          >
            {loading
              ? "Saving..."
              : mode === "add"
                ? "Create Listing"
                : "Update Listing"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/landlord/houses")}
            disabled={loading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 py-2 rounded-lg font-medium transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
