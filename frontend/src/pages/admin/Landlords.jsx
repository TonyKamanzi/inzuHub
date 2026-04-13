import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Topbar from "../../components/admin/Topbar";
import adminService from "../../api/adminService";

export default function AdminLandlords() {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchPendingLandlords();
  }, []);

  const fetchPendingLandlords = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingLandlords();
      setLandlords(data.landlords);
    } catch (err) {
      console.error("Failed to fetch landlords:", err);
      toast.error("Failed to fetch pending landlords");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, name) => {
    const result = await Swal.fire({
      title: "Approve Landlord?",
      text: `Are you sure you want to approve ${name} as a landlord?`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setProcessing(id);
      await adminService.approveLandlord(id);
      setLandlords(landlords.filter((l) => l._id !== id));
      toast.success(`${name} has been approved as a landlord!`);
    } catch (err) {
      console.error("Failed to approve landlord:", err);
      toast.error("Failed to approve landlord");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id, name) => {
    const result = await Swal.fire({
      title: "Reject Landlord?",
      text: `Are you sure you want to reject ${name}'s landlord application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setProcessing(id);
      await adminService.rejectLandlord(id);
      setLandlords(landlords.filter((l) => l._id !== id));
      toast.success(`${name}'s application has been rejected`);
    } catch (err) {
      console.error("Failed to reject landlord:", err);
      toast.error("Failed to reject landlord");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Landlord Approvals" />

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : landlords.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">
              No pending landlord approvals
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landlords.map((landlord) => (
              <motion.div
                key={landlord._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                    {landlord.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {landlord.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                      Pending
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <p>
                    <strong>Email:</strong> {landlord.email}
                  </p>
                  <p>
                    <strong>Status:</strong> {landlord.status}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(landlord._id, landlord.name)}
                    disabled={processing === landlord._id}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(landlord._id, landlord.name)}
                    disabled={processing === landlord._id}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
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
