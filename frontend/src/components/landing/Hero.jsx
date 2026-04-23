import { Verified, Search, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Hero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    if (location || maxPrice) {
      onSearch({
        location,
        maxPrice: maxPrice ? parseInt(maxPrice.replace(/,/g, "")) : null,
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{
        backgroundImage: "url('/hero1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/85 via-indigo-900/75 to-purple-900/70 z-0" /> */}

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32 z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl translate-y-32 -translate-x-16 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-indigo-200 px-4 py-1.5 rounded-full font-serif mb-6 backdrop-blur-sm text-lg ">
            ⭐ Rwanda's #1 Rental Platform
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 font-serif">
            Find Your Perfect{" "}
            <span className="text-yellow-300 drop-shadow-sm">Home</span> in
            Rwanda
          </h1>

          <p className="text-indigo-100/80 mb-8 max-w-md  leading-relaxed font-serif text-xl">
            Browse verified houses, connect with trusted landlords, and move in
            with confidence — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            ,
            <Link
              to={"/all-houses"}
              className="bg-yellow-400 hover:bg-yellow-300 text-white font-serif text-xl px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 w-full md:w-auto justify-center transition-all duration-200 hover:scale-105"
            >
              <Search className="w-4 h-4" /> Browse Houses
            </Link>
            <Link
              to="/landlord/dashboard"
              className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 w-full md:w-auto flex items-center gap-2 justify-center transition-all duration-200 hover:scale-105 shadow-lg font-serif text-xl "
            >
              <Plus /> List Property
            </Link>
          </div>

          {/* Search Bar */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-3 flex flex-wrap gap-2 shadow-xl font-serif">
            <input
              type="text"
              placeholder="Location (e.g., Kigali, Butare, Rubavu)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 min-w-36 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10 focus:border-white/30 focus:bg-white/15 transition-all"
            />

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 font-medium border-0 outline-none cursor-pointer"
            >
              <option value="">Max Price (RWF)</option>
              <option value="150000">150,000 RWF</option>
              <option value="200000">200,000 RWF</option>
              <option value="250000">250,000 RWF</option>
              <option value="300000">300,000 RWF</option>
              <option value="350000">350,000 RWF</option>
              <option value="400000">400,000 RWF</option>
              <option value="450000">450,000 RWF</option>
              <option value="500000">500,000 RWF</option>
              <option value="550000">550,000 RWF</option>
              <option value="600000">600,000 RWF</option>
              <option value="650000">650,000 RWF</option>
              <option value="700000">700,000 RWF</option>
              <option value="750000">750,000 RWF</option>
              <option value="800000">800,000 RWF</option>
              <option value="850000">850,000 RWF</option>
              <option value="900000">900,000 RWF</option>
              <option value="950000">950,000 RWF</option>
              <option value="1000000">1,000,000 RWF</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 text-gray-900 cursor-pointer transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8 text-white">
            {[
              { value: "2,400+", label: "Houses" },
              { value: "1,800+", label: "Tenants" },
              { value: "650+", label: "Landlords" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-2xl font-bold text-yellow-300">
                  {stat.value}
                </p>
                <span className="text-indigo-200 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Floating Card */}
        <div className="relative hidden md:flex justify-center items-center font-serif">
          <div className="rounded-2xl shadow-2xl p-5 bg-white/10 border border-white/20 backdrop-blur-md animate-[float_4s_ease-in-out_infinite]">
            <img
              src="/logo.png"
              className="rounded-xl w-full max-w-sm"
              alt="Platform preview"
            />
          </div>

          {/* Badge: New Listings */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-sm flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium text-gray-800">24 New Listings</span>
          </div>

          {/* Badge: Verified */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-sm animate-[float_5s_ease-in-out_infinite] flex items-center gap-2">
            <Verified className="w-4 h-4 text-green-500" />
            <span className="font-medium text-gray-800">
              Verified Properties
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}