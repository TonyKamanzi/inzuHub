import React, { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("tenant");

  return (
    <div className="py-20 bg-[#f9fafb] font-serif" id="howitworks">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-12 text-indigo-500 border bg-indigo-50 rounded-full w-max mx-auto px-4 py-1 md:px-6 md:py-2 shadow-md">
          How It Works
        </h1>

        <h2 className="md:text-4xl text-center font-bold mb-10 tracking-wide text-gray-800">
          How Inzuhub Works
        </h2>

        <p className="text-lg text-gray-600 text-center mb-16">
          Inzuhub connects tenants with their ideal homes through a simple and
          efficient process.
        </p>

        {/* 🔥 Toggle Buttons */}
        <div className="flex bg-indigo-50 py-2 px-2 w-max rounded-full gap-2 mb-10 mx-auto">
          <button
            onClick={() => setActiveTab("tenant")}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === "tenant"
                ? "bg-indigo-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            For Tenants
          </button>

          <button
            onClick={() => setActiveTab("landlord")}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === "landlord"
                ? "bg-indigo-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            For Landlords
          </button>
        </div>

        {/* 🔥 Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {activeTab === "tenant" ? (
            <>
              <Card
                number="1"
                title="Create an Account"
                text="Sign up for free and create your profile."
              />
              <Card
                number="2"
                title="Browse Listings"
                text="Explore listings to find your perfect home."
              />
              <Card
                number="3"
                title="Connect & Rent"
                text="Contact landlords and secure your home."
              />
            </>
          ) : (
            <>
              <Card
                number="1"
                title="List Your Property"
                text="Add your property details and photos."
              />
              <Card
                number="2"
                title="Get Tenant Requests"
                text="Receive messages from interested tenants."
              />
              <Card
                number="3"
                title="Close the Deal"
                text="Choose tenants and finalize agreements."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🔥 Reusable Card Component */
function Card({ number, title, text }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105 hover:bg-indigo-50 hover:text-indigo-500 hover:cursor-pointer hover:shadow-indigo-300 hover:border hover:border-indigo-50">
      <div className="text-indigo-500 bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
