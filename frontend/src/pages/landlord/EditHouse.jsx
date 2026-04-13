import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import landlordService from "../../api/landlordService";
import LandlordTopbar from "../../components/landlord/Topbar";
import HouseForm from "../../components/landlord/HouseForm";

export default function EditHouse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHouse();
  }, [id]);

  const fetchHouse = async () => {
    try {
      setLoading(true);
      const data = await landlordService.getHouseById(id);
      // Convert images array to comma-separated string for the form
      const formattedData = {
        ...data,
        images: data.images ? data.images.join(", ") : "",
      };
      setHouse(formattedData);
    } catch (error) {
      toast.error(error.message || "Failed to load house details");
      setTimeout(() => navigate("/landlord/houses"), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <LandlordTopbar title="Edit House" />
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!house) {
    return (
      <div>
        <LandlordTopbar title="Edit House" />
        <div className="p-8 text-center">
          <p className="text-gray-600">House not found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LandlordTopbar title="Edit House" />
      <HouseForm mode="edit" initialData={house} />
    </div>
  );
}
